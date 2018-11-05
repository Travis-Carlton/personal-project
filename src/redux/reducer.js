const iState = {
    loggedIn: false,
    id: 0,
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    bio: '',
    bookname: '',
    bookcover: '',
    books: [],
    profilePic: ''
};

const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
const UPDATE_BIO = 'UPDATE_BIO';
const UPDATE_BOOKNAME = 'UPDATE_BOOKNAME';
const UPDATE_BOOKCOVER = 'UPDATE_BOOKCOVER';
const UPDATE_BOOKS = 'UPDATE_BOOKS';
const UPDATE_ID = 'UPDATE_ID';
const CLEAR_STATE = 'CLEAR_STATE';
const PROFILE_PIC = 'PROFILE_PIC';


export default function reducer(iS = iState, action){
    switch (action.type) {
        case UPDATE_USERNAME:
            return {...iS, username: action.payload}
        case UPDATE_PASSWORD:
            return {...iS, password: action.payload}
        case UPDATE_FIRST_NAME:
            return {...iS, first_name: action.payload}
        case UPDATE_LAST_NAME:
            return {...iS, last_name: action.payload}
        case UPDATE_BIO:
            return {...iS, bio: action.payload}
        case UPDATE_BOOKNAME:
            return {...iS, bookname: action.payload}
        case UPDATE_BOOKCOVER:
            return {...iS, bookcover: action.payload}
        case UPDATE_BOOKS:
            return {...iS, books: action.payload}
        case UPDATE_ID:
            return {...iS, id: action.payload}
        case PROFILE_PIC:
            return {...iS, profilePic: action.payload}
        case CLEAR_STATE:
            return {...iS, ...action.payload}
           

        default:
            return iS;
    }
}

export function updateUsername(user){
    return {
        type: UPDATE_USERNAME,
        payload: user
    }
}
export function updatePassword(userpass){
    return {
        type: UPDATE_PASSWORD,
        payload: userpass
    }
}
export function updateFirstName(firstN){
    return {
        type: UPDATE_FIRST_NAME,
        payload: firstN
    }
}
export function updateLastName(lastN){
    return {
        type: UPDATE_LAST_NAME,
        payload: lastN
    }
}
export function updateBio(bio){
    return {
        type: UPDATE_BIO,
        payload: bio
    }
}
export function updateBookName(name){
    return {
        type: UPDATE_BOOKNAME,
        payload: name
    }
}
export function updateBookCover(cover){
    return {
        type: UPDATE_BOOKCOVER,
        payload: cover
    }
}
export function updateID(id){
    return {
        type: UPDATE_ID,
        payload: id
    }
}
export function updateBooks(books){
    return {
        type: UPDATE_BOOKS,
        payload: books
    }
}
export function updateProfilePic(pic){
    return {
        type: PROFILE_PIC,
        payload: pic
    }
}
export function clearUser(){
    return {
        type: CLEAR_STATE,
        payload: {
            username: '',
            first_name: '',
            last_name: '',
            bio: '',
            profilePic: ''
    }
}}