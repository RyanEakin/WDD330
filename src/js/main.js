import { getLocalStorage, ids, LoadHeaderFooter } from "./utils.mjs";
import ExternalRecords from "./ExternalRecords.mjs";
import Recommendations from "./Recommendations.mjs";

const marathon = new ExternalRecords();

LoadHeaderFooter();
//console.log(await marathon.getMediaData("movie", "", ""))
//console.log(await marathon.getMediaData("", "?page=", "1"))
marathon.getMediaData("movie", "", "");
marathon.getMediaData("movie", "popular", "");
marathon.getMediaData("movie", "now_playing", "");
marathon.getMediaData("", "?page=", "1")

const MovieRequest = getLocalStorage("tmdb_request");
const MoviePopularRequest = getLocalStorage("tmdb_pop_request");
const MoviePlayRequest = getLocalStorage("tmdb_play_request");

const mediaL = new Recommendations(ids("movie")); // made it simplier, because... renderList is the ONLY function that needs datasource
mediaL.renderList(MovieRequest);

const mediaL_pop = new Recommendations(ids("popular")); // made it simplier, because... renderList is the ONLY function that needs datasource
mediaL_pop.renderList(MoviePopularRequest);

const mediaL_play = new Recommendations(ids("now_playing")); // made it simplier, because... renderList is the ONLY function that needs datasource
mediaL_play.renderList(MoviePlayRequest);
