import React, { useState, useEffect, useCallback } from "react";
import {
  Category,
  Container,
  PrivacyOptionsContainer,
  PrivacyOption,
  BlocksList,
  FriendContainer,
  FriendName,
  FriendPfp,
  UnblockButton,
  Parent,
} from "./Styles";
import Switch from "@material-ui/core/Switch";
import axios from "axios";
import { useUserData } from "../../../store/userDataProvider";
import { getFriendsData } from "../../../services/API/tasks/APItasks";
import { useFriend } from "../../../store/friendProvider";

const Configurations = () => {
  const { userData } = useUserData();
  const { friend, setFriend } = useFriend();
  const [checked, setChecked] = useState(Boolean(userData[0].online_status));
  const [blockList, setBlockList] = useState([]);

  const getBlockedFriends = useCallback(() => {
    getFriendsData(userData[0].user_id).then((res) => {
      const dataFiltered = res.data.filter((each) => {
        return each.status === "BLOCKED";
      });
      setBlockList(dataFiltered);
    });
  }, [userData]);

  useEffect(() => {
    getBlockedFriends();
  }, [getBlockedFriends]);

  const unblock = async (friendId) => {
    await axios.put("http://localhost:3001/api/friends/updatestatus", {
      personId: friendId,
      userId: userData[0].user_id,
      newStatus: "REQUESTED",
    });
    getBlockedFriends();
    setFriend({ ...friend, status: "REQUESTED" });
  };

  const changeOnlineStatus = async () => {
    await axios.put("http://localhost:3001/api/user", {
      name: userData[0].user_name,
      desc: userData[0].user_desc,
      pfp: userData[0].user_pfp,
      onlineStatus: checked === true ? true : false,
      id: userData[0].user_id,
    });
  };

  return (
    <Container>
      <Parent>
        <Category>Privacy</Category>
        <PrivacyOptionsContainer>
          <div>
            <PrivacyOption>Show online status</PrivacyOption>
            <Switch
              checked={checked}
              onChange={() => setChecked(!checked)}
              onClick={() => changeOnlineStatus()}
            />
          </div>
        </PrivacyOptionsContainer>
        <Category>Blocks</Category>
        <BlocksList>
          {blockList.length > 0 ? blockList.map((each, index) => {
            return (
              <FriendContainer key={index}>
                <FriendPfp src={each.user_pfp} />
                <FriendName>{each.user_name}</FriendName>
                <UnblockButton onClick={() => unblock(each.user_id)}>
                  Unblock
                </UnblockButton>
              </FriendContainer>
            );
          })
        : <h2>You didn't block anyone... yet</h2>}
        </BlocksList>
      </Parent>
    </Container>
  );
};

export default Configurations;
