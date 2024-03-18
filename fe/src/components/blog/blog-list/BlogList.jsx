import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { useSelector, useDispatch } from "react-redux";
import {
  allBlogPosts,
  getAllBlogPosts,
  isAllPostsError, isAllPostsLoading
} from "../../../redux/blogPosts/blogPostsSlice";

const BlogList = (props) => {
  const dispatch = useDispatch();
  const blogPosts = useSelector(allBlogPosts);
  const isLoading = useSelector(isAllPostsLoading);
  const isError = useSelector(isAllPostsError);

  useEffect(() => {
    dispatch(getAllBlogPosts());
  }, [dispatch]);

  console.log(blogPosts);

  return (
    <Row>
      {blogPosts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post._id} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
