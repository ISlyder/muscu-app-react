import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button, Form } from "react-bootstrap";
import SessionCard from "./session-card";
import "../../styles/sessions/session-list.scss";

function SessionList(props) {
  const API_URL = "http://localhost:8080/api";

  const [sessionList, setSessionList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    getAllSessions();
  }, []);

  const getAllSessions = () => {
    axios.get(`${API_URL}/sessions`).then((res) => {
      setSessionList(res.data);
    });
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleNameChange = (event) => {
    const value = event.target.value;
    setSessionName(value);
    if (value) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  };

  const addNewSession = (newSession) => {
    if (newSession && newSession.name) {
      axios
        .post(`${API_URL}/sessions`, newSession)
        .then((res) => setSessionList([...sessionList, res.data]))
        .then(() => handleClose())
        .then(() => setSessionName(""))
        .catch((err) =>
          console.error("Problem while trying to add a new session : " + err)
        );
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end me-3">
        <button type="button" className="add-btn" onClick={handleShow}>
          +
        </button>
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
              <SessionCard session={session} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default SessionList;
