import { useCollection } from "../services/firebaseDB/data.js";

const { readDocument } = useCollection("users");


export const setUser = async (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  const favorites = await readDocument(user.user.user.uid);
  localStorage.setItem("favorites", JSON.stringify(favorites.favorites));
};
export const removeUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("favorites");
};
export const getUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  return { user, favorites };
};
export const setFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
export const OnSubmitHandler = (ctx, handler) => {
  return function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    handler(ctx, Object.fromEntries(formData));
  };
};
