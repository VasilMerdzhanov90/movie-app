import page from "./node_modules/page/page.mjs";
import { addRender } from "./src/middlewares/addRender.js";
import { loader } from "./src/middlewares/loader.js";
import {
  preloadDetails,
  preloadMovies,
  preloadSeries,
  preloadVideos,
} from "./src/middlewares/preloadData.js";
import { categoryView } from "./src/views/category/categoryView.js";
import { detailsView } from "./src/views/details/details.js";
import { homeView } from "./src/views/home/home.js";
import { moviesView } from "./src/views/movies/movies.js";
import { navigationComponent } from "./src/views/navigation/navigation.js";
import { searchView } from "./src/views/search/search.js";
import { seriesView } from "./src/views/series/series.js";

//middlewares
page(addRender);
page(navigationComponent);
page(loader);

//links
page("/", homeView);
page("/movies", moviesView);
page("/movies/:category/:page", preloadMovies, categoryView);
page("/series", seriesView);
page("/series/:category/:page", preloadSeries, categoryView);
page("/search", searchView);
page("/details/:category/:id", preloadDetails, preloadVideos, detailsView);

page("/login", () => console.log("login/register"));

page();
