import React from 'react';
import styled from 'styled-components';
import profile from '../img/profile.jpg';

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 10px;
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
`
const Message = () => {
  return (
    <Container>
        <Profile src={profile}/>
        <Text>This is the first Message</Text>
    </Container>
  )
}

export default Message