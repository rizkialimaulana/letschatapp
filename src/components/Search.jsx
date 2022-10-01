import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid lightslategray;
    padding: 10px 0;
    gap: 10px;
`
const Input = styled.input`
    outline: none;
    border: none;
    background: transparent;
`
const User = styled.div`
    display: flex ;
    align-items: center;
    gap: 15px;
    cursor: pointer;
`
const ProfileImg = styled.img`
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
`
const Name = styled.span`
    font-weight: bold;
`

const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const {currentUser} = useContext(AuthContext)

    const handleSearch = async ()=> {
        try {
            const q = query(collection(db, "users"), where("displayName", "==", username))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc)=> {
                setUser(doc.data())
            })
        } catch (error) {
            setErr(true)
        }
    }

    const handleKey = e => {
        e.code === "Enter" && handleSearch()
    }

    const handleSelect = async () => {
        const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
        try {
            const res = await getDoc(doc(db, "chats", combineId));
            if(!res.exists()){
                await setDoc(doc(db, "chats", combineId), {messages: []})
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combineId+".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },[combineId+".date"]: serverTimestamp()
                })
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combineId+".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },[combineId+".date"]: serverTimestamp()
                })
            }
        } catch (error) {
            setErr(true)   
        }

        setUser(null);
        setUsername("");
    }
  return (
    <Container>
        <Input type="text" placeholder='Search your friend...' onKeyDown={handleKey}  onChange={(e)=>setUsername(e.target.value)} value={username}/>
        {err && <span style={{color: "red"}}>User not found</span>}
        {user && <User onClick={handleSelect}>
            <ProfileImg src={user.photoURL}/>
            <Name>{user.displayName}</Name>
        </User>}
    </Container>
  )
}

export default Search