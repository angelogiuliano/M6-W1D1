import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AxiosClient from "../../../client/client";
import { useNavigate } from "react-router-dom";

export const MyModal = ({ showModal, setShowModal }) => {
  const [userData, setUserData] = useState({});
  const [comment, setComment] = useState({});
  const key = localStorage.getItem("auth").replace(/"/g, "");
  const { id } = useParams();
  const client = new AxiosClient();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setComment({
      author: userData.firstName + " " + userData.lastName,
      [name]: value,
    });
  };

  const getUser = async () => {
    try {
      const response = await client.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/getUser/${key}`
      );
      setUserData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSaveChanges = async (e) => {
    console.log("submitted");
    e.preventDefault();
    try {
      await client.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/${id}/comments`,
        comment
      );
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [key]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>User</Form.Label>
            <Form.Control
              defaultValue={userData.firstName + " " + userData.lastName}
              readOnly
              type="text"
              placeholder="Username"
              autoFocus
              name="author"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              onChange={onChange}
              name="text"
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => onSaveChanges(e)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
