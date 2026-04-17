import Recommendations from "./Recommendations.mjs";
import { ids, getLocalStorage } from "./utils.mjs";

const MovieRequest = getLocalStorage("tmdb_request");
const MoviePopularRequest = getLocalStorage("tmdb_pop_request");
const MoviePlayRequest = getLocalStorage("tmdb_play_request");
const tvList = getLocalStorage("tvMaze_requests");

const mediaL = new Recommendations(); // made it simplier, because... renderList is the ONLY function that needs datasource
mediaL.init();
mediaL.renderList(ids("movie"), MovieRequest, tvList);

const mediaL_pop = new Recommendations(); // made it simplier, because... renderList is the ONLY function that needs datasource
mediaL_pop.init();
mediaL_pop.renderList(ids("popular"), MoviePopularRequest, tvList);

const mediaL_play = new Recommendations(); // made it simplier, because... renderList is the ONLY function that needs datasource
mediaL_play.init();
mediaL_play.renderList(ids("now_playing"), MoviePlayRequest, tvList);
