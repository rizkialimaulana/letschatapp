import React from 'react'
import styled from 'styled-components';
import User from './User';
import profile from '../img/profile.jpg';
import { AiFillSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Container = styled.div`
  flex: 0.5;
  background-color: #6fb9ff;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem;
  box-shadow: 7px 2px 5px -4px rgba(61, 55, 55, 0.75);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
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

const SearchContainer = styled.div`
  border-top: 1px solid lightslategray;
  border-bottom: 1px solid lightslategray;
`

const Search = styled.input`
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  outline: none;
  border: none;
`
const Sidebar = () => {
  return (
    <Container>
      <Header>
        <ProfileContainer>
          <Profile src={profile} />
          <Name>User</Name>
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
      <SearchContainer>
        <Search type="text" placeholder="Search your friend..." />
      </SearchContainer>
      <User />
      <User />
      <User />
      <User />
    </Container>
  );
}

export default Sidebar