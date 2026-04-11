import { LoadHeaderFooter } from "./utils.mjs";
import ExternalRecords from "./ExternalRecords.mjs";
import Recommendations from "./Recommendations.mjs";

const marathon = new ExternalRecords();

LoadHeaderFooter();
//console.log(await marathon.getMediaData("movie", "popular", ""))
//console.log(await marathon.getMediaData("", "?page=", "1"))

const tvShow = marathon.getMediaData("", "?page=", "1");
//const MovieId = await marathon.getMediaData("movie", "", "");

const mediaL = new Recommendations("", "", tvShow, "1");
mediaL.renderList(tvShow);
