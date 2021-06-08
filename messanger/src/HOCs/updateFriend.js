import React from "react";
import GetContacts from "./getContacts";
import UpdateContact from "./updateContact";
import SortContacts from "./sortContacts";
import UpdateOnlineFriends from "./updateOnlineFriends";
import UpdateStrangers from "./updateStrangers";

const GetFriendRealTimeInfo = ({ children }) => (
  <GetContacts>
    <UpdateContact>
      <SortContacts>
        <UpdateStrangers>
          <UpdateOnlineFriends>{children}</UpdateOnlineFriends>
        </UpdateStrangers>
      </SortContacts>
    </UpdateContact>
  </GetContacts>
);

export default GetFriendRealTimeInfo;
