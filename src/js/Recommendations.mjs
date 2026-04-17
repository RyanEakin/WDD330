import ExternalRecords from "./ExternalRecords.mjs";
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

    async init() {
        this.MovieRequest = await getLocalStorage("tmdb_request");
        this.MoviePopularRequest = await getLocalStorage("tmdb_pop_request");
        this.MoviePlayRequest = await getLocalStorage("tmdb_play_request");
        this.tvList = await getLocalStorage("tvMaze_requests");
    }

    async renderList(listElement, productList) {
        let listOfMedia = [];
        let retrievalList = [];
        const marathon = new ExternalRecords();
        const tvList = await marathon.getMediaData();

        if (this.MovieRequest === undefined || null || []) {
            const req = new ExternalRecords();
            req.getMediaData("movie", "", "");
        }
        if (this.tvList === undefined || null || []) {
            const res = new ExternalRecords();
            res.getMediaData("", "?page=", "1");
        }

        //console.log(window.location.pathname.startsWith("/details.html"));

        if (this.listElement === ids("now_playing")) {
            productList = productList.slice(0, 7);

            renderListWithTemplate(mediaDisplay, listElement, productList);

        } else {

            let k = 0;
            let watchList = [];

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
                    console.log("tripped")
                }
                k = Math.floor(Math.random() * watchList.length);
                //console.log(watchList)

                if (!retrievalList.includes(k)) {
                    listOfMedia = watchList.slice(k, k + 1);
                    retrievalList.push(k);

                    renderListWithTemplate(mediaDisplay, listElement, listOfMedia);
                    // console.log(listOfMedia)
                    // this uses the function from utils to get the template cards generated
                }


            }

        }


    }
}