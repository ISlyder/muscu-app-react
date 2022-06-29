import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button, Form } from "react-bootstrap";
import SessionCard from "./session-card";
import "../../styles/sessions/session-list.scss";
import { FaPlus } from "react-icons/fa";
import { API_URL } from "../../utils/constants";
import NewSessionModal from "../shared/new-session-modal";

function SessionList(props) {
  const [sessionList, setSessionList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleNameChange = (event) => {
    const value = event.target.value;
    setSessionName(value);
    if (value) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  };

  useEffect(() => {
    getAllSessions();
  }, []);

  const getAllSessions = () => {
    axios.get(`${API_URL}/sessions`).then((res) => {
      setSessionList(res.data);
    });
  };

  const addNewSession = (newSession) => {
    if (newSession && newSession.name) {
      axios
        .post(`${API_URL}/sessions`, newSession)
        .then((res) => setSessionList([...sessionList, res.data]))
        .then(() => handleClose())
        .then(() => setSessionName(""))
        .catch((err) =>
          /* TODO: display an error message in the modal  */
          console.error("Problem while trying to add a new session : " + err)
        );
    }
  };

  const onDelete = (sessionId) => {
    const newSessionList = sessionList.filter(
      (session) => session.id !== sessionId
    );
    setSessionList(newSessionList);
  };

  return (
    <div>
      <div className="d-flex justify-content-end me-3">
        <Button type="button" className="add-btn">
          <FaPlus onClick={handleShow} />
        </Button>
      </div>
      <Modal
        centered={true}
        backdrop={false}
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Créer une séance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form validated={isValidForm}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                required
                onChange={(event) => handleNameChange(event)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button
            variant="primary"
            onClick={() => addNewSession({ name: sessionName })}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Row className="justify-content-center">
          {sessionList.map((session) => (
            <Col key={session.id} className="mt-4">
              <SessionCard
                session={session}
                onDelete={(sessionId) => onDelete}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default SessionList;
