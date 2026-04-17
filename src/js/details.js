import { LoadHeaderFooter, getLocalStorage, ids, qs } from "./utils.mjs";
import RatingSystem from "./RatingsSystem.mjs";
import ExternalRecords from "./ExternalRecords.mjs";

const marathon = new ExternalRecords(); // so apparently the TvMaze API is quirky!
marathon.init(); // and needs these two lines! why? *shrugs*, just hates local storage for some reason.

const detail = new RatingSystem(ids("details-glance"));
const movie = getLocalStorage("tmdb_request");
getLocalStorage("tvmaze_request");

detail.renderDetails(movie);

// code to post review
ids("review_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const ratingScore = qs("input[name='star']:checked").id;

  const comment = ids("commentText").value;
  const user = ids("commenterName").value;

  //console.log(user);
  //console.log(ratingScore);
  //console.log(comment);

  //sanitizeData("commenterName");
  //sanitizeData("commentText");

  detail.postComment(user, ratingScore, comment);
});

LoadHeaderFooter();
