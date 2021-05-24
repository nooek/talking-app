import UpdateContact from "./updateContact";
import SortContacts from "./sortContacts";
import UpdateOnlineFriends from "./updateOnlineFriends";
import UpdateStrangers from "./updateStrangers";

const GetFriendRealTimeInfo = ({ children }) => {
  return (
    <UpdateContact>
      <UpdateStrangers>
        <SortContacts>
          <UpdateOnlineFriends>{children}</UpdateOnlineFriends>
        </SortContacts>
      </UpdateStrangers>
    </UpdateContact>
  );
};

export default GetFriendRealTimeInfo;
