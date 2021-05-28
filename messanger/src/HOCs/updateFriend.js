import UpdateContact from "./updateContact";
import SortContacts from "./sortContacts";
import UpdateOnlineFriends from "./updateOnlineFriends";
import UpdateStrangers from "./updateStrangers";

const GetFriendRealTimeInfo = ({ children }) => {
  return (
    <UpdateContact>
        <UpdateStrangers>
          <UpdateOnlineFriends>{children}</UpdateOnlineFriends>
        </UpdateStrangers>
    </UpdateContact>
  );
};

export default GetFriendRealTimeInfo;
