import { LoadHeaderFooter, sanitizeData, getLocalStorage, ids, } from "./utils.mjs";
import RatingSystem from "./RatingsSystem.mjs";

const detail = new RatingSystem(ids("details-glance"));
detail.renderDetails(getLocalStorage("tmdb_request"));

sanitizeData("comments-section");
LoadHeaderFooter();
