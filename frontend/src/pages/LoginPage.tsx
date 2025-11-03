import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { BASE_URL } from "../constants/paseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [error, setError] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { login } = useAuth();
  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    console.log(email, password);
    // Make the call to API to crate the user
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      setError("Failed to login");
    }
    const token = await response.json();
    if (!token) {
      setError("Incorrect email or password");
      return;
    }
    console.log(token);
    login(email, token);
    navigate("/");
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4">Login</Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 4,
            width: "50%",
            border: "1px solid #ccc",
            p: 2,
            borderRadius: 2,
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <TextField
            inputRef={emailRef}
            label="Email"
            type="email"
            name="email"
          />
          <TextField
            inputRef={passwordRef}
            label="Password"
            type="password"
            name="password"
          />
        </Box>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          type="submit"
          onClick={onSubmit}
        >
          Login
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default LoginPage;
