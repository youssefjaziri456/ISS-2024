const dbUsers = [
    { id: "11tFbk7Z7mMKEDZm5YG3CeWQwhG2", username: "Youssef" },
    { id: "R7QqGtmanQUg9BKmXN1RREOMaPE3", username: "Aram" },
    { id: "XpJ8dGu1lEPkrsUJOf3GIyCTyEn2", username: "Chaima" },
    { id: "3imed_id", username: "3imed" },
    { id: "delice_id", username: "delice" },
]

function GetUserWithUID(UID) {
    return dbUsers.find(user => user.id === UID);
}

module.exports = { GetUserWithUID }