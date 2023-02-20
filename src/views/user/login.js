import { html } from "../../../node_modules/lit-html/lit-html.js";
import { userActions } from "../../services/firebaseDB/users.js";
import { OnSubmitHandler } from "../../utils/userData.js";

const { login } = userActions();

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
  ctx.render(() => loginTemplate(OnSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data) {
  const email = data.email.trim();
  const password = data.password.trim();

  if (email == "" || password == "") {
    ctx.render(
      () => html`<p>All fields must be filled!</p>`,
      document.getElementById("error")
    );
  } else {
    const submitBtn = document.getElementsByClassName("btn-user")[0];
    submitBtn.disabled = true;
    const newUser = await login({ email, password });
    if (typeof newUser == "string") {
      ctx.render(
        () => html`<p>Incorrect email or password!</p>`,
        document.getElementById("error")
      );
      submitBtn.disabled = false;
    } else {
      ctx.page.redirect("/movies");
    }
  }
}
