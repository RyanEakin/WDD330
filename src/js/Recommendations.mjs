import { ids, getLocalStorage, renderListWithTemplate } from "./utils.mjs";

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

export default class Recommendations {
    constructor(listElement) {
        this.listElement = listElement; //collects selected HTML element... must use querySelector()
    }

    async renderList(productList) {
        let listOfMedia = [];
        let retrievalList = [];

        //console.log(window.location.pathname.startsWith("/details.html"));

        if (this.listElement === ids("now_playing")) {
            productList = productList.slice(0, 7);

            renderListWithTemplate(mediaDisplay, this.listElement, productList);

        } else {

            let k = 0;
            let watchList = [];

            const tvList = await getLocalStorage("tvmaze_request");

            while (retrievalList.length < 7) {

                try {

                    const v = (Math.random() < 0.5)
                        ? watchList = productList
                        : watchList = tvList;

                    // this line sets watchList as either the first ? above, or the : above
                    watchList = Array.isArray(v) ? v : (v ? [v] : [])
                    // then if v isn't an array, it checks to see if it is within an array or if it is empty

                } catch (error) {
                    console.error(error);
                    watchList = Array.isArray(productList) ? productList : [];
                    //this checks if it is an array, then set to productList, else empty
                }
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