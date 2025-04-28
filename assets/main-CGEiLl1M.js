(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();const i=document.getElementById("book-dialog"),f=document.getElementById("add-button"),g=document.querySelector(".close-button"),p=document.getElementById("bars"),y=document.getElementById("nav"),m=document.getElementById("add-book-form"),d=document.getElementById("book-collection"),h=document.getElementById("total-books"),b=document.getElementById("books-read"),E=document.getElementById("pages-read");document.getElementById("current-year").textContent=new Date().getFullYear();f.addEventListener("click",()=>{i.showModal()});g.addEventListener("click",()=>{i.close()});p.addEventListener("click",()=>{y.classList.toggle("show")});let r=[];function v(){const e=localStorage.getItem("myLibrary");e&&(r=JSON.parse(e),u(),l())}function B(){localStorage.setItem("myLibrary",JSON.stringify(r))}function k(e,o,n,s=!1){this.title=e,this.author=o,this.pages=n,this.read=s,this.id=Date.now().toString()}function L(e,o,n,s){const t=new k(e,o,n,s);r.push(t),B(),u(),l()}function l(){h.textContent=r.length;const e=r.filter(n=>n.read).length;b.textContent=e;const o=r.reduce((n,s)=>s.read?n+parseInt(s.pages):n,0);E.textContent=o}function u(){if(d.innerHTML="",r.length===0){const e=document.createElement("div");e.className="empty-state",e.innerHTML=`
            <i class="fas fa-book-open" style="font-size: 4rem; color: #ddd; margin-bottom: 1rem;"></i>
            <h3>Your bookshelf is empty</h3>
            <p>Add your first book by clicking the + button</p>
        `,d.appendChild(e);return}r.forEach(e=>{const o=document.createElement("div");o.className="book-card";const s=`hsl(${Math.floor(Math.random()*360)}, 70%, 85%)`;o.innerHTML=`
            <div class="book-header" style="background-color: ${s}">
                <h3 class="book-title">${e.title}</h3>
                <p class="book-author">by ${e.author}</p>
            </div>
            <div class="book-content">
                <p class="book-pages"><i class="fas fa-file-alt"></i> ${e.pages} pages</p>
                <div class="book-actions">
                    <button onclick="toggleReadStatus('${e.id}')" 
                        class="status-button ${e.read?"status-read":"status-not-read"}">
                        <i class="fas ${e.read?"fa-check-circle":"fa-times-circle"}"></i>
                        ${e.read?"Read":"Not Read"}
                    </button>
                    <button onclick="removeBook('${e.id}')" class="remove-button">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `,d.appendChild(o)})}m.addEventListener("submit",function(e){e.preventDefault();const o=document.getElementById("title").value,n=document.getElementById("author").value,s=document.getElementById("pages").value,t=document.getElementById("read").checked;L(o,n,s,t),i.close(),m.reset()});v();u();l();
