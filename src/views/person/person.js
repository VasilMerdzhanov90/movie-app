import { html } from "../../../node_modules/lit-html/lit-html.js";
import { hrefGenerator } from "../../utils/utils.js";

let genderEnum = ["transgender", "female", "male"];

const template = (data) => html`
  <div class="person-details">
    <section class="main-info">
      <div class="profile-img">
        <img src="http://image.tmdb.org/t/p/w300${data.details.profile_path}" />
      </div>
      <div class="details">
        <h2>${data.details.name}</h2>
        <p>Also known as: ${data.details.also_known_as.join(", ")}</p>
        <p>Day of birth: ${data.details.birthday}</p>
        <p>Gender: ${genderEnum[data.details.gender]}</p>
        <p>Place of birth: ${data.details.place_of_birth}</p>
        ${data.details.deathday &&
        html`<p>Day of death: ${data.details.deathday}</p>`}
        <p>Known for: ${data.details.known_for_department}</p>
        <h3>Biography:</h3>
        <p>${data.details.biography}</p>
      </div>
    </section>
    <section class="credits">
      <div class="cast">
        <h2>Acting:</h2>
        <ul>
          ${imgTemplate(data.credits.cast)}
        </ul>
      </div>
      <div class="crew">
        ${data.credits.crew.length > 1
          ? html`<h2>Directing, producing and other:</h2>
              <ul>
                ${imgTemplate(data.credits.crew)}
              </ul>`
          : ""}
      </div>
    </section>
  </div>
`;



const imgTemplate = (arr) => {
  arr = arr.filter((x) => x.poster_path !== null || x.backdrop_path !== null);
  if (arr.length !== 0) {
    return arr.map(
      (x) => html`<li>
        <a href="${hrefGenerator(x)}">
          <img
            src="http://image.tmdb.org/t/p/w200${!x.poster_path
              ? x.backdrop_path
              : x.poster_path}"
          />
        </a>
      </li>`
    );
  } else {
    return "";
  }
};

export function personDetailsView(ctx) {
  ctx.render(() => template(ctx.person));
}
