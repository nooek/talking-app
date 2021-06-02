import React from "react";
import UpdateContact from "./updateContact";
import SortContacts from "./sortContacts";
import UpdateOnlineFriends from "./updateOnlineFriends";
import UpdateStrangers from "./updateStrangers";

const GetFriendRealTimeInfo = ({ children }) => (
  <UpdateContact>
    <SortContacts>
      <UpdateStrangers>
        <UpdateOnlineFriends>{children}</UpdateOnlineFriends>
      </UpdateStrangers>
    </SortContacts>
  </UpdateContact>
);

export default GetFriendRealTimeInfo;
