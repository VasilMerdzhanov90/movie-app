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

export const listGenerator = (genres) => {
  let result = [];
  if (genres.length != 0) {
    genres.map((x) => result.push(x.name));
    return result.join(", ");
  } else {
    return "";
  }
};
export function hrefGenerator(element) {
  let href = `/details/`;

  if (element.media_type === "movie") {
    href += "movies/";
  } else if (element.media_type === "tv") {
    href += "series/";
  }
  return (href += element.id);
}
// <<<<<<<<<<TEMPLATES>>>>>>>>>

export const productionCompaniesGenerator = (companies) => {
  let result = "";
  if (companies.length != 0) {
    result = companies.map((x) => {
      if (x.logo_path !== null) {
        return html`
          <div class="company-container">
            <div class="img-wrapper">
              <img src="http://image.tmdb.org/t/p/w200${x.logo_path}" />
            </div>
            <!-- <p>${x.name}</p> -->
          </div>
        `;
      }
    });
  }
  return result;
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

export const categoryListGenerator = (section) => {
  const movieCategory = Object.keys(movieRequestLinks).slice(0, 7);
  const seriesCategory = Object.keys(seriesRequestLinks).slice(0, 5);

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
