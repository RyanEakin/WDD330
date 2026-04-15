import { getParam, getLocalStorage, renderListWithTemplate, ids, setLocalStorage, qs } from "./utils.mjs";

export default class RatingSystem {
    constructor(listElement) {
        this.listElement = listElement;
    }



    async renderDetails(productList) {

        if (!getLocalStorage("comments-section-list")) {
            console.log("initiating test")
            this.testComment()// this function has been so confusing to handle due to the LocalStorage key NEEDING to be an empty array and nothing else
        }

        const Id = parseInt(getParam("id"));
        //console.log(Id) // used to figure out if it brings an int or string

        const tvMazes = await getLocalStorage("tvmaze_request");
        const mediaIdDiscoverList = await getLocalStorage("tmdb_request");
        const mediaIdPlayList = await getLocalStorage("tmdb_play_request");
        const mediaIdPopList = await getLocalStorage("tmdb_pop_request");
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

        if (getLocalStorage("comments-section-list")) {
            renderListWithTemplate(this.displayComments, ids("commented"), getLocalStorage("comments-section-list"), "beforeend");
            // this uses the function from utils to get the template cards generated
        }
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

        window.addEventListener('pageshow', () => {
            ids("none").checked = true;
            ids("commentText").value = ""
            ids("commenterName").value = ""
        });

        // code to set rating star images
        ids("bah").addEventListener("click", () => {
            qs(".starRate-1").src = "/images/star-solid-full.svg";
            qs(".starRate-2").src = "/images/star-regular-full.svg";
            qs(".starRate-3").src = "/images/star-regular-full.svg";
            qs(".starRate-4").src = "/images/star-regular-full.svg";
            qs(".starRate-5").src = "/images/star-regular-full.svg";
        })
        ids("meh").addEventListener("click", () => {
            qs(".starRate-1").src = "/images/star-solid-full.svg";
            qs(".starRate-2").src = "/images/star-solid-full.svg";
            qs(".starRate-3").src = "/images/star-regular-full.svg";
            qs(".starRate-4").src = "/images/star-regular-full.svg";
            qs(".starRate-5").src = "/images/star-regular-full.svg";
        })
        ids("decent").addEventListener("click", () => {
            qs(".starRate-1").src = "/images/star-solid-full.svg";
            qs(".starRate-2").src = "/images/star-solid-full.svg";
            qs(".starRate-3").src = "/images/star-solid-full.svg";
            qs(".starRate-4").src = "/images/star-regular-full.svg";
            qs(".starRate-5").src = "/images/star-regular-full.svg";
        })
        ids("good").addEventListener("click", () => {
            qs(".starRate-1").src = "/images/star-solid-full.svg";
            qs(".starRate-2").src = "/images/star-solid-full.svg";
            qs(".starRate-3").src = "/images/star-solid-full.svg";
            qs(".starRate-4").src = "/images/star-solid-full.svg";
            qs(".starRate-5").src = "/images/star-regular-full.svg";
        })
        ids("great").addEventListener("click", () => {
            qs(".starRate-1").src = "/images/star-solid-full.svg";
            qs(".starRate-2").src = "/images/star-solid-full.svg";
            qs(".starRate-3").src = "/images/star-solid-full.svg";
            qs(".starRate-4").src = "/images/star-solid-full.svg";
            qs(".starRate-5").src = "/images/star-solid-full.svg";
        })


        //console.log(data); // used to figure out what was coming through the data variable

        let star_value = "";
        switch (parseInt(data.ratingScore)) { //check what user rated the media and set up proper star amount
            case 1:
                star_value = `<img src="/images/star-solid-full.svg" alt="star"><img src="/images/star-regular-full.svg" alt="star"><img src="/images/star-regular-full.svg" alt="star"><img src="/images/star-regular-full.svg" alt="star"><img src="/images/star-regular-full.svg" alt="star">`;
                break;

            case 2:
                star_value = `<img src="/images/star-solid-full.svg" alt="star"><img src="/images/star-solid-full.svg" alt="star"><img src="/images/star-regular-full.svg" alt="star"><img src="/images/star-regular-full.svg" alt="star"><img src="/images/star-regular-full.svg" alt="star">`;
                break;

            case 3:
                star_value = `<img src="/images/star-solid-full.svg" alt="star"><img src="/images/star-solid-full.svg" alt="star"><img src="/images/star-solid-full.svg" alt="star"><img src="/images/star-regular-full.svg" alt="star"><img src="/images/star-regular-full.svg" alt="star">`;
                break;

            case 4:
                star_value = `<img src="/images/star-solid-full.svg" alt="star"><img src="/images/star-solid-full.svg" alt="star"><img src="/images/star-solid-full.svg" alt="star"><img src="/images/star-solid-full.svg" alt="star">`;
                break;
            case 5:
                star_value = `<img src="/images/star-solid-full.svg" alt="star"><img src="/images/star-solid-full.svg" alt="star"><img src="/images/star-solid-full.svg" alt="star"><img src="/images/star-solid-full.svg" alt="star">`;
                break;

            default:
                star_value = `<img src="/images/star-regular-full.svg" alt="star"><img src="/images/star-regular-full.svg" alt="star"><img src="/images/star-regular-full.svg" alt="star"><img src="/images/star-regular-full.svg" alt="star"><img src="/images/star-regular-full.svg" alt="star">`;;
                break;
        }

        const ratingContent = `
            <div class="userRating" id="${data.ratingScore}">${star_value}</div>
            <p><img src="/images/user-standin.png" alt="${data.user}"><span id="user">${data.user}</span>: ${data.commentText}</p>
        `;
        return ratingContent;
    }

    postComment(user, rating, review) {
        let r = "";

        switch (rating) {
            case "bah":
                r = 1;
                break;
            case "meh":
                r = 2;
                break;
            case "decent":
                r = 3;
                break;
            case "good":
                r = 4;
                break;
            case "great":
                r = 5;
                break;

            default:
                r = 0;
                break;
        }

        let comment = {
            "user": `${user}`,
            "ratingScore": `${r}`,
            "commentText": `${review}`
        };

        const comments = getLocalStorage("comments-section-list")
        comments.push(comment)

        setLocalStorage("comments-section-list", comments) // for the purposes of testing
        this.renderDetails();
    }


    testComment() {
        let comments = []; // set the variable to a null list
        setLocalStorage("comments-section-list", comments) // set localStorage to null

        for (let i = 0; 4 > i; i++) {
            let comment = {
                "user": `user-${i}`,
                "ratingScore": `${i}`,
                "commentText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi optio incidunt ducimus illum officiis aliquid ipsum soluta aliquam laudantium ratione! Expedita illum sunt porro quaerat nam aut veritatis laboriosam! Nihil."
            };

            const comments = getLocalStorage("comments-section-list")
            comments.push(comment)

            setLocalStorage("comments-section-list", comments) // for the purposes of testing
        }
    }

}






