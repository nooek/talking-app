const getMessagesFromStranger = (friends, messages, userId) => {
  let contactList = [];
  if (friends) {
    friends.map((each) => {
      return contactList.push(each.friend_id);
    });
  }
  let strangersToAdd = [];
  if (messages) {
    messages.forEach((each) => {
      if (
        each.author !== userId &&
        !contactList.includes(each.author) &&
        each.receiver === userId
      ) {
        return strangersToAdd.push({
          friend_id: each.author,
          friend_name: "Not in friends",
        });
      } else {
        return null;
      }
    });
  }
  return strangersToAdd;
};

export default getMessagesFromStranger;
