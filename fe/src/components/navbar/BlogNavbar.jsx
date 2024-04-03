import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const session = localStorage.getItem("auth");
  const navigate = useNavigate();

  const logoutFunction = () => {
    localStorage.setItem("auth", "");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="blog-navbar">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>

        <div className="button-cont d-flex align-items-center gap-3">
          <Button
            as={Link}
            to="/new"
            className={session ? "blog-navbar-add-button bg-dark" : "invisible"}
            size="lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
            Nuovo Post
          </Button>

          <Button onClick={() => logoutFunction()} size="lg">
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
