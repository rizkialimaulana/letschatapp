import React, { useContext } from 'react'
import styled from 'styled-components';
import User from './User';
import { AiFillSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import Search from './Search';

const Container = styled.div`
  flex: 0.5;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 7px 2px 5px -4px rgba(61, 55, 55, 0.75);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  background-color: #6fb9ff;
  padding: 1rem 0.5rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Name = styled.span`
  font-weight: bold;
`

const Profile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Logout = styled.button`
  font-size: 25px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Setting = styled.button`
  font-size: 25px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const UserContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`

const Sidebar = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <Container>
      <Header>
        <ProfileContainer>
          <Profile src={currentUser.photoURL} />
          <Name>{currentUser.displayName}</Name>
        </ProfileContainer>
        <Detail>
          <Setting>
            <AiFillSetting />
          </Setting>
          <Logout onClick={()=> signOut(auth)}>
            <FiLogOut />
          </Logout>
        </Detail>
      </Header>
      <Search />
      <UserContainer>
          <User/>
      </UserContainer>
    </Container>
  );
}

export default Sidebar