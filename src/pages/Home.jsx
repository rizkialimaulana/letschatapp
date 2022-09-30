import React from 'react';
import styled from 'styled-components';
import Chats from '../components/Chats';
import Sidebar from '../components/Sidebar';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
`

const Home = () => {
  return (
    <Container>
        <Sidebar />
        <Chats />
    </Container>
  )
}

export default Home