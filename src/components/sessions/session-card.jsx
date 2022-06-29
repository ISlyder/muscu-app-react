import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../utils/constants";

function SessionCard(props) {
  const navigate = useNavigate();

  const goToExercises = (sessionId) => {
    navigate(`sessions/${sessionId}`);
  };

  const deleteSession = (sessionId) => {
    axios
      .delete(`${API_URL}/sessions/${sessionId}`)
      .catch((err) => console.error(err));
  };

  return (
    <div className="d-flex">
      <Card
        style={{ width: "400px" }}
        className="bg-primary"
        onClick={() => goToExercises(props.session.id)}
      >
        <Card.Body>
          <Card.Title>{props.session.name}</Card.Title>
        </Card.Body>
      </Card>
      <Button variant="info" onClick={() => deleteSession(props.session.id)}>
        <FaTrashAlt />
      </Button>
    </div>
  );
}

export default SessionCard;
