import React from 'react';
import styled from 'styled-components';
import Message from './Message';

const Container = styled.div`
    flex: 1;
    background-color: #dcf9ff;
    padding: 2rem;
`

const Chat = () => {
  return (
    <Container>
        <Message />
    </Container>
  )
}

export default Chat