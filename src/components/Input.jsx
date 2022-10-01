import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IoMdAttach } from "react-icons/io";
import { BsFillImageFill } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Container = styled.div`
    flex: 0.15;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #b1d7fa;
`

const Inputs = styled.input`
    border: none;
    padding: 0px 10px;
    outline: none;
    width: 80%;
    height: 80%;
    border-radius: 15px;
    background: white;
`

const SubmitContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
const Submit = styled.button`
    width: fit-content;
    font-size: 30px;
    background: transparent;
    border: none;
    cursor: pointer;
`

const File = styled.input`
  border: none;
  background: transparent;
  cursor: pointer;
`

const Label = styled.label`
  cursor: pointer;
`

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSend = async ()=> {
    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image)
      uploadTask.on(
        (error) => {
          //
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL
              }),
            });
          });
        }
      );
    }else{
      await updateDoc(doc(db,"chats",data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId+".lastMessage"]: {
        text
      },
      [data.chatId+".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId+".lastMessage"]: {
        text
      },
      [data.chatId+".date"]: serverTimestamp()
    })
    setText("")
    setImage(null)
  }
  return (
    <Container>
      <Inputs type="text" placeholder="Write a message..." onChange={(e)=>setText(e.target.value)} value={text}/>
      <SubmitContainer>
        <File type="file" id="file" style={{display: "none"}}/>
        <Label htmlFor="file">
          <IoMdAttach style={{ fontSize: "30px" }} />
        </Label>
        <File type="file" id="photo" style={{display: "none"}} onChange={(e)=>setImage(e.target.files[0])}/>
        <Label htmlFor="photo">
          <BsFillImageFill style={{ fontSize: "30px" }} />
        </Label>
        <Submit onClick={handleSend}><BiSend /></Submit>
      </SubmitContainer>
    </Container>
  );
}

export default Input