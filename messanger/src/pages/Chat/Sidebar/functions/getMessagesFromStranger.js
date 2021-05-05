const getMessagesFromStranger = (contactList, messages, userId) => {
    console.log(contactList)
    console.log(messages)

    if (messages && contactList){
      let strangersToAdd = []
      messages.map(each => {
        
        if (each.author !== userId
          && each.receiver === userId 
          && !contactList.includes(each.author)){
            strangersToAdd.push({
              user_id: each.author,
              user_name: 'Not in friends'
            })
            contactList.push(each.author)
            return null
          }
      })
      console.log(strangersToAdd)
      return strangersToAdd
    }else{
      return 
    }

    // if (messages){
    //   let strangersToAdd = []
    //   messages.forEach(each => {
    //     if (each.author !== userId
    //       && each.receiver === userId
    //       && !contactList.includes(each.author))
    //     {
    //       return strangersToAdd.push({
    //         user_id: each.author,
    //         user_name: "Not in friends",
    //       });
    //     }
    //   });
    //   console.log(strangersToAdd)
    //   return strangersToAdd
    // }
};

export default getMessagesFromStranger;
