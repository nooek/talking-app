import React from "react"
import UserDataProvider from "./store/userDataProvider";
import MessagesProvider from "./store/messagesProvider";
import FriendProvider from "./store/friendProvider";
import ContactsProvider from "./store/contactsProvider";
import { SocketProvider } from "./store/socketProvider";

const AppContextsWrapper = ({ children }) => {
    return (
      <SocketProvider>
        <UserDataProvider>
          <MessagesProvider>
            <ContactsProvider>
                <FriendProvider>
                  { children }
                </FriendProvider>
            </ContactsProvider>
          </MessagesProvider>
        </UserDataProvider>
      </SocketProvider>
    )
}

export default AppContextsWrapper