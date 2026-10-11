/* ===== CONFIGURATION: edit this block ===== */
const CONFIG = {
  BRAND_NAME: "[BRAND NAME]",
  WHATSAPP_NUMBER: "",   // international format, digits only, e.g. "919876543210"
  INSTAGRAM_URL: "",     // e.g. "https://instagram.com/yourbrand"
  EMAIL: "",             // e.g. "hello@example.com"
  ANNOUNCEMENT: "Introducing our first collection.", // set "" to hide the bar
};
/* Prices are PROVISIONAL placeholders (INR). Set `image` to a file in /images/ to replace the placeholder art. */
const PRODUCTS = [
  {id:"daily-sleeve",name:"The Daily Sleeve",category:"Laptop Sleeves",price:1499,shape:"sleeve",wash:"#2d4a78",image:"",alt:"Denim laptop sleeve",featured:true,availabilityStatus:"Concept. Availability to be confirmed.",description:"A slim denim sleeve for a laptop, with a clean zip and soft lining.",options:["Wash (illustrative)","Contrast stitching (illustrative)","Fits 13-14 inch laptops (placeholder size)"]},
  {id:"everyday-tote",name:"The Everyday Tote",category:"Bags & Totes",price:1799,shape:"tote",wash:"#4a6a98",image:"",alt:"Denim tote bag",featured:true,availabilityStatus:"Concept. Availability to be confirmed.",description:"A roomy tote in sturdy denim for work, errands, and weekends.",options:["Inner pocket (illustrative)","Initials (illustrative)","Dimensions: placeholder"]},
  {id:"utility-pouch",name:"The Utility Pouch",category:"Pouches & Organisers",price:699,shape:"pouch",wash:"#6F8FAF",image:"",alt:"Compact denim organiser pouch",featured:false,availabilityStatus:"Sample. Availability to be confirmed.",description:"A compact organiser for cables, pens, and small essentials.",options:["Wash (illustrative)","Contrast stitching (illustrative)"]},
  {id:"cardholder",name:"The Cardholder",category:"Wallets & Cardholders",price:599,shape:"card",wash:"#1f3355",image:"",alt:"Minimalist denim cardholder",featured:false,availabilityStatus:"Concept. Availability to be confirmed.",description:"A minimalist denim cardholder for cards and a few notes.",options:["Monogram (illustrative)","Thread colour (illustrative)"]},
  {id:"carry-all",name:"The Carry-All",category:"Pouches & Organisers",price:999,shape:"carry",wash:"#3a5a8a",image:"",alt:"Versatile denim pouch",featured:true,availabilityStatus:"Concept. Availability to be confirmed.",description:"A versatile pouch or small bag with room for the day's essentials.",options:["Pocket layout (illustrative)","Wash (illustrative)"]},
  {id:"patchwork-sleeve",name:"The Patchwork Sleeve",category:"Laptop Sleeves",price:1999,shape:"patch",wash:"#2d4a78",image:"",alt:"Patchwork denim laptop sleeve",featured:false,availabilityStatus:"Concept. Availability to be confirmed.",description:"A laptop sleeve with patchwork panels in mixed denim washes.",options:["Patch mix (illustrative)","Fits 13-14 inch laptops (placeholder size)"]},
];
const CATEGORIES = [
  {name:"Laptop Sleeves",shape:"sleeve",text:"Protection with character"},
  {name:"Bags & Totes",shape:"tote",text:"Carry the day"},
  {name:"Wallets & Cardholders",shape:"card",text:"Small and sharp"},
  {name:"Pouches & Organisers",shape:"pouch",text:"Everything in its place"},
];
/* ===== END CONFIGURATION ===== */

const $ = s => document.querySelector(s);
const inr = n => "\u20B9" + n.toLocaleString("en-IN");
const waOK = /^\d{8,15}$/.test(CONFIG.WHATSAPP_NUMBER);
const waURL = msg => "https://wa.me/" + CONFIG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function art(shape){ // simple SVG product silhouettes on denim texture
  const f='fill="rgba(10,20,40,.28)" stroke="#C48A3F" stroke-width="2" stroke-dasharray="6 4"';
  const S={
    sleeve:`<rect x="45" y="45" width="110" height="110" rx="10" ${f}/><path d="M45 70h110" stroke="#F7F5F0" stroke-width="2" opacity=".6"/>`,
    tote:`<path d="M70 85c0-40 60-40 60 0" fill="none" stroke="#C48A3F" stroke-width="5"/><path d="M45 85h110l-8 85H53z" ${f}/>`,
    pouch:`<rect x="40" y="75" width="120" height="70" rx="12" ${f}/><path d="M48 92h104" stroke="#F7F5F0" stroke-width="3" stroke-dasharray="2 3" opacity=".7"/>`,
    card:`<rect x="55" y="70" width="90" height="62" rx="8" ${f}/><path d="M55 92h90" stroke="#F7F5F0" stroke-width="2" opacity=".5"/>`,
    carry:`<rect x="38" y="62" width="124" height="88" rx="12" ${f}/><path d="M38 90c40 14 84 14 124 0" fill="none" stroke="#F7F5F0" stroke-width="2" opacity=".6"/><rect x="82" y="112" width="36" height="26" rx="4" fill="none" stroke="#C48A3F" stroke-width="2"/>`,
    patch:`<rect x="45" y="45" width="110" height="110" rx="10" ${f}/><rect x="55" y="55" width="42" height="42" fill="rgba(111,143,175,.6)"/><rect x="103" y="103" width="42" height="42" fill="rgba(233,226,215,.5)"/><rect x="103" y="55" width="42" height="42" fill="rgba(36,59,99,.6)"/>`
  };
  return `<svg viewBox="0 0 200 200" aria-hidden="true">${S[shape]||S.sleeve}</svg>`;
}
window.__art = art;
function visual(p){
  const wash=`style="--w:${p.wash||"#243B63"}"`;
  if(!p.image) return `<div class="ph" ${wash} role="img" aria-label="${esc(p.alt)} (placeholder illustration)">${art(p.shape)}<span class="tag">Placeholder image</span></div>`;
  return `<div class="ph" ${wash}><img src="${esc(p.image)}" alt="${esc(p.alt)}" loading="lazy" width="800" height="1000" onerror="this.outerHTML=window.__art('${p.shape}')"></div>`;
}

