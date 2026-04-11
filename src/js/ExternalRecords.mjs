import { setLocalStorage } from "./utils.mjs";

const movieURL = import.meta.env.VITE_TMDBURL;
const showURL = import.meta.env.VITE_TVMAZEURL;

const keyOne = import.meta.env.VITE_TMDBKEY;
const keyTwo = import.meta.env.VITE_TVMAZEKEY;

async function convertToJson(res) {
    if (!res.ok) {
        return Promise.reject({ name: 'servicesError', message: `HTTP ${res.status}` });
    }
    const req = await res.json()
    return req;

}

export default class ExternalRecords {

    async getMediaData(source, section, id = "") {
        let url = "";
        let field = "";
        let APIkey = "";
        let cache = "";


        if (source === "movie") {
            url = movieURL;
            APIkey = keyOne;
            if (section === "popular") {
                field = "movie/popular?language=en-US&region=US";
            }
            else if (section === "now_playing") {
                field = "movie/now_playing?language=en-US&region=US";
            }
            else {
                field = "discover/movie?language=en-US";
            }
            cache = await fetch(`${url}${field}`, {
                headers: {
                    //apparently this causes a Cross Origin Request Sharing preflight to occur 
                    // and causes it to be rejected by tvmaze's API due to it handling ONLY simple fetches
                    "Authorization": `Bearer ${APIkey}`,
                    "Content-Type": "application/json"
                }
            })
                .then(convertToJson)
                .then((data) => data)
            setLocalStorage("tmdb_request", cache);
            return cache;
        }
        else {
            url = showURL;
            APIkey = keyTwo;

            if (section) {
                field = "?page=";
            }

            cache = await fetch(`${url}${field}${id}`) // apparently this doesn't get rejected because it is a simple fetch
                .then(convertToJson)
                .then((data) => data)
            setLocalStorage("tvmaze_request", cache);
            return cache;
        }
    }



}

//    async getData(category) {
//        return await fetch(`${ movieURL } products / search / ${ category } `) // fetches from API, category data
//            .then(convertToJson) // converts API data to Json
//            .then((data) => data.Result); // this returns data.Result instead of data alone.
//    }