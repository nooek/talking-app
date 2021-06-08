import React from "react";
import UserDataProvider from "./store/userDataProvider";
import MessagesProvider from "./store/messagesProvider";
import FriendProvider from "./store/friendProvider";
import ContactsProvider from "./store/contactsProvider";
import ContactMessagesProvider from "./store/contactMessagesProvider";
import { SocketProvider } from "./store/socketProvider";

const AppContextsWrapper = ({ children }) => (
  <SocketProvider>
    <UserDataProvider>
      <MessagesProvider>
        <ContactMessagesProvider>
          <ContactsProvider>
            <FriendProvider>{children}</FriendProvider>
          </ContactsProvider>
        </ContactMessagesProvider>
      </MessagesProvider>
    </UserDataProvider>
  </SocketProvider>
);

export default AppContextsWrapper;
