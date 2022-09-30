import React from 'react';
import styled from 'styled-components';
import { BsFillChatDotsFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

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
  return (
    <Container>
      <Card>
        <Title>
          <BsFillChatDotsFill style={{ color: "#a4ccff" }} />
          LetsChat!
        </Title>
        <Desc>Sign In</Desc>
        <Form>
          <InputContainer>
            <Input placeholder="Username" />
          </InputContainer>
          <InputContainer>
            <Input placeholder="Password" />
          </InputContainer>
          <Submit>Sign In</Submit>
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