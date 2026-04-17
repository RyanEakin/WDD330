import { ids, LoadHeaderFooter, getLocalStorage } from "./utils.mjs";
import ExternalRecords from "./ExternalRecords.mjs";
import Recommendations from "./Recommendations.mjs";

const marathon = new ExternalRecords();

if (localStorage.length === 0) {
  marathon.init();
}

//console.log(await marathon.getMediaData("movie", "", ""))
//console.log(await marathon.getMediaData("", "?page=", "1"))

const Movies = getLocalStorage("tmdb_request");
const Play = getLocalStorage("tmdb_play_request");
const Pop = getLocalStorage("tmdb_pop_request");

const mediaL = new Recommendations(); // made it simplier, because... renderList is the ONLY function that needs datasource
mediaL.init();
mediaL.renderList(ids("movie"), Movies);
mediaL.renderList(ids("popular"), Pop);

const mediaL_play = new Recommendations(); // made it simplier, because... renderList is the ONLY function that needs datasource
mediaL_play.init();
mediaL_play.renderList(ids("now_playing"), Play);

LoadHeaderFooter();
