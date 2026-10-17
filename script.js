/* ===== CONFIGURATION: edit this block ===== */
const CONFIG = {
  BRAND_NAME: "Kintsugi",
  WHATSAPP_NUMBER: "919667461993",   // international format, digits only, e.g. "919876543210"
  INSTAGRAM_URL: "https://www.instagram.com/kintsugiofficial___/",
  EMAIL: "",             // e.g. "hello@example.com"
  ANNOUNCEMENT: "Introducing our first collection.", // set "" to hide the bar
  HERO_PRODUCT: "carry-all", // id of the product whose photo shows in the hero; "" for the illustration
};
/* Prices are PROVISIONAL placeholders (INR). Set `image` to a photo file next to index.html to replace the placeholder art. */
const PRODUCTS = [
  {id:"daily-sleeve",name:"The Daily Sleeve",category:"Laptop Sleeves",price:1299,shape:"sleeve",wash:"#1D3B59",image:"laptop-sleeve.jpg",focus:"50% 50%",alt:"Light denim sleeve with a wooden button and elastic loop closure (sample photo)",featured:true,availabilityStatus:"Concept. Availability to be confirmed.",description:"A padded light-wash denim sleeve with a contrast-stitched centre seam and a wooden button and loop closure.",options:["Wash (illustrative)","Closure style (illustrative)","Size: to be confirmed (placeholder)"]},
  {id:"everyday-tote",name:"The Everyday Tote",category:"Bags & Totes",price:1799,shape:"tote",wash:"#365C7C",image:"everyday-tote.jpg",focus:"50% 45%",alt:"Denim tote bag with patterned fabric handles and lining (sample photo)",featured:true,availabilityStatus:"Concept. Availability to be confirmed.",description:"A roomy denim tote with front pockets, a printed patchwork lining and matching fabric handles.",options:["Lining and handle print (illustrative)","Pockets (illustrative)","Dimensions: placeholder"]},
  {id:"utility-pouch",name:"The Utility Pouch",category:"Pouches & Organisers",price:699,shape:"pouch",wash:"#58728B",image:"utility-pouch.jpg",focus:"50% 55%",alt:"Stack of denim zip pouches with coloured zips (sample photo)",featured:false,availabilityStatus:"Sample. Availability to be confirmed.",description:"Flat zip pouches in mixed denim washes with bright contrast zips, for cables, pens and small essentials.",options:["Wash (illustrative)","Zip colour (illustrative)","Zip charm (illustrative)"]},
  {id:"cardholder",name:"The Cardholder",category:"Wallets & Cardholders",price:599,shape:"card",wash:"#162E47",image:"",alt:"Minimalist denim cardholder",featured:false,availabilityStatus:"Concept. Availability to be confirmed.",description:"A minimalist denim cardholder for cards and a few notes.",options:["Monogram (illustrative)","Thread colour (illustrative)"]},
  {id:"carry-all",name:"The Carry-All",category:"Pouches & Organisers",price:899,shape:"carry",wash:"#315877",image:"carry-all.jpg",focus:"50% 55%",alt:"Denim zip pouch with a pocket detail and floral lining (sample photo)",featured:true,availabilityStatus:"Concept. Availability to be confirmed.",description:"A zip pouch with a jeans-style pocket, red contrast stitching and a floral lining.",options:["Lining print (illustrative)","Stitching colour (illustrative)","Size: to be confirmed (placeholder)"]},
  {id:"patchwork-sleeve",name:"The Patchwork Sleeve",category:"Laptop Sleeves",price:1499,shape:"patch",wash:"#1D3B59",image:"patchwork-sleeve.jpg",focus:"50% 35%",alt:"Denim sleeve with a star-print fabric band and lace trim (sample photo)",featured:false,availabilityStatus:"Concept. Availability to be confirmed.",description:"A light denim sleeve with a star-print fabric band, lace trim and a wooden button and cord closure.",options:["Band fabric and trim (illustrative)","Closure style (illustrative)","Size: to be confirmed (placeholder)"]},
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
  const f='fill="rgba(29,59,89,.28)" stroke="#7A202C" stroke-width="2" stroke-dasharray="6 4"';
  const S={
    sleeve:`<rect x="45" y="45" width="110" height="110" rx="10" ${f}/><path d="M45 70h110" stroke="#F4EDE2" stroke-width="2" opacity=".6"/>`,
    tote:`<path d="M70 85c0-40 60-40 60 0" fill="none" stroke="#7A202C" stroke-width="5"/><path d="M45 85h110l-8 85H53z" ${f}/>`,
    pouch:`<rect x="40" y="75" width="120" height="70" rx="12" ${f}/><path d="M48 92h104" stroke="#F4EDE2" stroke-width="3" stroke-dasharray="2 3" opacity=".7"/>`,
    card:`<rect x="55" y="70" width="90" height="62" rx="8" ${f}/><path d="M55 92h90" stroke="#F4EDE2" stroke-width="2" opacity=".5"/>`,
    carry:`<rect x="38" y="62" width="124" height="88" rx="12" ${f}/><path d="M38 90c40 14 84 14 124 0" fill="none" stroke="#F4EDE2" stroke-width="2" opacity=".6"/><rect x="82" y="112" width="36" height="26" rx="4" fill="none" stroke="#7A202C" stroke-width="2"/>`,
    patch:`<rect x="45" y="45" width="110" height="110" rx="10" ${f}/><rect x="55" y="55" width="42" height="42" fill="rgba(88,114,139,.6)"/><rect x="103" y="103" width="42" height="42" fill="rgba(244,237,226,.5)"/><rect x="103" y="55" width="42" height="42" fill="rgba(29,59,89,.6)"/>`
  };
  return `<svg viewBox="0 0 200 200" aria-hidden="true">${S[shape]||S.sleeve}</svg>`;
}
window.__art = art;
function visual(p){
  const wash=`style="--w:${p.wash||"#1D3B59"}"`;
  if(!p.image) return `<div class="ph" ${wash} role="img" aria-label="${esc(p.alt)} (placeholder illustration)">${art(p.shape)}</div>`;
  return `<div class="ph" ${wash}><img src="${esc(p.image)}" alt="${esc(p.alt)}" loading="lazy" decoding="async" width="800" height="1000" style="object-position:${esc(p.focus||"center")}" onerror="this.outerHTML=window.__art('${p.shape}')"></div>`;
}

