import React from "react";
import MobileTopbar from "../MobileTopbar/MobileTopbar";
import { 
    AddFriendIcon,
    Container,
    PresentionalText,
    PresentionalTextContainer
} from "./Styles";

const DefaultChat = () => {
  return (
    <Container>
        <MobileTopbar chat={false} />
        <PresentionalTextContainer>
            <PresentionalText>
                Hi, select a contact on the side bar to start chating
            </PresentionalText>
            <PresentionalText>
                If you don't have any, click on the <AddFriendIcon /> to add one
            </PresentionalText>
        </PresentionalTextContainer>
    </Container>
  );
};

export default DefaultChat;
