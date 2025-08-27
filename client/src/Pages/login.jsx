import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const style = {
    marginTop: "10px",
    backgroundColor: "red",
    opacity: 1,
    borderRadius: "20px",
    color: "white",
    padding: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100px",
    height: "40px",
    textAlign: "center",
    marginLeft: "20px",
  };

  const [input, setInput] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleChangeOtp = (e) => {
    e.preventDefault();
    setOtp(e.target.value);
  };

  async function setItemWithExpiry(key, value, ttl) {
    const now = new Date();
    
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };

    localStorage.setItem(key, JSON.stringify(item));
  }

  const handleSubmitUsername = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked with Username:", input);
  
    const response = await fetch("https://spicmacayback.vercel.app/valid/check", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ key: input }),
    });

    let res = await response.json();

    if (response.ok) {
      setIsOtpSent(true);
      alert("OTP has been sent to the backend.");
    } else {
      setError("This is an invalid username. Please try again.");
      setIsOtpSent(false);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked with OTP:", otp);

    const response = await fetch("https://spicmacayback.vercel.app/valid/verify-otp", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ key: input, otp: otp }),
    });

    let res = await response.json();

    if (response.ok) {
      await setItemWithExpiry("s-id", 1234, 5*60 * 1000);
      alert("You are logged in");
      navigate("/");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItem: "center" }}>
      <form onSubmit={isOtpSent ? handleSubmitOtp : handleSubmitUsername} style={{ marginBottom: "400px", marginTop: "80px" }}>
        {!isOtpSent ? (
          <>
            <input
              onChange={handleChangeUsername}
              type="text"
              placeholder="Type Username"
              value={input}
            />
            <button type="submit" style={style}>
              Submit
            </button>
          </>
        ) : (
          <>
            <input
              onChange={handleChangeOtp}
              type="text"
              placeholder="Enter OTP"
              value={otp}
            />
            <button type="submit" style={style}>
              Verify OTP
            </button>
          </>
        )}

        {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
