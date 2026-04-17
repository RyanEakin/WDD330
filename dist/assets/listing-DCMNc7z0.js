import{g as c,q as r,s as o,L as d}from"./utils-D1tFMNd-.js";function m(a){const t=`<button class="delete-item" id="${a.Id}">X</button>`;return`
    <div class="media-card">
          <img src="${a.image}" alt="${a.name}" />
          <p class="desc">${a.name}</p>
          ${t}
    </div>`}class l{constructor(){this.listElement=".media-list"}renderCartContents(){const t=c("media-cart");if(t&&t.length>0){const i=t.map(e=>m(e));r(this.listElement).innerHTML=i.join(""),r(this.listElement).addEventListener("click",e=>{const s=e.target.closest(".delete-item");if(!s||!r(this.listElement).contains(s))return;const n=s.id;this.removeItemById(n,s)})}}removeItemById(t,i){const e=c("media-cart")||[];let s=e.findIndex(n=>String(n.Id)===String(t));if(s!==-1){e.splice(s,1);const n=i.closest(".media-card");n&&n.remove(),o("media-cart",e),this.renderCartContents(),d()}}}d();const I=new l;I.renderCartContents();
