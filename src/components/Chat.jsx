import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Message from './Message';
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Container = styled.div`
    flex: 1;
    background-color: #dcf9ff;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=> {
      doc.exists() && setMessages(doc.data().messages)
    })
    return ()=> {
      unSub()
    }
  }, [data.chatId])
  return (
    <Container>
      {messages.map((m)=> (
        <Message message={m} key={m.id}/>
      ))}
    </Container>
  )
}

export default Chat