const getMessagesFromStranger = (friends, messages, userId) => {

    let contactList = []
    friends.map(each => {
      return contactList.push(each.user_id)
    })

    console.log(messages)
    if (messages){
      let strangersToAdd = []
      messages.forEach(each => {
        if (each.author !== userId
          && each.receiver === userId
          && !contactList.includes(each.author))
        {
          return strangersToAdd.push({
            user_id: each.author,
            user_name: "Not in friends",
          });
        }
      });
      return strangersToAdd
    }
};

export default getMessagesFromStranger;
