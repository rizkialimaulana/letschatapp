import React from 'react';
import styled from 'styled-components';
import Chat from './Chat';
import Input from './Input';
import Navbar from './Navbar';

const Container = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Chats = () => {
  return (
    <Container>
        <Navbar />
        <Chat />
        <Input />
    </Container>
  )
}

export default Chats