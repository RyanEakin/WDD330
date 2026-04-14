(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function m(e,t=document){return t.getElementById(e)}function d(e){if(localStorage.getItem(e)!==null&&localStorage.getItem(e)!=="")return JSON.parse(localStorage.getItem(e))}function g(e,t){localStorage.setItem(e,JSON.stringify(t))}function f(e){const t=window.location.search;return new URLSearchParams(t).get(e)}function a(e,t,n,o="afterbegin",i=!1){i&&(t.innerHTML="");const r=n.map(e);t.insertAdjacentHTML(o,r.join(""))}function l(e,t,n,o){t.innerHTML=`${e}`}async function c(e){return await(await fetch(e)).text()}async function h(){const e=await c("/partials/header.html"),t=await c("/partials/footer.html"),n=document.getElementById("head"),o=document.getElementById("foot");l(e,n),l(t,o)}function y(e){const t=m(e),n=new RegExp("(?<!\\\\)[!@#$%^&*()_+\\-={}\\[\\]|\\\\:;\"'`]","g");t.textContent.match(n)?console.log("sanitizing inputs!..."):console.log("all clear!")}function u(e){let t="";return Object.keys(e).includes("url")===!0?t=`<a href="details.html?id=${e.id}"><img src="${e.image.medium}" alt="${e.name}"/></a>`:t=`<a href="details.html?id=${e.id}"><img src="https://image.tmdb.org/t/p/w185${e.poster_path}" alt="${e.title}"/></a>`,t}function p(e){let t="";return Object.keys(e).includes("url")===!0?t=`          <div>
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
          </p>`,t}class v{constructor(t){this.listElement=t}renderList(t){let n=[];if(window.location.pathname.startsWith("/details.html")===!0){const o=parseInt(f("id"));t.forEach(i=>{if(i.id===o){const r=t.indexOf(i);console.log(r),t=t.slice(r,r+1)}}),a(p,this.listElement,t)}else{let o=0;for(let i=0;i<8;i++){let r;if(Math.random()<.5?r=t:r=d("tvmaze_request"),o=Math.floor(Math.random()*r.length)+1,console.log(r),!n.includes(o))n=r.slice(o,o+1);else return;a(u,this.listElement,n)}}}}export{h as L,v as R,g as a,d as g,m as i,y as s};
