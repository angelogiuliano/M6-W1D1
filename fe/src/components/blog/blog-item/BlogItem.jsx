import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
const BlogItem = (props) => {
  const { title, author, postDate, picture, _id } = props;
  return (
    <Link to={`/blog/${_id}`} className="blog-link">
      <Card className="blog-card">
        <Card.Img
          variant="top"
          src={picture}
          className="blog-cover object-fit-fill"
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Title>{author}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <Card.Title>{postDate}</Card.Title>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogItem;
