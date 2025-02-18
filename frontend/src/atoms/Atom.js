import {atom} from 'recoil'

export const authenticatedAtom = atom({
    key: "authenticatedAtom",
    default: false
})

export const messageAtom = atom({
    key : "messageAtom", 
    default: ""
})
export const usernameAtom = atom({
    key : "usernameAtom", 
    default: ""
})

export const firstNameAtom = atom({
    key : "firstNameAtom", 
    default: ""
})
export const lastNameAtom = atom({
    key : "lastNameAtom", 
    default: ""
})
export const passwordAtom = atom({
    key : "passwordAtom", 
    default: ""
})
export const successAtom = atom({
    key: "successAtom",
    default: false
})



