import { useEffect, useState } from "react";
import "./BlogComment.css";
import AxiosClient from "../../../client/client";
import { MyModal } from "./MyModal";

export const BlogComment = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const client = new AxiosClient();

  const getComments = async () => {
    const response = await client.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/${id.id}/comments`
    );
    setComments(response);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="comments m-3 d-flex align-items-center">
      {comments &&
        comments.map((comment, i) => {
          return (
            <div key={i} className="single-comment">
              <p>
                <b>Author:</b> {comment.author}
              </p>
              <p>
                <b>Comment:</b> {comment.text}
              </p>
            </div>
          );
        })}
      {comments.length < 1 && <p className="m-0 mx-2">Nessun commento trovato</p>}
      <MyModal showModal={showModal} setShowModal={setShowModal}/>
      <button onClick={() => setShowModal(true)} className="btn btn-primary">Aggiungi un commento</button>
    </div>
  );
};