document.querySelectorAll("[data-brand]").forEach(e=>e.textContent=CONFIG.BRAND_NAME);
document.title = CONFIG.BRAND_NAME + " \u2014 Denim accessories";
if(CONFIG.ANNOUNCEMENT){$("#announceText").textContent=CONFIG.ANNOUNCEMENT;$("#announce").hidden=false}
$("#year").textContent = new Date().getFullYear();
function setHero(){
const hp=PRODUCTS.find(p=>p.id===CONFIG.HERO_PRODUCT);
if(hp&&hp.image){const e=$("#heroArt");e.classList.remove("stitched");e.style.padding="0";e.style.overflow="hidden";e.innerHTML=`<img src="${esc(hp.image)}" alt="${esc(hp.alt)}" width="800" height="880" fetchpriority="high" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:${esc(hp.focus||"center")};border-radius:var(--r)" onerror="this.remove()">`;e.setAttribute("aria-label",hp.alt)}
else $("#heroArt").innerHTML = art("sleeve");
}
setHero();

function setLink(el,ok,href,missing){
  if(ok){el.href=href;if(href.startsWith("http"))el.target="_blank";el.rel="noopener";el.removeAttribute("aria-disabled");el.removeAttribute("title")}
  else{el.removeAttribute("href");el.setAttribute("aria-disabled","true");el.title=missing}
}
document.querySelectorAll("[data-wa]").forEach(a=>setLink(a,waOK,waURL(`Hi! I'm interested in ${a.dataset.wa==="custom"?"customisation options":"your products"} from ${CONFIG.BRAND_NAME}. Could you share the details?`),"WhatsApp number not set"));
setLink($("#igLink"),/^https?:\/\//.test(CONFIG.INSTAGRAM_URL),CONFIG.INSTAGRAM_URL,"Instagram URL not set");
setLink($("#mailLink"),!!CONFIG.EMAIL,"mailto:"+CONFIG.EMAIL,"Email not set");

let active="All";
const filters=$("#filters");
["All",...CATEGORIES.map(c=>c.name)].forEach(n=>{
  const b=document.createElement("button");b.className="chip";b.textContent=n;b.setAttribute("aria-pressed",n==="All");
  b.onclick=()=>setFilter(n);filters.appendChild(b);
});
$("#cats").innerHTML=CATEGORIES.map(c=>`<button class="cat" data-c="${esc(c.name)}"><div class="ph" style="--w:#1D3B59">${art(c.shape)}</div><span><b>${esc(c.name)}</b><small>${esc(c.text)}</small></span></button>`).join("");
document.querySelectorAll(".cat").forEach(b=>b.onclick=()=>{setFilter(b.dataset.c);$("#shop").scrollIntoView({behavior:"smooth"})});
function setFilter(n){active=n;filters.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c.textContent===n));render()}

