import { html } from "../../../node_modules/lit-html/lit-html.js";
import { onSubmitLogin } from "../../utils/handlers.js";
import { OnSubmitHandler } from "../../utils/userData.js";


const loginTemplate = (onSubmit) => html`
  <div class="sign-user">
    <h1 class="type hint">LOGIN</h1>
    <form @submit="${onSubmit}">
      <label>
        <span>email:</span>
        <input type="email" name="email" required />
      </label>
      <label>
        <span>password:</span>
        <input type="password" name="password" required />
      </label>
      <div id="error"></div>
      <input class="btn-user" type="submit" value="LOGIN" />
    </form>
    <p class="hint">NOT REGISTERED? <a href="/register">REGISTER HERE</a></p>
  </div>
`;

export function loginView(ctx) {
  ctx.render(() => loginTemplate(OnSubmitHandler(ctx, onSubmitLogin)));
}


