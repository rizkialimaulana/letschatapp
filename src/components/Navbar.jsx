import React, { useContext } from 'react';
import styled from 'styled-components';
import { BsFillCameraVideoFill, BsThreeDots } from "react-icons/bs";
import { ChatContext } from '../context/ChatContext';

const Container = styled.div`
  flex: 0.1;
  padding: 0 2rem;
  background-color: #b1d7fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 12px 5px -4px rgba(61, 55, 55, 0.75);
`;

const Name = styled.span`

`
const Menu = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const Navbar = () => {
  const { data } = useContext(ChatContext);
  return (
    <Container>
        <Name>{data.user?.displayName}</Name>
        <Menu>
            <BsFillCameraVideoFill />
            <BsThreeDots />
        </Menu>
    </Container>
  )
}

export default Navbar