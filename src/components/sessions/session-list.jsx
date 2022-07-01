import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button, Form } from "react-bootstrap";
import SessionCard from "./session-card";
import "../../styles/sessions/session-list.scss";
import { FaPlus } from "react-icons/fa";
import { API_URL } from "../../utils/constants";
import NewElementModal from "../shared/new-element-modal";

function SessionList(props) {
  const [sessionList, setSessionList] = useState([]);
  const [sessionName, setSessionName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    getAllSessions();
  }, []);

  const getAllSessions = () => {
    axios.get(`${API_URL}/sessions`).then((res) => {
      setSessionList(res.data);
    });
  };

  const addNewSession = (inputValue) => {
    if (inputValue) {
      const newSession = { name: inputValue };
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
      <NewElementModal
        title={"Créer une séance"}
        showModal={showModal}
        handleClose={handleClose}
        handleValidate={(session) => addNewSession(session)}
      />
    </div>
  );
}

export default SessionList;
