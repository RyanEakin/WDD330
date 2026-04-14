import { ids, getLocalStorage, getParam, renderListWithTemplate } from "./utils.mjs";

function mediaDisplay(data) {
    let htmlContent = "";

    const arrayInfo = Object.keys(data)

    // with tmdb api I need to figure out how to get the values as an array and checked by forEach properly

    if (arrayInfo.includes("url") === true) {
        htmlContent = `<a href="details.html?id=${data.id}"><img src="${data.image.medium}" alt="${data.name}"/></a>`;
    }
    else {
        htmlContent = `<a href="details.html?id=${data.id}"><img src="https://image.tmdb.org/t/p/w185${data.poster_path}" alt="${data.title}"/></a>`;
    }
    return htmlContent;
}

function detailsDisplay(data) {
    let htmlContent = "";
    const arrayInfo = Object.keys(data)

    if (arrayInfo.includes("url") === true) {
        htmlContent = `          <div>
            <img src="${data.image.medium}" alt="${data.name}">
            <div>
              <p id="MovieTitle">${data.name}</p>
              <button class="add-movie">Add Media</button>
              <div class="rating-type">
                <p>where the stars and ratings from fans and critics are</p>
              </div>
            </div>
          </div>
          <p>
            Movie Description: ${data.summary}
          </p>`;
    } else {

        htmlContent = `          <div>
            <img src="https://image.tmdb.org/t/p/w185${data.poster_path}" alt="${data.title}">
            <div>
              <p>${data.title}</p>
              <button class="add-movie">Add Media</button>
              <div class="rating-type">
                <p>where the stars and ratings from fans and critics are</p>
              </div>
            </div>
          </div>
          <p>
            Movie Description: ${data.overview}
          </p>`;
    }
    return htmlContent;
}

export default class Recommendations {
    constructor(listElement) {
        this.listElement = listElement; //collects selected HTML element... must use querySelector()
    }

    renderList(productList) {
        let listOfMedia = [];
        let retrievalList = [];

        //console.log(window.location.pathname.startsWith("/details.html"));

        if (window.location.pathname.startsWith("/details.html") === true) {
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
                console.log(data.id) // had to see if the id was actually being displayed properly

                if (data.id === Id) {
                    console.log("found IT!") // this took a while to figure out, though I succeeded!
                    const idx = mediaIdList.indexOf(data);
                    console.log(idx)

                    productList = mediaIdList.slice(idx, idx + 1);
                    // this gets the index of the movie by id 
                    // and then it slices it out of the productList array
                }

            });

            tvMazes.forEach(data => {
                console.log(data.id) // had to see if the id was actually being displayed properly

                if (data.id === Id) {
                    console.log("found IT!") // this took a while to figure out, though I succeeded!
                    const idx = tvMazes.indexOf(data);
                    console.log(idx)

                    productList = tvMazes.slice(idx, idx + 1);
                    // this gets the index of the movie by id 
                    // and then it slices it out of the productList array
                }

            });

            renderListWithTemplate(detailsDisplay, this.listElement, productList);
            // this uses the function from utils to get the template cards generated
        } else if (this.listElement === ids("now_playing")) {
            productList = productList.slice(0, 7);

            renderListWithTemplate(mediaDisplay, this.listElement, productList);

        } else {

            let k = 0;
            while (retrievalList.length < 7) {
                let watchList;

                Math.random() < 0.5 ? watchList = productList : watchList = getLocalStorage("tvmaze_request");

                k = Math.floor(Math.random() * watchList.length);
                //console.log(watchList)

                if (!retrievalList.includes(k)) {
                    listOfMedia = watchList.slice(k, k + 1);
                    retrievalList.push(k);

                    renderListWithTemplate(mediaDisplay, this.listElement, listOfMedia);
                    // this uses the function from utils to get the template cards generated
                }


            }

        }


    }
}