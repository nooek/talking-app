const getMessagesFromStranger = (friends, messages, userId) => {
  let blockedFriendsList = []

  friends.map(each => {
    if (each.blocked === 1){
      return blockedFriendsList.push(each);
    }else{
      return null
    }
  })

  const noBlockedFriendsList = friends.filter((each) => {
    return each.blocked === 0;
  });
  console.log(noBlockedFriendsList)

  if (noBlockedFriendsList){
    let contactList = []
    noBlockedFriendsList.map(each => {
      return contactList.push(each.user_id)
    })

    if (messages){
      let strangersToAdd = []
      messages.forEach(each => {
        if (each.author !== userId
          && each.receiver === userId
          && !blockedFriendsList.includes(each.author)
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
  }else{
    return
  }

  // if (withoutBlockedFriendsList){

  // }

  // if (withoutBlockedFriendsList) {
  //   let contactList = [];
  //   withoutBlockedFriendsList.map((each) => {
  //     return contactList.push(each.user_id);
  //   });
  //   console.log(contactList)
  //   let strangersToAdd = [];
  //   if (messages) {
  //     messages.forEach((each) => {
  //       if (
  //         each.author !== userId &&
  //         !contactList.includes(each.author) &&
  //         each.receiver === userId
  //       ) {
  //         return strangersToAdd.push({
  //           user_id: each.author,
  //           user_name: "Not in friends",
  //         });
  //       } else {
  //         return null;
  //       }
  //     });
  //   }
  //   console.log(strangersToAdd)
  //   return strangersToAdd;
  // } else {
  //   return;
  // }
};

export default getMessagesFromStranger;
