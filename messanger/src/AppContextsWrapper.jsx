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
      <FriendProvider>
        <ContactMessagesProvider>
          <MessagesProvider>
            <ContactsProvider>
              {children}
            </ContactsProvider>
          </MessagesProvider>
        </ContactMessagesProvider>
      </FriendProvider>
    </UserDataProvider>
  </SocketProvider>
);

export default AppContextsWrapper;