const enq=p=>`Hi! I'm interested in the ${p.name} from ${CONFIG.BRAND_NAME}. Could you share the details and availability?`;
function render(){
  const list=PRODUCTS.filter(p=>active==="All"||p.category===active);
  $("#grid").innerHTML=list.map(p=>`<article class="card"><div style="position:relative" data-open="${p.id}">${p.featured?'<span class="badge">Featured</span>':""}${visual(p)}</div>
  <h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><p class="price">${inr(p.price)} <span class="note">(provisional)</span></p>
  <div class="row"><button class="btn btn-line" data-open="${p.id}">View Details</button><button class="btn btn-solid" type="button" data-add="${p.id}"${p.unavailable?" disabled":""}>${p.unavailable?"Unavailable":needsOpts(p)?"Choose options":"Add to Bag"}</button></div>${waOK?`<a class="link small" target="_blank" rel="noopener" href="${waURL(enq(p))}">Enquire on WhatsApp</a>`:""}</article>`).join("");
  document.querySelectorAll("[data-open]").forEach(e=>e.onclick=()=>openDlg(e.dataset.open));
}

const dlg=$("#dlg");
function openDlg(id){
  const p=PRODUCTS.find(x=>x.id===id);if(!p)return;
  $("#dImg").innerHTML=visual(p);
  $("#dName").textContent=p.name;$("#dPrice").textContent=inr(p.price)+" (provisional)";$("#dDesc").textContent=p.description;
  $("#dOpts").innerHTML=p.options.map(o=>`<li>${esc(o)}</li>`).join("");$("#dStatus").textContent=p.availabilityStatus+" This is an enquiry, not an order.";
  setLink($("#dWa"),waOK,waURL(enq(p)),"WhatsApp number not set");
  curP=p;buildSel(p);lockScroll();dlg.showModal();
}
$("#dClose").onclick=()=>dlg.close();
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
render();

const nav=$("#nav"),mb=$("#menuBtn");
mb.onclick=()=>{const o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
nav.querySelectorAll("a").forEach(a=>a.onclick=()=>{nav.classList.remove("open");mb.setAttribute("aria-expanded","false")});

// Sliding nav indicator (scroll-spy)
(function(){
  const pill=document.querySelector(".pill"),links=[...nav.querySelectorAll("a")];
  const secs=links.map(a=>document.querySelector(a.getAttribute("href")));
  function place(a){
    links.forEach(l=>l.classList.toggle("active",l===a));
    if(!a){pill.style.opacity=0;return}
    pill.style.width=a.offsetWidth+"px";pill.style.transform="translateX("+a.offsetLeft+"px)";pill.style.opacity=1;
  }
  function spy(){
    let cur=null;const y=innerHeight*0.35;
    secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<=y)cur=links[i]});
    if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)cur=links[links.length-1];
    place(cur);
  }
  let t;addEventListener("scroll",()=>{cancelAnimationFrame(t);t=requestAnimationFrame(spy)},{passive:true});
  addEventListener("resize",spy);addEventListener("load",spy);
  if(document.fonts)document.fonts.ready.then(spy);
  spy();
})();

// Lets the single-file build add photos after the page has rendered.
window.applyImages=function(map){PRODUCTS.forEach(p=>{if(map[p.id])p.image=map[p.id]});render();setHero()};

