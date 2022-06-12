import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SessionCard(props) {
  const navigate = useNavigate();

  const goToExercises = (sessionId) => {
    navigate(`sessions/${sessionId}`);
  };

  return (
    <div onClick={() => goToExercises(props.session.id)}>
      <Card style={{ width: "400px" }} className="bg-primary">
        <Card.Body>
          <Card.Title>{props.session.name}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SessionCard;
