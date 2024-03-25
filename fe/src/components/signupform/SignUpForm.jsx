import React, { useState } from "react";
import AxiosClient from "../../client/client";

export const SignUpForm = ({ toggleShowForm, setToggleShowForm }) => {
  const client = new AxiosClient();
  const [signUpData, setSignUpData] = useState({});

  const onChangeFn = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const newValue = name === "age" ? Number(value) : value;
    setSignUpData({
      ...signUpData,
      [name]: newValue,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/createUser`,
        signUpData
      );
      setToggleShowForm(!toggleShowForm);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="card-body text-center justify-center cardbody-color p-lg-5"
    >
      <div id="emailHelp" className="form-text text-center mb-5 text-dark">
        Sei già registrato?
        <button
          type="button"
          className="ms-2 btn btn-primary"
          onClick={() => setToggleShowForm(!toggleShowForm)}
        >
          Fai il login
        </button>
      </div>
      <div className="mb-3">
        <input
          onChange={onChangeFn}
          placeholder="Name"
          type="text"
          name="firstName"
        />
      </div>

      <div className="mb-3">
        <input
          onChange={onChangeFn}
          placeholder="Last Name"
          type="text"
          name="lastName"
        />
      </div>

      <div className="mb-3">
        <input
          onChange={onChangeFn}
          placeholder="Email"
          type="email"
          name="email"
        />
      </div>

      <div className="mb-3">
        <input
          onChange={onChangeFn}
          placeholder="Password"
          type="password"
          name="password"
        />
      </div>

      <div className="mb-3">
        <input
          onChange={onChangeFn}
          placeholder="Age"
          type="number"
          name="age"
        />
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary px-5 mb-5">
          Registrati
        </button>
      </div>
    </form>
  );
};
