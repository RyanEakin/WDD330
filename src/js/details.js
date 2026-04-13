import { LoadHeaderFooter, sanitizeData, getLocalStorage, ids } from "./utils.mjs";
import Recommendations from "./Recommendations.mjs";

const detail = new Recommendations(ids("details-glance"));
detail.renderList(getLocalStorage("tmdb_request"))

sanitizeData("comments-section");
LoadHeaderFooter();
