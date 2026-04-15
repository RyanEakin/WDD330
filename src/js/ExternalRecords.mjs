import { setLocalStorage } from "./utils.mjs";

const movieURL = "https://api.themoviedb.org/3/";
const showURL = "https://api.tvmaze.com/shows";

const keyOne = import.meta.env.TMDBKEY;


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
        let cache_key = "";


        if (source === "movie") {
            url = movieURL;
            APIkey = keyOne;
            if (section === "popular") {
                field = "movie/popular?region=US&language=en-US"; // endpoint url
                cache_key = "tmdb_pop_request"
            }
            else if (section === "now_playing") {
                field = "movie/now_playing?region=US&language=en-US"; // endpoint url
                cache_key = "tmdb_play_request"
            }
            else {
                field = "discover/movie?region=US&language=en-US&page=2&adult=false"; // endpoint url
                cache_key = "tmdb_request";
            }
            cache = await fetch(`${url}${field}${id}`, {
                headers: {
                    //apparently this causes a Cross Origin Request Sharing preflight to occur 
                    // and causes it to be rejected by tvmaze's API due to it handling ONLY simple fetches
                    "Authorization": `Bearer ${APIkey}`,
                    "Content-Type": "application/json"
                }
            })
                .then(convertToJson)
                .then((data) => data)
            setLocalStorage(cache_key, cache.results);
            return cache;
        }
        else {
            url = showURL;

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