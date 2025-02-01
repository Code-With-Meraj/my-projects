import React, { useEffect } from "react";

const NextPage = () => {
  useEffect(() => {
    if (localStorage.getItem("formSubmitted") === "true") {
      alert("Form submitted successfully!");
      localStorage.removeItem("formSubmitted"); 
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Next Page!</h1>
      <p>Your form submission was successful. Thank you for registering!</p>
    </div>
  );
};

export default NextPage;
