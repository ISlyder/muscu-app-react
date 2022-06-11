import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SessionCard from "./session-card";
import "../../styles/session-list.scss";

function SessionList(props) {
  const API_URL = "http://localhost:8080/api";

  const [sessionList, setSessionList] = useState([]);

  useEffect(() => {
    getAllSessions();
  }, []);

  const getAllSessions = () =>
    axios.get(`${API_URL}/sessions`).then((res) => {
      setSessionList(res.data);
    });

  return (
    <div>
      <div className="d-flex justify-content-end ">
        <button type="button" className="add-btn">
          +
        </button>
      </div>
      <Container>
        <Row className="justify-content-center">
          {sessionList.map((session) => (
            <Col key={session.id} className="mt-4">
              <SessionCard session={session}></SessionCard>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default SessionList;
