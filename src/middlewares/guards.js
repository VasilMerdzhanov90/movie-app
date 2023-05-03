import { getUser } from "../utils/userData.js";

export const userGuard = (ctx, next) => {
  const { user } = getUser();
  if (user) {
    ctx.page.redirect("/");
    console.log("user");
  }
  next();
};

export const noUserGuard = (ctx, next) => {
  const { user } = getUser();

  if (!user) {
    ctx.page.redirect("/login");
    console.log("redirected");
  } else {
    console.log("not redirected!!!");
    next();
  }
};
