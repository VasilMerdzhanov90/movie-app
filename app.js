// import { db, app, createUserWithEmailAndPassword, auth, signInWithEmailAndPassword, updateProfile, doc, setDoc, collection, getDocs } from "./src/firebase/config.js";
// import { userActions } from "./src/services/users.js";

import { useCollection } from "./src/services/dataFirebase.js";
import { userActions } from "./src/services/users.js";


const { readCollection, isPending } = useCollection('users');
console.log(await readCollection())
console.log(isPending)


const { login, signIn } = userActions()

const form = document.querySelector('form');
form.addEventListener('submit', onRegister);

function onRegister(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target))
    signIn(formData)
}

// const data = await getDocs(collection(db, 'users'));
// console.log(data.docs[0].data())

// data.docs.forEach(element => {
//     console.log(element.data())
// })