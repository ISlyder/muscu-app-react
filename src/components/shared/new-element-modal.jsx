import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function NewElementModal({ title, showModal, handleClose, handleValidate }) {
  const [isValidForm, setIsValidForm] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputValueChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  };

  return (
    <Modal
      centered={true}
      backdrop={false}
      show={showModal}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={isValidForm}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              required
              onChange={(event) => handleInputValueChange(event)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={() => handleValidate(inputValue)}>
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewElementModal;
