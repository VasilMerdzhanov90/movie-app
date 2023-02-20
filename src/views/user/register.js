import { html } from "../../../node_modules/lit-html/lit-html.js";
import { onSubmitRegister } from "../../utils/handlers.js";
import { OnSubmitHandler } from "../../utils/userData.js";


const registerTemplate = (onSubmit) => html`
  <div class="sign-user">
    <h1 class="type hint">REGISTER</h1>
    <form @submit="${onSubmit}">
      <label>
        <span>username:</span>
        <input type="text" name="username" />
      </label>
      <label>
        <span>email:</span>
        <input type="email" name="email" required />
      </label>
      <label>
        <span>password:</span>
        <input type="password" name="password" required />
      </label>
      <label>
        <span>repeat password:</span>
        <input type="password" name="rePass" required />
      </label>
      <div id="error"></div>

      <input class="btn-user" type="submit" value="REGISTER" />
    </form>
    <p class="hint">REGISTERED YET? <a href="/login">LOGIN HERE</a></p>
  </div>
`;


export function registerView(ctx) {
  ctx.render(() => registerTemplate(OnSubmitHandler(ctx, onSubmitRegister)));
}





