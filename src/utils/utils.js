import { html } from "../../node_modules/lit-html/lit-html.js";
import { doc, setDoc, db, Timestamp } from "../firebase/config.js";
import { movieRequestLinks } from "../services/tmdb/linksAndAPI.js";

//util function to create document for user data
export const createNewUserDocument = async (id, email, displayName) => {
    try {
        await setDoc(doc(db, "users", id), {
            id,
            displayName,
            email,
            createdAt: Timestamp.fromDate(new Date()),
        });
    } catch (error) {
        console.log(error.message);
    }
};


export const isPendingHandler = (pending) => {
    if (pending) {
        return () => html`
        <div class="loader-container">
            <h2>Loading...</h2>
            <div class="loader"></div>
        </div>
            `;
    } else {
        return null;
    }
};

export const categoryListGenerator = () => {
    const categories = Object.keys(movieRequestLinks).slice(0, 8);

    return html`${categories.map(
    (x) => html` <li class="category-type">
    <a class="category" href="/movies/${x}/2">${x}</a>
</li>`
  )}`;
};


export const selectOptionsGenerator = (num) => {
    const arr = [];
    let pages = num;

    if (num > 500) {
        pages = 500;
    }

    for (let i = 1; i < pages; i++) {
        arr.push(i);
    }

    return html`
    ${arr.map((x) => html`<option value="${x}" label="${x}">${x}</option>`)}
`;
};