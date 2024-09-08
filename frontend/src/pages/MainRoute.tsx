import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function MainRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/SignUp");
            return;
        }

        const response = await axios.get(`${BACKEND_URL}/api/v1/user/m`, {
            headers: {
              Authorization: token, // Ensure 'Bearer ' prefix is added
            },
          });

          if (response.data.redirect === "SignUp") {
            navigate("/SignUp");
          } else if (response.data.redirect === "SignIn") {
            navigate("/SignIn");
          } else if (response.data.redirect === "Dashboard") {
            navigate("/Dashboard");
          } else {
            navigate("/SignUp"); // Default redirection
          }
        } catch (error) {
          navigate("/SignUp");
        }
      };

    checkAuth();
  }, [navigate]);

  return <div>Loading...</div>;
}
