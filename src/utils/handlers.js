import { userActions } from "../services/firebaseDB/users.js";

const { signIn, login } = userActions();

//handler for register
export async function onSubmitRegister(ctx, data) {
  const displayName = data.username.trim();
  const email = data.email.trim();
  const password = data.password.trim();
  const rePass = data.rePass.trim();
  const emptyInput = displayName == "" || email == "" || password == "";

  if (emptyInput) {
    ctx.render(
      () => html`<p>All fields must be filled!</p>`,
      document.getElementById("error")
    );
    return;
  } else if (password !== rePass) {
    ctx.render(
      () => html`<p>Passwords don't match!</p>`,
      document.getElementById("error")
    );
    return;
  } else {
    const submitBtn = document.getElementsByClassName("btn-user")[0];
    submitBtn.disabled = true;

    const newUser = await signIn({ email, password, displayName });

    if (typeof newUser == "string") {
      ctx.render(
        () => html`<p>Email already in use!</p>`,
        document.getElementById("error")
      );
      submitBtn.disabled = false;
    } else {
      ctx.page.redirect("/");
    }
  }
}

//handler for login
export async function onSubmitLogin(ctx, data) {
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
      ctx.page.redirect("/");
    }
  }
}
