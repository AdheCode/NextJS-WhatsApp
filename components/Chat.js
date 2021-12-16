import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, db} from '../firebase';
import getRecipientEmail from "../utils/getRecipientEmail";
import { useCollection } from 'react-firebase-hooks/firestore';
import {useRouter} from 'next/router';
import moment from "moment";

function Chat({id, users}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('users').where('email', '==', getRecipientEmail(users, user));
    const [recipientSnapshot] = useCollection(userChatRef);

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }


    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);
    return (
        <Container onClick={enterChat}>
            {recipient ? (
                <UserAvatar src={recipient?.photoURL} />
            ):(
                <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )}
            <UseEmail>
                <p>{recipientEmail}</p>
            </UseEmail>
                <Timestamp>{moment(recipient?.lastSeen?.nanoseconds).format('HH:mm')}</Timestamp>
        </Container>
    )
}

export default Chat;

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding:15px;
    word-break: break-word;
    :hover {
        background-color: #e9eaeb
    }
`;
const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`;

const UseEmail = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid whitesmoke;
    :hover {
        border-bottom: none !important;
    }
`;

const Timestamp = styled.span`
    color: gray;
    padding: 10px;
    font-size:9px;
    position: sticky;
    top: 0;
    text-align: left;
    right: 0;
    width: 20%;
`;
