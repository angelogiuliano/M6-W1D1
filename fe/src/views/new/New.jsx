import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import Col from "react-bootstrap/Col";
import AxiosClient from "../../client/client";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NewBlogPost = () => {
  const [validated, setValidated] = useState(false);
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [usersName, setUsersName] = useState("");

  const client = new AxiosClient();
  const navigate = useNavigate();

  const key = localStorage.getItem("auth");
  const decodedUser = jwtDecode(key);

  useEffect(() => {
    checkUsersName(decodedUser);
  }, [decodedUser]);

  const onChangeHandleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    const fileData = new FormData();
    fileData.append("picture", file);

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

  const checkUsersName = (data) => {
    if (data.displayName) {
      const fullGithubName = data.displayName.split(" ");
      setUsersName(fullGithubName[0] + " " + fullGithubName[1]);
    } else {
      setUsersName(data.firstName + " " + data.lastName);
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
      author: usersName,
      [name]: newValue,
    });
  };

  const submitPost = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    try {
      let response;
      if (file) {
        const uploadedFile = await uploadFile(file);
        const bodyToSend = {
          ...formData,
          picture: uploadedFile.source,
        };
        response = await client.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/createBlogPost`,
          JSON.stringify(bodyToSend)
        );
      } else {
        response = await client.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/createBlogPost`,
          JSON.stringify(formData)
        );
      }

      navigate("/home");
      navigate(0);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Form
        noValidate
        validated={validated}
        onSubmit={submitPost}
        className="mt-5"
      >
        <Col className="mb-3 d-flex flex-column gap-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Author</Form.Label>
            <Form.Control readOnly name="author" required value={usersName} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="title"
              required
              type="text"
              placeholder="Title"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Post Date</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="postDate"
              required
              type="date"
              placeholder="Born Date"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Picture</Form.Label>
            <Form.Control
              onChange={onChangeHandleFile}
              name="picture"
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
          Aggiungi post
        </Button>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
