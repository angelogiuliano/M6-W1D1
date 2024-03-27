import { useEffect, useState } from "react";
import "./BlogComment.css";
import AxiosClient from "../../../client/client";

export const BlogComment = ({ id }) => {
  const [comments, setComments] = useState([]);
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
    <div className="comments m-3 d-flex">
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
      {comments.length < 1 && <p>Nessun commento trovato</p>}
    </div>
  );
};
