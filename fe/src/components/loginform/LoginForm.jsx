import React, { useState } from "react";
import AxiosClient from "../../client/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export const LoginForm = ({ toggleShowForm, setToggleShowForm }) => {
  const client = new AxiosClient();
  const [formData, setFormData] = useState({});
  const [errorLogin, setErrorLogin] = useState();

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/login`,
        formData
      );
      if (response.statusCode === 200) {
        localStorage.setItem("auth", JSON.stringify(response.token));
        navigate("/home");
        navigate(0);
      }
    } catch (error) {
      setErrorLogin(error.message);
    }
  };

  const handleLoginGithub = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
  };

  return (
    <form onSubmit={onSubmit} className="card-body cardbody-color p-lg-5">
      <div className="text-center">
        <img
          src="https://picsum.photos/340/340"
          className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
          width="200px"
          alt="profile"
        />
      </div>

      {errorLogin && (
        <Alert variant="danger">
          {errorLogin} <br /> Please sign up
        </Alert>
      )}

      <div className="mb-3">
        <input
          onChange={onChangeInput}
          type="email"
          className="form-control"
          name="email"
          aria-describedby="emailHelp"
          placeholder="Inserisci la tua email..."
        />
      </div>

      <div className="mb-3">
        <input
          onChange={onChangeInput}
          type="password"
          className="form-control"
          name="password"
          placeholder="Inserisci la tua password"
        />
      </div>

      <div className="text-center">
        <button
          as={Link}
          to="/home"
          type="submit"
          className="btn btn-primary px-5 mb-5 w-100"
        >
          Login
        </button>
      </div>

      <div id="emailHelp" className="form-text text-center mb-5 text-dark">
        Non sei registrato?
        <button
          type="button"
          className="ms-2 btn btn-primary"
          onClick={() => setToggleShowForm(!toggleShowForm)}
        >
          Registrati ora!
        </button>
      </div>

      <div
        onClick={() => handleLoginGithub()}
        className="form-text text-center mb-5 text-dark"
      >
        <button type="button" className="ms-2 btn btn-dark">
          Registrati con GitHub
        </button>
      </div>
    </form>
  );
};
