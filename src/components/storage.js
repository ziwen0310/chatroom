// browser storage using localStorage
const userID = 'userid'

export function getUserid () {
    return localStorage.getItem(userID)
}

export function setUserid (newid) {
    localStorage.setItem(userID, newid)
}
