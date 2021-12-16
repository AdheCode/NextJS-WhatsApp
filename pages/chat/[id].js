import styled from "styled-components";
import Head from 'next/head';
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import {auth, db} from '../../firebase';
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from 'react-firebase-hooks/auth';

function Chat({chat, messages}) {
    const [user] = useAuthState(auth);
    
    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)}</title>
                <link rel="icon" href="./../580b57fcd9996e24bc43c543.png" type="image/gif" sizes="16x16"></link>
            </Head>
            <Sidebar />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages} background={'./../background.png'} />
            </ChatContainer>
            
        </Container>
    )
}

export default Chat;

export async function getServerSideProps(context) {
    const ref = db.collection('chats').doc(context.query.id);

    // PREP the messages on the server
    const messagesRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();

    const messages = messagesRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime(),
    }));

    // PREP the chats
    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}

const Container = styled.div`
    display: flex;
    padding-left:10%;
    padding-right:10%;
    padding-top:1%;
    background: linear-gradient(#128C7E 50%, #dcdcdc 50%);
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 98vh;

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width:none;
`;