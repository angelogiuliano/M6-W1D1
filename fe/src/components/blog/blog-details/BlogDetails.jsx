import { useEffect, useState } from "react";
import BlogItem from "../blog-item/BlogItem";
import { useNavigate, useParams } from "react-router-dom";
import AxiosClient from "../../../client/client";
import { BlogComment } from "../blog-comment/BlogComment";
import { jwtDecode } from "jwt-decode";

export const BlogDetails = () => {
  const id = useParams();
  const client = new AxiosClient();
  const [postData, setPostData] = useState({});

  const navigate = useNavigate();

  const getDetails = async () => {
    const response = await client.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/getBlogPosts/${id.id}`
    );
    setPostData(response);
  };

  const deletePost = async () => {
    try {
      const response = await client.delete(
        `${process.env.REACT_APP_SERVER_BASE_URL}/deleteBlogPost/${id.id}`
      );
      navigate("/home");
      navigate(0);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <div>
        <BlogItem {...postData} />
        <div className="btn-container d-flex justify-content-end p-3">
          <button className="btn btn-danger" onClick={() => deletePost()}>
            Elimina Post
          </button>
        </div>
        <BlogComment id={id} />
      </div>
    </>
  );
};
