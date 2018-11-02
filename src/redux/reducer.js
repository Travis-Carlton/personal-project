const iState = {
    loggedIn: false,
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    bio: '',
    bookname: '',
    bookcover: '',
    books: [],
    profilePic: null
};

const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
const UPDATE_BIO = 'UPDATE_BIO';
const UPDATE_BOOKNAME = 'UPDATE_BOOKNAME';
const UPDATE_BOOKCOVER = 'UPDATE_BOOKCOVER';
const UPDATE_BOOKS = 'UPDATE_BOOKS';
const CLEAR_STATE = 'CLEAR_STATE';


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
        case CLEAR_STATE:
            return {...action.payload}
           

        default:
            return iS;
    }
}

export function updateUsername(user){
    console.log(user)
    return {
        type: UPDATE_USERNAME,
        payload: user
    }
}
export function updatePassword(userpass){
    console.log(userpass)
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
export function updateBooks(books){
    return {
        type: UPDATE_BOOKS,
        payload: books
    }
}
export function clearState(){
    return {
        type: CLEAR_STATE,
        payload: {
            loggedIn: false,
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            bio: '',
            bookname: '',
            profilePic: null}
    }
}