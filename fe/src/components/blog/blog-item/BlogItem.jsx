import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
const BlogItem = (props) => {
  const { avatar, firstName, lastName, email, bornDate, _id } = props;
  return (
    <Link to={`/blog/${_id}`} className="blog-link">
      <Card className="blog-card">
        <Card.Img variant="top" src={avatar} className="blog-cover" />
        <Card.Body>
          <Card.Title>{firstName} {lastName}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <Card.Title>{bornDate}</Card.Title>
          <Card.Title>{email}</Card.Title>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogItem;
