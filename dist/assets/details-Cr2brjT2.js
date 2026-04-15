import{g as p,a as n,r as l,i as r,s as v,L as g}from"./utils-CR7BxCPE.js";class f{constructor(i){this.listElement=i}renderDetails(i){const e=parseInt(p("id")),a=n("tvmaze_request"),o=n("tmdb_request"),u=n("tmdb_play_request"),d=n("tmdb_pop_request");let c=[],s=[];a.forEach(t=>{c.push(t.id)}),o.forEach(t=>{s.push(t)}),u.forEach(t=>{s.push(t)}),d.forEach(t=>{s.push(t)}),s.forEach(t=>{if(t.id===e){const m=s.indexOf(t);i=s.slice(m,m+1)}}),a.forEach(t=>{if(t.id===e){const m=a.indexOf(t);i=a.slice(m,m+1)}}),l(this.detailsDisplay,this.listElement,i),l(this.displayComments,r("comments-section"),i,"beforeend")}detailsDisplay(i){let e="";if(Object.keys(i).includes("url")===!0){let o="N/A";i.rating.average&&(o=i.rating.average.toFixed(1)),e=`          <div>
            <img src="${i.image.medium}" alt="${i.name}">
            <div>
              <p id="MovieTitle">${i.name}</p>
              <button class="add-movie">Add Media</button>
              <div class="rating-type">
                <p id="api_rating">${o}</p>
              </div>
            </div>
          </div>
          <p>
            Show Description: ${i.summary}
          </p>`}else e=`          <div>
            <img src="https://image.tmdb.org/t/p/w185${i.poster_path}" alt="${i.title}">
            <div>
              <p id="MovieTitle">${i.title}</p>
              <button class="add-movie">Add Media</button>
              <div class="rating-type">
                <p id="api_rating">${i.vote_average.toFixed(1)}</p>
              </div>
            </div>
          </div>
          <p>
            Movie Description: ${i.overview}
          </p>`;return e}displayComments(i){const e=[];return e.forEach(o=>{}),`
        <div class="comment-form">
            <div id="commented">
                ${e}
                <p>test comment: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi optio incidunt ducimus illum officiis aliquid ipsum soluta aliquam laudantium ratione! Expedita illum sunt porro quaerat nam aut veritatis laboriosam! Nihil.</p>
                <p>test comment: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi optio incidunt ducimus illum officiis aliquid ipsum soluta aliquam laudantium ratione! Expedita illum sunt porro quaerat nam aut veritatis laboriosam! Nihil.</p>
                <p>test comment: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi optio incidunt ducimus illum officiis aliquid ipsum soluta aliquam laudantium ratione! Expedita illum sunt porro quaerat nam aut veritatis laboriosam! Nihil.</p>
                <p>test comment: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi optio incidunt ducimus illum officiis aliquid ipsum soluta aliquam laudantium ratione! Expedita illum sunt porro quaerat nam aut veritatis laboriosam! Nihil.</p>
                <p>test comment: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi optio incidunt ducimus illum officiis aliquid ipsum soluta aliquam laudantium ratione! Expedita illum sunt porro quaerat nam aut veritatis laboriosam! Nihil.</p>
            </div>
            <input type="text" id="commenterName" placeholder="Your Name">
            <textarea id="commentText" placeholder="Your Comment"></textarea>
            <button id="postComment">Post Comment</button>
        </div>`}grabRatings(){}}const h=new f(r("details-glance"));h.renderDetails(n("tmdb_request"));v("comments-section");g();
