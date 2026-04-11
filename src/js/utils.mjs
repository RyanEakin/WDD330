// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

export function ids(selector, parent = document) {
  return parent.getElementById(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  if (localStorage.getItem(key) !== null && localStorage.getItem(key) !== '') {
    // this if statement works to prevent any error where the key's value is empty
    return JSON.parse(localStorage.getItem(key));
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = '';
    // if clear is true then clear the parentElement

  }

  // add check for tmdb api and make the datasource into the results key list

  const htmlStrings = list.map(templateFn)
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  if (callback) { // if there is a callback function (true), then run this code
    callback(data); // this executes the function in 'callback' parameter with the parameter of data

  }
  parentElement.innerHTML = `${template}`; // this adds the  template to the selected element in the webpage
}

export async function loadTemplate(fPath) {
  const templateFile = await fetch(fPath); // this collects the file contents from the path
  const templateHTML = await templateFile.text(); // this makes the contents into a string
  return templateHTML;
}

export async function LoadHeaderFooter() {// had to change to async so below awaits would work... should've seen that coming.
  // 1. load the header and footer templates
  const headerTemplate = await loadTemplate('/partials/header.html');
  const footerTemplate = await loadTemplate('/partials/footer.html');

  // 2. grab the header and footer placeholder elements out of the Document Object Model
  const face = document.getElementById('head'); // header
  const boot = document.getElementById('foot'); // footer

  // 3. render the header and footer
  renderWithTemplate(headerTemplate, face); // renders header at selected header element ID
  renderWithTemplate(footerTemplate, boot); // renders footer at selected footer element ID
}


export function alertMessage(message, scroll = true) {
  // can add duration later if I want to add a timed error message; 
  // apparently the default for required ALSO adds their own message so that's fun
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = qs("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => qs("main").removeChild(alert));
}

export function sanitizeData(dataElement) {
  const userComment = ids(dataElement);

  const filter = /(?<!\\)[!@#$%^&*()_+\-={}\[\]|\\:;"'`]/g;
  // filters any special characters so that if matching, they WILL be escaped properly

  //const testString_clear = "Hello";
  //const testString_special_one = "!@#$%^&*";
  //const testString_special_two = "()[]{}";
  // used for testing function catching special characters

  if (userComment.textContent.match(filter)) {
    console.log("sanitizing inputs!...")
  }
  else {
    console.log("all clear!");
  }

}