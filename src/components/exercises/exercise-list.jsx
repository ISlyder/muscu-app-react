import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import '../../styles/exercise-list.scss';

function ExerciceList(props) {
  const API_URL = "http://localhost:8080/api";

  const params = useParams();

  const [exerciseList, setExerciseList] = useState([]);

  useEffect(() => {
    getExercisesBySession(params.id);
  }, [params]);

  const getExercisesBySession = (sessionId) => {
    axios.get(`${API_URL}/exercises/sessions/${sessionId}`).then((res) => {
      setExerciseList(res.data);
    });
  };

  return (
    <div className="exercises-container">
      {exerciseList.map((exercise) => (
        <Card key={exercise.id} className="card">
          <Card.Title >{exercise.name}</Card.Title>
          {exercise.image ? 
          <Card.Img src={exercise.image} alt={exercise.name + 'image'}/> : 
          <img src={require('../../assets/logo512.png')} alt="imageNotFound"></img>
          }
        </Card>
      ))}
    </div>
  );
}

export default ExerciceList;
