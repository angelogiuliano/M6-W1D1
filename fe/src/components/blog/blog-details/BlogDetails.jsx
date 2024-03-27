import { useEffect, useState } from "react";
import BlogItem from "../blog-item/BlogItem";
import { useParams } from "react-router-dom";
import AxiosClient from "../../../client/client";
import { BlogComment } from "../blog-comment/BlogComment";

export const BlogDetails = () => {
  const id = useParams();
  const client = new AxiosClient();
  const [postData, setPostData] = useState({});

  const getDetails = async () => {
    const response = await client.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/getBlogPosts/${id.id}`
    );
    setPostData(response);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <div>
        <BlogItem {...postData} />
        <BlogComment id={id}/>
      </div>
    </>
  );
};
