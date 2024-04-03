import { useEffect, useState } from "react";
import { SignUpForm } from "../signupform/SignUpForm";
import { LoginForm } from "../loginform/LoginForm";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [toggleShowForm, setToggleShowForm] = useState(false);

  const session = localStorage.getItem("auth");
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/home");
    } else {
      navigate("/")
    }
  }, [session]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center text-dark mt-5">Epibooks Login</h2>
          <div className="card my-5">
            {toggleShowForm && (
              <SignUpForm
                toggleShowForm={toggleShowForm}
                setToggleShowForm={setToggleShowForm}
              />
            )}
            {!toggleShowForm && (
              <LoginForm
                toggleShowForm={toggleShowForm}
                setToggleShowForm={setToggleShowForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
