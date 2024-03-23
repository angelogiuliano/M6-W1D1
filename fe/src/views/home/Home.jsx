import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import {jwtDecode} from "jwt-decode"

const Home = () => {
  const session = JSON.parse(localStorage.getItem('auth'))
  const decodedSession = jwtDecode(session)

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <BlogList />
    </Container>
  );
};

export default Home;
