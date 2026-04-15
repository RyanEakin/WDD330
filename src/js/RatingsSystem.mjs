import { getParam, getLocalStorage, renderListWithTemplate, ids } from "./utils.mjs";

export default class RatingSystem {
    constructor(listElement) {
        this.listElement = listElement;
    }



    renderDetails(productList) {
        const Id = parseInt(getParam("id"));
        //console.log(Id) // used to figure out if it brings an int or string

        const tvMazes = getLocalStorage("tvmaze_request");
        const mediaIdDiscoverList = getLocalStorage("tmdb_request");
        const mediaIdPlayList = getLocalStorage("tmdb_play_request");
        const mediaIdPopList = getLocalStorage("tmdb_pop_request");
        // requests from the local storage cache

        let tvIdList = [];
        let mediaIdList = [];
        // the two lists that will contain the id that is looked for

        tvMazes.forEach(element => {
            tvIdList.push(element.id);
            //console.log(tvIdList)
        });

        mediaIdDiscoverList.forEach(element => {
            mediaIdList.push(element);
            //console.log(tvIdList)
        });
        mediaIdPlayList.forEach(element => {
            mediaIdList.push(element);
            //console.log(tvIdList)
        });
        mediaIdPopList.forEach(element => {
            mediaIdList.push(element);
            //console.log(tvIdList)
        });



        //console.log(tvIdList);

        mediaIdList.forEach(data => {
            // console.log(data.id) // had to see if the id was actually being displayed properly

            if (data.id === Id) {
                // console.log("found IT!") // this took a while to figure out, though I succeeded!
                const idx = mediaIdList.indexOf(data);
                // console.log(idx)

                productList = mediaIdList.slice(idx, idx + 1);
                // this gets the index of the movie by id 
                // and then it slices it out of the productList array
            }

        });

        tvMazes.forEach(data => {
            // console.log(data.id) // had to see if the id was actually being displayed properly

            if (data.id === Id) {
                // console.log("found IT!") // this took a while to figure out, though I succeeded!
                const idx = tvMazes.indexOf(data);
                // console.log(idx)

                productList = tvMazes.slice(idx, idx + 1);
                // this gets the index of the movie by id 
                // and then it slices it out of the productList array
            }

        });

        renderListWithTemplate(this.detailsDisplay, this.listElement, productList);
        renderListWithTemplate(this.displayComments, ids("comments-section"), productList, "beforeend");
        // this uses the function from utils to get the template cards generated
    }




    detailsDisplay(data) {
        let htmlContent = "";
        const arrayInfo = Object.keys(data)

        if (arrayInfo.includes("url") === true) {
            let rating = "N/A";

            if (data.rating.average) {
                rating = data.rating.average.toFixed(1)
            }

            htmlContent = `          <div>
            <img src="${data.image.medium}" alt="${data.name}">
            <div>
              <p id="MovieTitle">${data.name}</p>
              <button class="add-movie">Add Media</button>
              <div class="rating-type">
                <p id="api_rating">${rating}</p>
              </div>
            </div>
          </div>
          <p>
            Show Description: ${data.summary}
          </p>`;
        } else {

            htmlContent = `          <div>
            <img src="https://image.tmdb.org/t/p/w185${data.poster_path}" alt="${data.title}">
            <div>
              <p id="MovieTitle">${data.title}</p>
              <button class="add-movie">Add Media</button>
              <div class="rating-type">
                <p id="api_rating">${data.vote_average.toFixed(1)}</p>
              </div>
            </div>
          </div>
          <p>
            Movie Description: ${data.overview}
          </p>`;
        }
        return htmlContent;
    }

    displayComments(data) {
        const comments = [];

        comments.forEach(element => {
            //todo: insert comments into template literal via localStorage usage
        });

        const ratingContent = `
        <div class="comment-form">
            <div id="commented">
                ${comments}
                <p>test comment: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi optio incidunt ducimus illum officiis aliquid ipsum soluta aliquam laudantium ratione! Expedita illum sunt porro quaerat nam aut veritatis laboriosam! Nihil.</p>
                <p>test comment: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi optio incidunt ducimus illum officiis aliquid ipsum soluta aliquam laudantium ratione! Expedita illum sunt porro quaerat nam aut veritatis laboriosam! Nihil.</p>
                <p>test comment: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi optio incidunt ducimus illum officiis aliquid ipsum soluta aliquam laudantium ratione! Expedita illum sunt porro quaerat nam aut veritatis laboriosam! Nihil.</p>
                <p>test comment: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi optio incidunt ducimus illum officiis aliquid ipsum soluta aliquam laudantium ratione! Expedita illum sunt porro quaerat nam aut veritatis laboriosam! Nihil.</p>
                <p>test comment: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi optio incidunt ducimus illum officiis aliquid ipsum soluta aliquam laudantium ratione! Expedita illum sunt porro quaerat nam aut veritatis laboriosam! Nihil.</p>
            </div>
            <input type="text" id="commenterName" placeholder="Your Name">
            <textarea id="commentText" placeholder="Your Comment"></textarea>
            <button id="postComment">Post Comment</button>
        </div>`;
        return ratingContent;
    }


    grabRatings() {
        // todo: for comment system to grab from localStorage where the comments text AND star rating will be
    }
}


