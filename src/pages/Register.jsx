import React, { useState } from 'react';
import styled from 'styled-components';
import { BsFillChatDotsFill } from "react-icons/bs";
import { FcAddImage } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { auth, db, storage } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';



const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: aliceblue;
`

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
`

const Title = styled.h2`
    display: flex;
    align-items: center;
    gap: 5px;
`

const Desc = styled.span`
`

const Form = styled.form`
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`

const Input = styled.input`
    outline: none;
    border: none;
    border-bottom: 1px solid gray;
    padding: 10px;
    background: transparent;
    width: 100%;
`
const InputImage = styled.input`
    display: none;
`

const Submit = styled.button`
    padding: 1rem 2rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
        background-color: #a4ccff;
    }
`

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

const Linked = styled.span``;

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth,email,password)
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setErr(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            })
            await setDoc(doc(db, "userChats", res.user.uid), {})
            navigate("/")
          });
        }
      );
    } catch (error) {
      setErr(true)
    }
  }

  return (
    <Container>
      <Card>
        <Title>
          <BsFillChatDotsFill style={{ color: "#a4ccff" }} />
          LetsChat!
        </Title>
        <Desc>Sign Up</Desc>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Input type="text" placeholder="Your Name" />
          </InputContainer>
          <InputContainer>
            <Input type="email" placeholder="Email" />
          </InputContainer>
          <InputContainer>
            <Input type="password" placeholder="Password" />
          </InputContainer>
          <InputContainer>
            <InputImage type="file" id="photo" />
            <Label htmlFor="photo">
              <FcAddImage />
              Add Profile Picture
            </Label>
          </InputContainer>
          <Submit>Sign Up</Submit>
          {err && <span>Something wrong</span>}
          <Linked>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              click here
            </Link>
          </Linked>
        </Form>
      </Card>
    </Container>
  );
}

export default Register