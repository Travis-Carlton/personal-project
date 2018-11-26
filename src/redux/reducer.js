const iState = {
    loggedIn: false,
    userId: 0,
    lusername: '',
    password: '',
    first_name: '',
    last_name: '',
    bio: '',
    bookId: 0,
    bookname: '',
    bookcover: '',
    books: [],
    profilePic: '',
    email: '',
    userForPosts: '',
    likedBooks: [],
    likedPages: [],
    usersBooks: [],
    usersPosts: []
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
const UPDATE_BOOK_ID = 'UPDATE_BOOK_ID';
const CLEAR_STATE = 'CLEAR_STATE';
const PROFILE_PIC = 'PROFILE_PIC';
const EMAIL = 'EMAIL';
const USER_FOR_POSTS = 'USER_FOR_POSTS';
const LIKED_BOOKS = 'LIKED_BOOKS';
const LIKED_PAGES = 'LIKED_PAGES';
const UPDATE_USERS_BOOKS = 'UPDATE_USERS_BOOKS';
const UPDATE_USERS_PAGES = 'UPDATE_USERS_PAGES';


export default function reducer(iS = iState, action){
    switch (action.type) {
        case UPDATE_USERNAME:
            return {...iS, lusername: action.payload}
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
            return {...iS, userId: action.payload}
        case UPDATE_BOOK_ID:
            return {...iS, bookId: action.payload}
        case PROFILE_PIC:
            return {...iS, profilePic: action.payload}
        case EMAIL:
            return {...iS, email: action.payload}
        case USER_FOR_POSTS:
            return {...iS, userForPosts: action.payload}
        case LIKED_BOOKS:
            return {...iS, likedBooks: action.payload}
        case LIKED_PAGES:
            return {...iS, likedPages: action.payload}
        case UPDATE_USERS_BOOKS:
            return {...iS, usersBooks: action.payload}
        case UPDATE_USERS_PAGES:
            return {...iS, usersPosts: action.payload}
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
export function updateBookID(id){
    return {
        type: UPDATE_BOOK_ID,
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
export function updateEmail(email){
    return {
        type: EMAIL,
        payload: email
    }
}
export function updateUserForPosts(user){
    return {
        type: USER_FOR_POSTS,
        payload: user
    }
}
export function updateLikedBooks(books){
    return {
        type: LIKED_BOOKS,
        payload: books
    }
}
export function updateLikedPages(pages){
    return {
        type: LIKED_PAGES,
        payload: pages
    }
}
export function updateUsersBooks(books){
    return {
        type: UPDATE_USERS_BOOKS,
        payload: books
    }
}
export function updateUsersPages(pages){
    return {
        type: UPDATE_USERS_PAGES,
        payload: pages
    }
}

export function clearUser(){
    return {
        type: CLEAR_STATE,
        payload: {
            userId: '',
            lusername: '',
            first_name: '',
            last_name: '',
            bio: '',
            profilePic: ''
    }
}}