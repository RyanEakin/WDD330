(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=s(i);fetch(i.href,o)}})();function y(e,t=document){return t.getElementById(e)}function d(e){if(localStorage.getItem(e)!==null&&localStorage.getItem(e)!=="")return JSON.parse(localStorage.getItem(e))}function b(e,t){localStorage.setItem(e,JSON.stringify(t))}function v(e){const t=window.location.search;return new URLSearchParams(t).get(e)}function m(e,t,s,r="afterbegin",i=!1){i&&(t.innerHTML="");const o=s.map(e);t.insertAdjacentHTML(r,o.join(""))}function u(e,t,s,r){t.innerHTML=`${e}`}async function f(e){return await(await fetch(e)).text()}async function w(){const e=await f("/partials/header.html"),t=await f("/partials/footer.html"),s=document.getElementById("head"),r=document.getElementById("foot");u(e,s),u(t,r)}function M(e){const t=y(e),s=new RegExp("(?<!\\\\)[!@#$%^&*()_+\\-={}\\[\\]|\\\\:;\"'`]","g");t.textContent.match(s)?console.log("sanitizing inputs!..."):console.log("all clear!")}function I(e){let t="";return Object.keys(e).includes("url")===!0?t=`<a href="details.html?id=${e.id}"><img src="${e.image.medium}" alt="${e.name}"/></a>`:t=`<a href="details.html?id=${e.id}"><img src="https://image.tmdb.org/t/p/w185${e.poster_path}" alt="${e.title}"/></a>`,t}function L(e){let t="";return Object.keys(e).includes("url")===!0?t=`          <div>
            <img src="${e.image.medium}" alt="${e.name}">
            <div>
              <p id="MovieTitle">${e.name}</p>
              <button class="add-movie">Add Media</button>
              <div class="rating-type">
                <p>where the stars and ratings from fans and critics are</p>
              </div>
            </div>
          </div>
          <p>
            Movie Description: ${e.summary}
          </p>`:t=`          <div>
            <img src="https://image.tmdb.org/t/p/w185${e.poster_path}" alt="${e.title}">
            <div>
              <p>${e.title}</p>
              <button class="add-movie">Add Media</button>
              <div class="rating-type">
                <p>where the stars and ratings from fans and critics are</p>
              </div>
            </div>
          </div>
          <p>
            Movie Description: ${e.overview}
          </p>`,t}class ${constructor(t){this.listElement=t}renderList(t){let s=[],r=[];if(window.location.pathname.startsWith("/details.html")===!0){const i=parseInt(v("id")),o=d("tvmaze_request"),c=d("tmdb_request"),p=d("tmdb_play_request"),h=d("tmdb_pop_request");let g=[],a=[];o.forEach(n=>{g.push(n.id)}),c.forEach(n=>{a.push(n)}),p.forEach(n=>{a.push(n)}),h.forEach(n=>{a.push(n)}),a.forEach(n=>{if(console.log(n.id),n.id===i){console.log("found IT!");const l=a.indexOf(n);console.log(l),t=a.slice(l,l+1)}}),o.forEach(n=>{if(console.log(n.id),n.id===i){console.log("found IT!");const l=o.indexOf(n);console.log(l),t=o.slice(l,l+1)}}),m(L,this.listElement,t)}else{let i=0;for(;r.length<7;){let o;Math.random()<.5?o=t:o=d("tvmaze_request"),i=Math.floor(Math.random()*o.length),r.includes(i)||(s=o.slice(i,i+1),r.push(i),m(I,this.listElement,s))}}}}export{w as L,$ as R,b as a,d as g,y as i,M as s};
