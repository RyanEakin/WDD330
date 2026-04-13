import { getParam, renderListWithTemplate } from "./utils.mjs";

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
              <p id="title">${data.name}</p>
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

        //console.log(window.location.pathname.startsWith("/details.html"));

        if (window.location.pathname.startsWith("/details.html") === true) {
            const Id = parseInt(getParam("id"));
            //console.log(Id) // used to figure out if it brings an int or string

            const data = productList[0];
            productList.forEach(data => {
                //console.log(data.id) // had to see if the id was actually being displayed properly

                if (data.id === Id) {
                    //console.log("found IT!") // this took a while to figure out, though I succeeded!
                    const idx = productList.indexOf(data);
                    console.log(idx)

                    productList = productList.slice(idx, idx + 1);
                    // this gets the index of the movie by id 
                    // and then it slices it out of the productList array
                }

            });

            renderListWithTemplate(detailsDisplay, this.listElement, productList);
            // this uses the function from utils to get the template cards generated
        } else {

            productList = productList.slice(0, 7);

            renderListWithTemplate(mediaDisplay, this.listElement, productList);
            // this uses the function from utils to get the template cards generated
        }


    }
}