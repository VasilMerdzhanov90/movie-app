import { html } from "../lib/lit/lit-html.js";
import {
  movieRequestLinks,
  seriesRequestLinks,
} from "../services/tmdb/linksAndAPI.js";

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

export function slider(e) {
  const slideActors = document.querySelector(".slider");
  if (e.target.tagName === "I") {
    if (e.target.classList.contains("left")) {
      slideActors.scrollLeft -= 205;
    } else {
      slideActors.scrollLeft += 205;
    }
  }
}
// //MUST DELETE//
// export function videoSlider(e) {
//   const videoList = document.querySelector(".video-list");
//   const clientWidth = videoList.children[0].clientWidth;
//   if (e.target.classList.contains("next")) {
//     videoList.scrollLeft += clientWidth * 2 + 10;
//   } else if (e.target.classList.contains("prev")) {
//     videoList.scrollLeft -= clientWidth * 2 + 10;
//   }
// }

// <<<<<<<<<<TEMPLATES>>>>>>>>>
export const imgTemplate = (arr) => {
  arr = arr.filter((x) => x.poster_path !== null || x.backdrop_path !== null);
  if (arr.length !== 0) {
    return arr.map(
      (x) => html`<li class="result-item">
        <a href="${hrefGenerator(x)}">
          <img
            src="https://image.tmdb.org/t/p/w200${!x.poster_path
              ? x.backdrop_path
              : x.poster_path}"
          />
        </a>
        <div>
          <p>${x.original_title || x.title} / ${x.release_date}</p>
          <p>Role: ${x.character || x.department}</p>
          <article>${x.overview}</article>
        </div>
      </li>`
    );
  } else {
    return "";
  }
};
export const productionCompaniesGenerator = (companies) => {
  let result = "";
  if (companies.length != 0) {
    result = companies.map((x) => {
      if (x.logo_path !== null) {
        return html`
          <div class="company-container">
            <div class="img-wrapper">
              <img src="https://image.tmdb.org/t/p/w200${x.logo_path}" />
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
