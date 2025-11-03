import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { BASE_URL } from "../constants/paseUrl";
import { useAuth } from "../context/Auth/AuthContext";
const RegisterPage = () => {
  const [error, setError] = useState<string>("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();
  const onSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }
    console.log(firstName, lastName, email, password);
    // Make the call to API to crate the user
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });
    if (!response.ok) {
      setError("Failed to register user");
    }
    const token = await response.json();
    if (!token) {
      setError("Incorrect email or password");
      return;
    }
    console.log(token);
    login(email, token);
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
        <Typography variant="h4">Register New Account</Typography>
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
            inputRef={firstNameRef}
            label="First Name"
            type="text"
            name="firstName"
          />
          <TextField
            inputRef={lastNameRef}
            label="Last Name"
            type="text"
            name="lastName"
          />
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
          Register
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default RegisterPage;
