import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../contexts/UserContext";

const ProtectedWraper = ({ children }) => {
  const { setuser } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setuser();
      navigate("/login");
      return; // Prevent further API call
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          setuser(res.data);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (err) {
        setuser("");
        localStorage.setItem("token", "");
        console.error("Auth error:", err.message);
        // Optionally redirect:
        navigate("/login");
      }
    };

    fetchProfile();
  }, [setuser, navigate]);

  return <>{children}</>;
};

export default ProtectedWraper;
