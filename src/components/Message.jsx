import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 25px;
`
const Profile = styled.img`
    object-fit: cover;
    width: 35px;
    height: 35px;
    border-radius: 50%;
`
const Text = styled.p`
    padding: 0.5rem 1rem;
    background-color: white;
    border-radius: 0 10px 10px 10px;
    width: fit-content;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Image = styled.img`
  object-fit: cover;
  width: 100px;
  height: 50px;
  border-radius: 20px;
`
const Message = ({message}) => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const ref = useRef()

  useEffect(()=> {
    ref.current?.scrollIntoView({behavior: "smooth"})
  },[message])
  return (
    <Container ref={ref} >
        <Profile src={message.senderId === currentUser.uid? currentUser.photoURL : data.user.photoURL}/>
        <MessageContainer>
          {message.text && <Text>{message.text}</Text>}
          {message.image && <Image src={message.image}/>}
        </MessageContainer>
    </Container>
  )
}

export default Message