import React, { useState } from "react";
import AxiosClient from "../../client/client";

export const SignUp = () => {
  const client = new AxiosClient();
  const [signUpData, setSignUpData] = useState({});

  const onChangeFn = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
    console.log(signUpData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/createUser`,
        signUpData
      );
    } catch (error) {
        console.error(error)
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input onChange={onChangeFn} type="text" name="firstName" />
      <input onChange={onChangeFn} type="text" name="lastName" />
      <input onChange={onChangeFn} type="email" name="email" />
      <input onChange={onChangeFn} type="password" name="password" />
      <input onChange={onChangeFn} type="number" name="age" />
      <button type="submit" className="btn btn-primary">
        Registrati
      </button>
    </form>
  );
};