document.querySelectorAll("[data-brand]").forEach(e=>e.textContent=CONFIG.BRAND_NAME);
document.title = CONFIG.BRAND_NAME + " \u2014 Denim accessories";
if(CONFIG.ANNOUNCEMENT){$("#announceText").textContent=CONFIG.ANNOUNCEMENT;$("#announce").hidden=false}
$("#year").textContent = new Date().getFullYear();
$("#heroArt").innerHTML = art("sleeve");

function setLink(el,ok,href,missing){
  if(ok){el.href=href;if(href.startsWith("http"))el.target="_blank";el.rel="noopener";el.removeAttribute("aria-disabled");el.removeAttribute("title")}
  else{el.removeAttribute("href");el.setAttribute("aria-disabled","true");el.title=missing}
}
document.querySelectorAll("[data-wa]").forEach(a=>setLink(a,waOK,waURL(`Hi! I'm interested in ${a.dataset.wa==="custom"?"customisation options":"your products"} from ${CONFIG.BRAND_NAME}. Could you share the details?`),"WhatsApp number not set"));
setLink($("#igLink"),/^https?:\/\//.test(CONFIG.INSTAGRAM_URL),CONFIG.INSTAGRAM_URL,"Instagram URL not set");
setLink($("#mailLink"),!!CONFIG.EMAIL,"mailto:"+CONFIG.EMAIL,"Email not set");
const miss=[!waOK&&"WhatsApp number",!CONFIG.INSTAGRAM_URL&&"Instagram URL",!CONFIG.EMAIL&&"email"].filter(Boolean);
if(miss.length)$("#cfgNote").textContent="Setup reminder: add your "+miss.join(", ")+" in js/script.js.";

let active="All";
const filters=$("#filters");
["All",...CATEGORIES.map(c=>c.name)].forEach(n=>{
  const b=document.createElement("button");b.className="chip";b.textContent=n;b.setAttribute("aria-pressed",n==="All");
  b.onclick=()=>setFilter(n);filters.appendChild(b);
});
$("#cats").innerHTML=CATEGORIES.map(c=>`<button class="cat" data-c="${esc(c.name)}"><div class="ph" style="--w:#2d4a78">${art(c.shape)}</div><span><b>${esc(c.name)}</b><small>${esc(c.text)}</small></span></button>`).join("");
document.querySelectorAll(".cat").forEach(b=>b.onclick=()=>{setFilter(b.dataset.c);$("#shop").scrollIntoView({behavior:"smooth"})});
function setFilter(n){active=n;filters.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c.textContent===n));render()}

const enq=p=>`Hi! I'm interested in the ${p.name} from ${CONFIG.BRAND_NAME}. Could you share the details and availability?`;
function render(){
  const list=PRODUCTS.filter(p=>active==="All"||p.category===active);
  $("#grid").innerHTML=list.map(p=>`<article class="card"><div style="position:relative" data-open="${p.id}">${p.featured?'<span class="badge">Featured</span>':""}${visual(p)}</div>
  <h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><p class="price">${inr(p.price)} <span class="note">(provisional)</span></p>
  <div class="row"><button class="btn btn-line" data-open="${p.id}">View Details</button>${waOK?`<a class="btn btn-solid" target="_blank" rel="noopener" href="${waURL(enq(p))}">Enquire on WhatsApp</a>`:""}</div></article>`).join("");
  document.querySelectorAll("[data-open]").forEach(e=>e.onclick=()=>openDlg(e.dataset.open));
}

const dlg=$("#dlg");
function openDlg(id){
  const p=PRODUCTS.find(x=>x.id===id);if(!p)return;
  $("#dImg").innerHTML=visual(p);
  $("#dName").textContent=p.name;$("#dPrice").textContent=inr(p.price)+" (provisional)";$("#dDesc").textContent=p.description;
  $("#dOpts").innerHTML=p.options.map(o=>`<li>${esc(o)}</li>`).join("");$("#dStatus").textContent=p.availabilityStatus+" This is an enquiry, not an order.";
  setLink($("#dWa"),waOK,waURL(enq(p)),"WhatsApp number not set");
  dlg.showModal();
}
$("#dClose").onclick=()=>dlg.close();
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
render();

const nav=$("#nav"),mb=$("#menuBtn");
mb.onclick=()=>{const o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
nav.querySelectorAll("a").forEach(a=>a.onclick=()=>{nav.classList.remove("open");mb.setAttribute("aria-expanded","false")});
