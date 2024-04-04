import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const token = new URLSearchParams(window.location.search).get("token");
  const decodedToken = jwtDecode(token);
  const navigate = useNavigate();
  console.log(decodedToken);

  useEffect(() => {
    if (decodedToken) {
      localStorage.setItem("auth", JSON.stringify(token));
      navigate("/home");
    }
  }, [decodedToken]);

  return (
    <div>
      <p>Success</p>
    </div>
  );
};
