import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import AxiosClient from "../../client/client";
import { useNavigate } from "react-router-dom";

const NewBlogPost = (props) => {
  const [validated, setValidated] = useState(false);
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

  const client = new AxiosClient();
  const navigate = useNavigate();
  // const session = localStorage.getItem("auth");

  const onChangeHandleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    const fileData = new FormData();
    fileData.append("avatar", file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/uploadImg`,
        {
          method: "POST",
          body: fileData,
        }
      );
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const options = {
      weekday: "long",
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    };
    const newValue =
      name === "bornDate"
        ? new Date(value).toLocaleDateString("it-IT", options)
        : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const submitAuthor = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    if (file) {
      try {
        const uploadedFile = await uploadFile(file);
        const bodyToSend = {
          ...formData,
          avatar: uploadedFile.source,
        };
        const response = await client.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/createBlogPost`,
          JSON.stringify(bodyToSend)
        );
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await client.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/createBlogPost`,
          JSON.stringify(formData)
        );
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    }
    navigate("/home");
    navigate(0);
  };

  return (
    <Container>
      <Form
        noValidate
        validated={validated}
        onSubmit={submitAuthor}
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
              type="date"
              placeholder="Born Date"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Born Date</Form.Label>
            <Form.Control
              onChange={onChangeHandleFile}
              name="avatar"
              type="file"
              accept="image/png, image/gif, image/jpeg"
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
