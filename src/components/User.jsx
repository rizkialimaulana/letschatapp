import React from 'react';
import styled from 'styled-components';
import profile from '../img/profile.jpg';
const Container = styled.div`
    display: flex;
    align-items: center;
    padding-left: 15px;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid lightslategray;
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
  return (
    <Container>
        <Profile src={profile}/>
        <Detail>
            <Name>User2</Name>
            <Chat>This is second user</Chat>
        </Detail>
    </Container>
  )
}

export default User