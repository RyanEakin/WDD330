import MediaCart from "./MediaCart.mjs";
import { LoadHeaderFooter } from "./utils.mjs";

LoadHeaderFooter();

const med = new MediaCart();

med.renderCartContents()