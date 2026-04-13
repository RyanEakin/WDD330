import { renderListWithTemplate } from "./utils.mjs";

function mediaDisplay(data) {
    const poster = "";
    const title = "";
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
    constructor(source, section, id, dataSource, listElement) {
        this.source = source;
        this.section = section;
        this.id = id;
        this.dataSource = dataSource; //this is an instance of ExternalRecords
        this.listElement = listElement; //collects selected HTML element... must use querySelector()
    }
    async init() {
        // sends a promise, await will resolve it.
        const medList = await this.dataSource.getMediaData(this.source, this.section, this.id); // grabs list of API json entries and maps to an array
        //console.log(prodList)
        this.renderList(medList);
    }

    renderList(productList) {
        let pageContext = "";

        if (window.location.pathname === "/details.html") {
            pageContext = detailsDisplay;
        } else {
            pageContext = mediaDisplay;
        }

        renderListWithTemplate(pageContext, this.listElement, productList);
        // this uses the function from utils to get the template cards generated
    }
}