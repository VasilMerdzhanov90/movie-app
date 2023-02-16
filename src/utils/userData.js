export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const removeUser = () => {
  localStorage.removeItem("user");
};
export const getUser = () => {
  return localStorage.getItem("user");
};

export const OnSubmitHandler = (ctx, handler) => {
  return function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    handler(ctx, Object.fromEntries(formData));
  };
};
