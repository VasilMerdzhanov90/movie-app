import { html } from "../../lib/lit/lit-html.js";
import { imgTemplate } from "../../utils/utils.js";

let genderEnum = ["Transgender", "Female", "Male"];

const template = (data, onListLoadHandler) => html`
  <div class="person-details">
    <section class="main-info">
      <div class="profile-img">
        <img src="https://image.tmdb.org/t/p/w300${data.details.profile_path}" />
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
    <section @click="${onListLoadHandler}" class="credits">
      <button class="section-btn">Acting (${data.credits.cast.length})</button>
      <button class="section-btn">Other (${data.credits.crew.length})</button>
      <ul class="results"></ul>
    </section>
  </div>
`;

export function personDetailsView(ctx) {
  ctx.render(() => template(ctx.person, onListLoadHandler));
  window.scrollTo(0, 0);
  function onListLoadHandler(e) {
    const resultParent = document.querySelector(".results");
    if (e.target.textContent.includes("Acting")) {
      ctx.render(() => imgTemplate(ctx.person.credits.cast), resultParent);
      // window.scrollBy(0, window.innerHeight - window.innerHeight / 2);
    } else if (e.target.textContent.includes("Other")) {
      ctx.render(() => imgTemplate(ctx.person.credits.crew), resultParent);
    }
    window.scrollBy(0, window.innerHeight - window.innerHeight / 2);
  }
}
