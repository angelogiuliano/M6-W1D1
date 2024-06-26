import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const session = localStorage.getItem("auth");
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/')
    }
  })

  return (
    session && (
      <Container fluid="sm">
        <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
        <BlogList />
      </Container>
    )
  );
};

export default Home;
