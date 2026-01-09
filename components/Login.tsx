import React from "react";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#f5f5f5"
      }}
    >
      <h2>FedEx Hackathon</h2>
      <p>Please login to continue</p>
      <button
        onClick={onLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
