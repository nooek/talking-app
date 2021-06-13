import { useEffect, useState } from "react";
import { useUserData } from "../store/userDataProvider";
import { useContacts } from "../store/contactsProvider";
import { getFriendsData } from "../services/API/tasks/APItasks";

const GetContacts = ({ children }) => {
  const { userData } = useUserData();
  const { setContacts } = useContacts();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFriendsData(userData[0].user_id).then((res) => {
      console.log(res);
      if (!res.data[0].message) {
        setContacts(res.data);
      }
      setLoading(false);
    });
  }, [userData, setContacts]);

  if (!loading) return children;
  return null;
};

export default GetContacts;