// ===== Shopping bag (client-side, saved in localStorage) =====
// Optional product fields: sizes:["S","M"], colours:["Indigo"], unavailable:true. Prices must be numbers.
const CART_KEY="kintsugi.cart.v1",MAXQ=99,cartDlg=$("#cart");
let cart=[],canStore=true,curP=null;
const prod=id=>PRODUCTS.find(p=>p.id===id),fmt=n=>n.toLocaleString("en-IN");
function needsOpts(p){return !!((p.sizes&&p.sizes.length)||(p.colours&&p.colours.length))}
const keyOf=l=>[l.pid,l.size,l.colour].join("|"),lineTotal=l=>prod(l.pid).price*l.qty;
const count=()=>cart.reduce((n,l)=>n+l.qty,0),subtotal=()=>cart.reduce((s,l)=>s+lineTotal(l),0);
const waNow=()=>/^\d{8,15}$/.test(CONFIG.WHATSAPP_NUMBER);
function el(t,c,x){const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function clean(raw){const out=[];if(!Array.isArray(raw))return out;
  raw.forEach(l=>{if(!l||typeof l!=="object")return;const p=prod(l.pid);if(!p||p.unavailable)return;
    const q=Number(l.qty);if(!Number.isInteger(q)||q<1)return;
    const size=String(l.size||""),colour=String(l.colour||"");
    if((p.sizes||[]).length?!p.sizes.includes(size):size)return;
    if((p.colours||[]).length?!p.colours.includes(colour):colour)return;
    const ex=out.find(o=>keyOf(o)===keyOf({pid:p.id,size,colour}));
    if(ex)ex.qty=Math.min(MAXQ,ex.qty+q);else out.push({pid:p.id,size,colour,qty:Math.min(MAXQ,q)})});
  return out}
function load(){let raw=null;try{raw=localStorage.getItem(CART_KEY)}catch(e){canStore=false}
  try{cart=clean(JSON.parse(raw||"[]"))}catch(e){cart=[]}}
function save(){if(!canStore)return;try{localStorage.setItem(CART_KEY,JSON.stringify(cart))}catch(e){canStore=false}}
function changed(){
  save();
  renderBag();

  // Keep the order message synced with the latest cart.
  if(!$("#cartFb").hidden){
    const msg=buildMsg();
    $("#cartFbText").value=msg;

    const link=$("#cartFbLink");
    if(!link.hidden){
      link.href=waURL(msg);
    }
  }
}
function add(pid,size,colour,qty){
  const p=prod(pid);size=size||"";colour=colour||"";qty=Number(qty||1);
  if(!p||p.unavailable||!Number.isInteger(qty)||qty<1)return false;
  if((p.sizes||[]).length?!p.sizes.includes(size):(size=""))return false;
  if((p.colours||[]).length?!p.colours.includes(colour):(colour=""))return false;
  const ex=cart.find(l=>keyOf(l)===keyOf({pid,size,colour}));
  if(ex)ex.qty=Math.min(MAXQ,ex.qty+qty);else cart.push({pid,size,colour,qty:Math.min(MAXQ,qty)});
  changed();toast(p.name+" added to bag");return true}
function setQty(k,q){const l=cart.find(x=>keyOf(x)===k);if(!l||!Number.isInteger(q)||q<1||q>MAXQ)return;l.qty=q;changed()}
function removeLine(k){cart=cart.filter(l=>keyOf(l)!==k);changed()}
let tt;function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),2200)}
function lockScroll(){document.body.style.overflow="hidden"}
[dlg,cartDlg].forEach(d=>d.addEventListener("close",()=>{if(!dlg.open&&!cartDlg.open)document.body.style.overflow=""}));
function openCart(){renderBag();lockScroll();cartDlg.showModal()}
function renderBag(){
  const n=count(),b=$("#bagBtn");$("#bagCount").textContent=n;b.dataset.n=n;b.setAttribute("aria-label","Open bag, "+n+" item"+(n===1?"":"s"));
  const body=$("#cartBody");body.textContent="";$("#cartFoot").hidden=!n;$("#cartStore").hidden=canStore;
  if(!n){body.append(el("p","","Your bag is empty."));const c=el("button","btn btn-solid","Continue shopping");c.type="button";
    c.onclick=()=>{cartDlg.close();$("#shop").scrollIntoView({behavior:"smooth"})};body.append(c);return}
  const ul=el("ul","ci-list");
  cart.forEach(l=>{const p=prod(l.pid),k=keyOf(l),li=el("li","ci"),th=el("div","ci-img"),bd=el("div","ci-body"),sd=el("div","ci-side");
    th.innerHTML=visual(p); // catalogue data, escaped inside visual()
    bd.append(el("strong","",p.name));
    const meta=[l.size&&"Size: "+l.size,l.colour&&"Colour: "+l.colour].filter(Boolean).join(" \u00B7 ");
    if(meta)bd.append(el("span","note",meta));
    bd.append(el("span","note",inr(p.price)+" each"));
    const mk=(t,lab,fn,dis)=>{const x=el("button","",t);x.type="button";x.setAttribute("aria-label",lab);x.disabled=!!dis;x.onclick=fn;return x};
    const q=el("div","qty");q.append(mk("\u2212","Decrease quantity of "+p.name,()=>setQty(k,l.qty-1),l.qty<=1),el("output","",l.qty),mk("+","Increase quantity of "+p.name,()=>setQty(k,l.qty+1),l.qty>=MAXQ));
    bd.append(q);
    const rm=el("button","link small","Remove");rm.type="button";rm.setAttribute("aria-label","Remove "+p.name+" from bag");rm.onclick=()=>removeLine(k);
    sd.append(el("span","",inr(lineTotal(l))),rm);li.append(th,bd,sd);ul.append(li)});
  body.append(ul);$("#cartN").textContent=n;$("#cartSub").textContent=inr(subtotal())}
