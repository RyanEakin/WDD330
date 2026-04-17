import{g as o,q as r,i as d,s as m,L as c}from"./utils-DEbsMB2E.js";function l(a){const t=`<button class="delete-item" id="${a.id}">X</button>`;return`
    <div class="media-card">
          <img src="${a.image}" alt="${a.name}" />
          <p class="desc">${a.name}</p>
          ${t}
    </div>`}class I{constructor(){this.listElement=".media-list"}renderCartContents(){const t=o("media-cart");if(t&&t.length>0){const i=t.map(e=>l(e));r(this.listElement).innerHTML=i.join(""),r(this.listElement).addEventListener("click",e=>{const s=e.target.closest(".delete-item");if(!s||!r(this.listElement).contains(s))return;const n=s.id;this.removeItemById(n,s)})}}removeItemById(t,i){d(`${t}`).style.backgroundColor="#002951";const e=o("media-cart")||[];let s=e.findIndex(n=>String(n.id)===String(t));setTimeout(()=>{if(s!==-1){e.splice(s,1);const n=i.closest(".media-card");n&&n.remove(),m("media-cart",e),this.renderCartContents(),c()}},200)}}c();const g=new I;g.renderCartContents();
