import { getLocalStorage, ids, LoadHeaderFooter, qs } from "./utils.mjs";
import ExternalRecords from "./ExternalRecords.mjs";
import Recommendations from "./Recommendations.mjs";

const marathon = new ExternalRecords();

LoadHeaderFooter();
console.log(await marathon.getMediaData("movie", "popular", ""))
console.log(await marathon.getMediaData("", "?page=", "1"))

//const tvShow = await marathon.getMediaData("", "?page=", "1");
//const tvRequest = getLocalStorage("tvmaze_request");

const MovieId = await marathon.getMediaData("movie", "", "");
const MovieRequest = getLocalStorage("tmdb_request");

const category = ids("movie");

const mediaL = new Recommendations("", "", "1", MovieRequest[0], category);
mediaL.renderList(MovieRequest);