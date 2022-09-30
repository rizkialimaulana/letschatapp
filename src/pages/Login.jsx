import React, { useState } from 'react';
import styled from 'styled-components';
import { BsFillChatDotsFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
`;

const Card = styled.div`
  width: 40%;
  height: 60%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  border: 1px solid black;
  padding: 1rem 2rem;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Desc = styled.span``;

const Form = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid gray;
  padding: 10px;
  background: transparent;
  width: 100%;
`;
const Submit = styled.button`
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #a4ccff;
  &:hover {
    background-color: #a4ccff;
  }
`;

const Linked = styled.span``

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <Container>
      <Card>
        <Title>
          <BsFillChatDotsFill style={{ color: "#a4ccff" }} />
          LetsChat!
        </Title>
        <Desc>Sign In</Desc>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Input type="email" placeholder="Email" />
          </InputContainer>
          <InputContainer>
            <Input type="password" placeholder="Password" />
          </InputContainer>
          <Submit>Sign In</Submit>
          {err && <span style={{color: "red"}}>Login Failed</span>}
          <Linked>
            Dont have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              click here
            </Link>
          </Linked>
        </Form>
      </Card>
    </Container>
  );
}

export default Login