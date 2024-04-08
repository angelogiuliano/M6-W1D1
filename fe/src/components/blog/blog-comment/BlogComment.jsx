import { useEffect, useState } from "react";
import "./BlogComment.css";
import AxiosClient from "../../../client/client";
import { MyModal } from "./MyModal";
import Card from "react-bootstrap/Card";
import {useNavigate} from 'react-router-dom'

export const BlogComment = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const client = new AxiosClient();
  const navigate = useNavigate();

  const getComments = async () => {
    const response = await client.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/${id.id}/comments`
    );
    setComments(response);
  };

  const deleteComment = async (e) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const commentId = e.target.parentElement.parentElement.attributes.id.value
      try {
        const response = await client.update(
          `${process.env.REACT_APP_SERVER_BASE_URL}/${id.id}/comments/${commentId}/deleteComment`
        );
        navigate(0);
        return response;
      } catch (error) {
        
      }
    } else {
      return
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="comments m-3 d-flex align-items-start gap-3 flex-column flex-wrap">
      {comments &&
        comments.map((comment, i) => {
          return (
            <Card key={i} id={comment._id}>
              <Card.Body>
                <p>
                  <b>Author:</b> {comment.author}
                </p>
                <p>
                  <b>Comment:</b> {comment.text}
                </p>
                <button onClick={(e) => deleteComment(e)} className="btn btn-danger">Elimina</button>
              </Card.Body>
            </Card>
          );
        })}
      {comments.length < 1 && (
        <p className="m-0 mx-2">Nessun commento trovato</p>
      )}
      <MyModal showModal={showModal} setShowModal={setShowModal} />
      <button onClick={() => setShowModal(true)} className="btn btn-primary">
        Aggiungi un commento
      </button>
    </div>
  );
};
