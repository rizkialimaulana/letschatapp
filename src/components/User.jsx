import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

const Container = styled.div`
    display: flex;
    align-items: center;
    padding-left: 15px;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
        background-color: #acd7ff;
    }
`

const Profile = styled.img`
    object-fit: cover;
    width: 45px;
    height: 45px;
    border-radius: 50%;
`

const Detail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;
`

const Name = styled.span`
    font-weight: bold;
`

const Chat = styled.p`
    
`

const User = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    useEffect(() => {
      const getChats = () => {
        const unsub = onSnapshot(
          doc(db, "userChats", currentUser.uid),
          (doc) => {
            setChats(doc.data());
          }
        );
        return () => {
          unsub();
        };
      };
      currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u)=> {
      dispatch({type: "CHANGE_USER", payload: u})
    }
  return (
    <>
    {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=> (
        <Container key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
            <Profile src={chat[1].userInfo.photoURL}/>
            <Detail>
                <Name>{chat[1].userInfo.displayName}</Name>
                <Chat>{chat[1].lastMessage?.text}</Chat>
            </Detail>
        </Container>
    ))}
    </>
  )
}

export default User