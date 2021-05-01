const getMessagesFromStranger = (friends, messages, userId) => {
  let contactList = [];
  if (friends) {
    friends.map((each) => {
      return contactList.push(each.user_id);
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
          user_id: each.author,
          user_name: "Not in friends",
        });
      } else {
        return null;
      }
    });
  }
  console.log(strangersToAdd)
  return strangersToAdd;
};

export default getMessagesFromStranger;
