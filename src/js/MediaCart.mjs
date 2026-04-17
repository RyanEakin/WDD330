import { LoadHeaderFooter, setLocalStorage, getLocalStorage, renderListWithTemplate, qs, ids } from "./utils.mjs";

function cartItemTemplate(item) {



    const itemDelete = `<button class="delete-item" id="${item.id}">X</button>`;

    const newItem = `
    <div class="media-card">
          <img src="${item.image}" alt="${item.name}" />
          <p class="desc">${item.name}</p>
          ${itemDelete}
    </div>`;

    return newItem;
}

export default class MediaCart {
    constructor() {
        this.listElement = ".media-list";
    }

    renderCartContents() {
        const cartItems = getLocalStorage("media-cart");
        // selects the product-details list from the localstorage so-cart and places it into cartItems

        // Checks if cartItems exists before trying to render [this fixed the error that would have occured if we didn't check for cartItems existence]
        if (cartItems && cartItems.length > 0) {
            const htmlItems = cartItems.map((item) => cartItemTemplate(item));
            qs(this.listElement).innerHTML = htmlItems.join("");
            // this joins every entry from htmlItems into the listElement selected

            qs(this.listElement).addEventListener("click", (e) => {
                const btn = e.target.closest('.delete-item');
                // adds an event listener to btn's with the cart-card_delete class
                if (!btn || !qs(this.listElement).contains(btn)) return;
                // checks if the element that has been acquired indeed has btn, if not return

                const prodId = btn.id;
                // console.log(prodId)

                this.removeItemById(prodId, btn);

            })
        }
    }

    removeItemById(id, btn) {
        ids(`${id}`).style.backgroundColor = "#002951";
        const cartItems = getLocalStorage("media-cart") || []; // collects product cart from local storage

        let idx = cartItems.findIndex(i => String(i.id) === String(id)); // finds first instance of product id and it's index value

        // console.log(idx)
        setTimeout(() => {
            if (idx !== -1) { // if idx did not return an error (-1) then:
                cartItems.splice(idx, 1); // cut the item from the index point
                const dump = btn.closest('.media-card'); // this selects the parent element of the button [the li element of the card]
                if (dump) dump.remove(); // this removes the product card that was selected [closest to the current button]

                setLocalStorage("media-cart", cartItems); // saves changes to cart
                this.renderCartContents(); // re-renders cart contents
                LoadHeaderFooter(); // re-renders the header and footer so that items in cart number update dynamically
            }
        }, 200);

    }

}