function buildMsg(){
  const L=["Hello "+CONFIG.BRAND_NAME+"! I'd like to enquire about placing an order.","","*My Order*",""];
  cart.forEach((l,i)=>{const p=prod(l.pid);L.push((i+1)+". Product: "+p.name);
    if(l.size)L.push("   Size: "+l.size);if(l.colour)L.push("   Colour: "+l.colour);
    L.push("   Quantity: "+l.qty,"   Unit Price: \u20B9"+fmt(p.price),"   Item Total: \u20B9"+fmt(lineTotal(l)),"")});
  L.push("Merchandise Subtotal: \u20B9"+fmt(subtotal()),"(Delivery charges, taxes and any discounts are not included and are not yet confirmed.)","","Please confirm availability, delivery charges, and the next steps to place my order.","","Thank you!");
  return L.join("\n")}
function showFb(note,msg,url){$("#cartFbMsg").textContent=note;$("#cartFbText").value=msg;$("#cartCopy").textContent="Copy message";
  const a=$("#cartFbLink");a.hidden=!url;if(url)a.href=url;$("#cartFb").hidden=false}
let busy=false;
$("#checkout").onclick=()=>{
  if(!cart.length||busy)return;
  busy=true;
  setTimeout(()=>busy=false,800);

  // Build the message from the latest cart contents.
  const msg=buildMsg();

  if(!waNow()){
    showFb(
      "The WhatsApp number isn't set up yet. Copy this message and send it to us on WhatsApp.",
      msg
    );
    return;
  }

  const url=waURL(msg);
  const w=window.open(url,"_blank");

  if(w){
    try{w.opener=null}catch(e){}
    $("#cartFb").hidden=true;
    toast("WhatsApp opened. Review and send your message. Your bag is kept.");
  }else{
    showFb(
      "Your browser blocked WhatsApp from opening. Use the button below, or copy the message.",
      buildMsg(),
      waURL(buildMsg())
    );
  }
};
$("#cartCopy").onclick=async()=>{const t=$("#cartFbText");try{await navigator.clipboard.writeText(t.value)}catch(e){t.select();document.execCommand("copy")}$("#cartCopy").textContent="Copied"};
$("#cartClear").onclick=()=>{cart=[];changed()};
$("#bagBtn").onclick=openCart;$("#cartClose").onclick=()=>cartDlg.close();
cartDlg.addEventListener("click",e=>{if(e.target===cartDlg)cartDlg.close()});
$("#grid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;const p=prod(b.dataset.add);if(!p)return;
  if(needsOpts(p)){openDlg(p.id);return}
  if(add(p.id)){b.textContent="Added \u2713";setTimeout(()=>{b.textContent="Add to Bag"},1200)}});
function buildSel(p){
  const s=$("#dSel");s.textContent="";
  const field=(id,label,arr)=>{const w=el("label","sel-f"),x=document.createElement("select"),o=el("option","","Select "+label.toLowerCase());o.value="";x.id=id;x.append(o);
    arr.forEach(v=>{const o2=el("option","",v);o2.value=v;x.append(o2)});w.append(el("span","",label),x);return w};
  if((p.sizes||[]).length)s.append(field("dSize","Size",p.sizes));
  if((p.colours||[]).length)s.append(field("dColour","Colour",p.colours));
  const out=el("output","",1);out.id="dQty";const mk=(t,lab,d)=>{const x=el("button","",t);x.type="button";x.setAttribute("aria-label",lab);x.onclick=()=>{out.textContent=Math.min(MAXQ,Math.max(1,Number(out.textContent)+d))};return x};
  const q=el("div","qty");q.append(mk("\u2212","Decrease quantity",-1),out,mk("+","Increase quantity",1));
  const w=el("div","sel-f");w.append(el("span","","Quantity"),q);s.append(w);
  const er=el("p","err","");er.id="dErr";er.setAttribute("role","alert");s.append(er);
  $("#dAdd").disabled=!!p.unavailable;$("#dAdd").textContent=p.unavailable?"Unavailable":"Add to Bag"}
$("#dAdd").onclick=()=>{const p=curP;if(!p)return;const sz=$("#dSize"),co=$("#dColour"),er=$("#dErr");
  if(sz&&!sz.value){er.textContent="Please select a size.";sz.focus();return}
  if(co&&!co.value){er.textContent="Please select a colour.";co.focus();return}
  if(add(p.id,sz?sz.value:"",co?co.value:"",Number($("#dQty").textContent))){dlg.close();openCart()}else er.textContent="Sorry, that couldn't be added."};
load();save();renderBag();
