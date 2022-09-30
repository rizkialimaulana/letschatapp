import React from 'react';
import styled from 'styled-components';
import { IoMdAttach } from "react-icons/io";
import { BsFillImageFill } from "react-icons/bs";
import { BiSend } from "react-icons/bi";

const Container = styled.div`
    flex: 0.15;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #b1d7fa;
`

const Inputs = styled.input`
    border: none;
    padding: 0px 10px;
    outline: none;
    width: 80%;
    height: 80%;
    border-radius: 15px;
    background: white;
`

const SubmitContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
const Submit = styled.button`
    width: fit-content;
    font-size: 30px;
    background: transparent;
    border: none;
`

const Input = () => {
  return (
    <Container>
      <Inputs type="text" placeholder="Write a message..." />
      <SubmitContainer>
        <IoMdAttach style={{ color: "gray", fontSize: "30px" }} />
        <BsFillImageFill style={{ color: "gray", fontSize: "30px" }} />
        <Submit type="submit"><BiSend /></Submit>
      </SubmitContainer>
    </Container>
  );
}

export default Input