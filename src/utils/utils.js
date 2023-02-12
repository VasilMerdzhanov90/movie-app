import { html } from "../../node_modules/lit-html/lit-html.js";
import { doc, setDoc, db, Timestamp } from "../firebase/config.js";
import {
  movieRequestLinks,
  seriesRequestLinks,
} from "../services/tmdb/linksAndAPI.js";

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

export const spanGenerator = (genres) => {
  let result = "";

  if (genres.length != 0) {
    return (result = Object.values(genres).map(
      (x) => html`<span class="span-elips">${x.name}</span>`
    ));
  } else {
    return result;
  }
};

export const sliderPreview = (categoryContainer) => {
  categoryContainer.forEach((element) => {
    const sliderElements = element.children[1];
    sliderElements.querySelectorAll(".left").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const imageWidth =
          categoryContainer[0].querySelector("img").clientWidth;
        sliderElements.scrollLeft -= imageWidth + 5;
      });
    });

    sliderElements.querySelectorAll(".right").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const imageWidth =
          categoryContainer[0].querySelector("img").clientWidth;
        sliderElements.scrollLeft += imageWidth + 5;
      });
    });
  });
};

// ********************TEMPLATES********************

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

// export const categoryListGenerator = () => {
//     const movieCategory = Object.keys(movieRequestLinks).slice(0, 8);
//     const seriesCategory = Object.keys(seriesRequestLinks).slice(0, 4)

//     const movieCategoryTemplate = () => html`${movieCategory.map(
//         (x) => html`<li class="category-type">
//     <a class="category" href="/movies/${x}/2">${x}</a>
// </li>` )}`
//     const seriesCategoryTemplate = () => html`${seriesCategory.map(
// (x) => html`<li class="category-type">
//     <a class="category" href="/series/${x}/2">${x}</a>
// </li>` )}`

//     return {
//         movieCategoryTemplate,
//         seriesCategoryTemplate
//     }
// };
export const categoryListGenerator = (section) => {
  const movieCategory = Object.keys(movieRequestLinks).slice(0, 8);
  const seriesCategory = Object.keys(seriesRequestLinks).slice(0, 4);

  if (section === "movies") {
    return html`${movieCategory.map(
      (x) => html`<li class="category-type">
        <a class="category" href="/movies/${x}/2">${x}</a>
      </li>`
    )}`;
  } else if (section === "series") {
    return html`${seriesCategory.map(
      (x) => html`<li class="category-type">
        <a class="category" href="/series/${x}/2">${x}</a>
      </li>`
    )}`;
  }
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

export const emptyTemplate = () => html`
  <div class="no-content">
    <h2>NO RESULTS</h2>
  </div>
`;
