import { renderListWithTemplate } from "./utils.mjs";

function mediaDisplay(data) {
    const poster = "";
    const title = "";

    // with tmdb api I need to figure out how to get the values as an array and checked by forEach properly

    data.forEach(point => {
        return `<a href="details.html?${point.id}"><img src="${poster}" alt="${title}"/></a>`
    });

}

export default class Recommendations {
    constructor(source, section, dataSource, listElement) {
        this.source = source;
        this.section = section;
        this.dataSource = dataSource; //this is an instance of ExternalRecords
        this.listElement = listElement; //collects selected HTML element... must use querySelector()
    }
    async init() {
        // sends a promise, await will resolve it.
        const medList = await this.dataSource.getMediaData(this.source, this.section, this.listElement, this.dataSource); // grabs list of API json entries and maps to an array
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

        renderListWithTemplate(pageContext, this.listElement, productList, true);
        // this uses the function from utils to get the template cards generated
    }
}