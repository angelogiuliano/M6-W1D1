import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import AxiosClient from "../../client/client";
import { useNavigate } from "react-router-dom";

const NewBlogPost = (props) => {
  const [validated, setValidated] = useState(false);
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({});

  const client = new AxiosClient();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    await client.post(
      `${process.env.REACT_APP_SERVER_BASE_URL}/createBlogPost`,
      formData
    );
    navigate("/home");
  };

  return (
    <Container>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="mt-5"
      >
        <Col className="mb-3 d-flex flex-column gap-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="firstName"
              required
              type="text"
              placeholder="First name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="lastName"
              required
              type="text"
              placeholder="Last name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomEmail">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a email.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Born Date</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="bornDate"
              required
              type="text"
              placeholder="Born Date"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
            onChange={() => setChecked(!checked)}
          />
        </Form.Group>
        <Button className={!checked ? "disabled" : ""} type="submit">
          Aggiungi autore
        </Button>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
