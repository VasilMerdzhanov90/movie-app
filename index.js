import page from "./src/lib/page/page.mjs";

import { addRender } from "../src/middlewares/addRender.js";
import { noUserGuard, userGuard } from "../src/middlewares/guards.js";
import { loader } from "../src/middlewares/loader.js";
import {
  preloadDetails,
  preloadHomeData,
  preloadMovies,
  preloadPersonDetails,
  preloadSeries,
  preloadVideos,
} from "../src/middlewares/preloadData.js";
import { userNavigation } from "../src/middlewares/userNavigation.js";

import { categoryView } from "../src/views/category/categoryView.js";
import { detailsView } from "../src/views/details/details.js";
import { favoritesView } from "../src/views/favorites/favorites.js";
import { homeView } from "../src/views/home/home.js";
import { mainSeriesAndMoviesView } from "../src/views/mainSeriesAndMovies/mainSeriesAndMoviesView.js";
import { navigationComponent } from "../src/views/navigation/navigation.js";
import { personDetailsView } from "../src/views/person/person.js";
import { searchView } from "../src/views/search/search.js";
import { loginView } from "../src/views/user/login.js";
import { registerView } from "../src/views/user/register.js";

//middlewares
page(addRender);
page(navigationComponent);
page(userNavigation);
page(loader);

//links
page("/", noUserGuard, preloadHomeData, homeView);
page("/movies", noUserGuard, mainSeriesAndMoviesView);
page("/movies/:category/:page", noUserGuard, preloadMovies, categoryView);
page("/series", noUserGuard, mainSeriesAndMoviesView);
page("/series/:category/:page", noUserGuard, preloadSeries, categoryView);
page("/search", noUserGuard, noUserGuard, searchView);
page(
  "/details/:category/:id",
  noUserGuard,
  preloadDetails,
  preloadVideos,
  detailsView
);
page("/person/:id", noUserGuard, preloadPersonDetails, personDetailsView);
page("/login", userGuard, loginView);
page("/register", userGuard, registerView);
page("/favorite", favoritesView);

page();
