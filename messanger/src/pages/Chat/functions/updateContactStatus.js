const updateContactStatus = (data, contacts, friend) => {
    let returnObj = {}
    
    if (contacts) {
        contacts.map((each) => {
        if (each.user_id === data[0]) {
            each.status = data[1];
            if (
            each.user_id === friend.user_id &&
            (each.status === "DENIED" || each.status === "ACCEPTED" || each.status === "REQUESTED" || each.status === "BLOCKED")
            ) {console.log("sad")
                returnObj = [{
                    status: data[1],
                    id: data[0],
                    newContact: each,
                }]
                return returnObj
            }
        }

            return 0;
        });
        return returnObj;
    }
    
};

export default updateContactStatus

// setContacts([...newContacts, each]);
// setFriend({ ...friend, status: data[1] });
