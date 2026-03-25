/* ═══════════════════════════════════════════════════════════════
   DATA — USERS, MENU, TOPPINGS
═══════════════════════════════════════════════════════════════ */
const USERS = [
  {id:'EMP001',user:'admin',   pass:'admin',   name:'สมชาย ใจดี',     pos:'Admin'},
  {id:'EMP002',user:'staff01', pass:'1234',    name:'สุดา มะลิวรรณ',  pos:'Staff'},
  {id:'EMP003',user:'staff02', pass:'1234',    name:'พิมพ์ จันทร์เพ็ง',pos:'Staff'},
  {id:'EMP004',user:'barista01',pass:'1234',   name:'ธนกร สุขสม',     pos:'Barista'},
  {id:'EMP005',user:'manager01',pass:'1234',   name:'วรรณิษา เจริญผล',pos:'Manager'},
];

const NO_TOPPING_CATS = ['water','bake']; // 'hot' ถูกย้ายออก → เมนูร้อนเลือกความหวานได้ แต่ไม่มีท็อปปิ้ง

const MENU = [
  {cat:'thai',    label:'ชาไทย',       emoji:'🍵', noTop:false, items:[
    {id:'P-TH01',name:'ชาเย็น',              en:'Thai Milk Tea',        price:25},
    {id:'P-TH02',name:'ชาเขียวนม',           en:'Green Tea Latte',      price:25},
    {id:'P-TH03',name:'ชาดำเย็น',            en:'Thai Tea',             price:25},
    {id:'P-TH04',name:'ชาเขียวมะนาว',        en:'Lemon Green Tea',      price:25},
    {id:'P-TH05',name:'ชามะนาว',             en:'Thai Lemon Tea',       price:25},
    {id:'P-TH06',name:'ชาเขียวสตรอว์เบอร์รี',en:'Strawberry Green Tea', price:25},
    {id:'P-TH07',name:'ชาเขียวใส',           en:'Green Tea',            price:25},
    {id:'P-TH08',name:'ชาเขียวน้ำผึ้งมะนาว', en:'Honey Lemon Green Tea',price:25},
    {id:'P-TH09',name:'ชาเขียวลิ้นจี่',       en:'Lychee Green Tea',     price:25},
    {id:'P-TH10',name:'ชาเขียวแอปเปิ้ล',     en:'Apple Green Tea',      price:25},
    {id:'P-TH11',name:'ชาเขียวเมล่อน',       en:'Melon Green Tea',      price:25},
  ]},
  {cat:'milk',    label:'ชานม',        emoji:'🧋', noTop:false, items:[
    {id:'P-MK01',name:'ชานมเผือก',     en:'Taro Milk Tea',       price:25},
    {id:'P-MK02',name:'ชานมน้ำผึ้ง',   en:'Honey Milk Tea',      price:25},
    {id:'P-MK03',name:'ชานมสตรอว์เบอร์รี',en:'Strawberry Milk Tea',price:25},
    {id:'P-MK04',name:'ชานมเมล่อน',   en:'Melon Milk Tea',       price:25},
    {id:'P-MK05',name:'ชานมกาแฟ',     en:'Coffee Milk Tea',      price:25},
    {id:'P-MK06',name:'ชานมคาราเมล',  en:'Caramel Milk Tea',     price:25},
    {id:'P-MK07',name:'ชาไทยเผือก',   en:'Taro Thai Tea',        price:29},
    {id:'P-MK08',name:'ชานมโกโก้',    en:'Cocoa Milk Tea',       price:25},
    {id:'P-MK09',name:'ชานมลิ้นจี่',  en:'Lychee Milk Tea',      price:25},
    {id:'P-MK10',name:'ชานมแอปเปิ้ล', en:'Apple Milk Tea',       price:25},
    {id:'P-MK11',name:'ชานมวนิลา',    en:'Vanilla Milk Tea',     price:25},
    {id:'P-MK12',name:'ชานมไต้หวัน',  en:'Taiwan Milk Tea',      price:19},
  ]},
  {cat:'fresh',   label:'นมสด',        emoji:'🥛', noTop:false, items:[
    {id:'P-FM01',name:'นมสดสตรอว์เบอร์รีสมูทตี้',en:'Fresh Milk Strawberry Smoothie',price:49},
    {id:'P-FM02',name:'นมสดสตรอว์เบอร์รี',        en:'Fresh Milk Strawberry',          price:39},
    {id:'P-FM03',name:'นมสดไข่มุกบราวน์ชูการ์',   en:'Fresh Milk with Brown Sugar Pearls',price:34},
    {id:'P-FM04',name:'นมสดบราวน์ชูการ์',         en:'Fresh Milk with Brown Sugar Sauce',price:24},
    {id:'P-FM05',name:'โนบิ นมสด',                en:'NOBI Fresh Milk',                price:25},
  ]},
  {cat:'hot',     label:'เมนูร้อน',    emoji:'☕', noTop:true, items:[
    {id:'P-HT01',name:'โกโก้ร้อน',         en:'Hot Cocoa',            price:25},
    {id:'P-HT02',name:'โอวัลตินร้อน',      en:'Hot Ovaltine',         price:25},
    {id:'P-HT03',name:'ชาเขียวนมร้อน',     en:'Hot Green Tea Latte',  price:25},
    {id:'P-HT04',name:'กาแฟร้อน',          en:'Hot Coffee',           price:25},
    {id:'P-HT05',name:'ชาไทยร้อน',         en:'Hot Thai Milk Tea',    price:25},
    {id:'P-HT06',name:'น้ำผึ้งมะนาวร้อน',  en:'Hot Honey Lemon',      price:25},
    {id:'P-HT07',name:'ชานมไต้หวันร้อน',   en:'Hot Taiwan Milk Tea',  price:25},
    {id:'P-HT08',name:'ชานมโกโก้ร้อน',     en:'Hot Cocoa Milk Tea',   price:25},
    {id:'P-HT09',name:'ชานมกาแฟร้อน',      en:'Hot Coffee Milk Tea',  price:25},
  ]},
  {cat:'soda',    label:'โซดา',        emoji:'🥤', noTop:false, items:[
    {id:'P-SD01',name:'โยเกิร์ตโซดา',      en:'Soda Yogurt',         price:25},
    {id:'P-SD02',name:'บลูฮาวายโซดา',      en:'Blue Hawaii Soda',    price:25},
    {id:'P-SD03',name:'สตรอว์เบอร์รีโซดา', en:'Strawberry Soda',     price:25},
    {id:'P-SD04',name:'ลิ้นจี่โซดา',       en:'Lychee Soda',         price:25},
    {id:'P-SD05',name:'แดงโซดา',           en:'Sala Soda',           price:25},
    {id:'P-SD06',name:'มะนาวโซดา',         en:'Lemon Soda',          price:25},
    {id:'P-SD07',name:'แอปเปิ้ลโซดา',      en:'Apple Soda',          price:25},
    {id:'P-SD08',name:'เมล่อนโซดา',        en:'Melon Soda',          price:25},
    {id:'P-SD09',name:'แดงมะนาวโซดา',      en:'Sala Lemon Soda',     price:25},
  ]},
  {cat:'fruit',   label:'ชาผลไม้',     emoji:'🍓', noTop:false, items:[
    {id:'P-FT01',name:'ลำไย บุกบราวน์ชูการ์',en:'Longan with Brown Sugar Konjac',price:35},
    {id:'P-FT02',name:'ชาลำไย',            en:'Longan Tea',           price:29},
    {id:'P-FT03',name:'ลำไย',              en:'Longan',               price:25},
    {id:'P-FT04',name:'ชาแอปเปิ้ล',        en:'Apple Tea',            price:19},
    {id:'P-FT05',name:'ชาลิ้นจี่',         en:'Lychee Tea',           price:19},
    {id:'P-FT06',name:'ชาสตรอว์เบอร์รี',   en:'Strawberry Tea',       price:19},
    {id:'P-FT07',name:'ชาเมล่อน',          en:'Melon Tea',            price:19},
  ]},
  {cat:'frappe',  label:'เมนูปั่น',    emoji:'🧊', noTop:false, items:[
    {id:'P-FR01',name:'มัทฉะแฟรปเป้',            en:'Matcha Frappe',            price:65},
    {id:'P-FR02',name:'นมสดน้ำผึ้งแฟรปเป้',       en:'Honey Fresh Milk Frappe',  price:49},
    {id:'P-FR03',name:'นมสดมะพร้าวแฟรปเป้',       en:'Coconut Fresh Milk Frappe',price:49},
    {id:'P-FR04',name:'นมสดคาราเมลแฟรปเป้',       en:'Caramel Fresh Milk Frappe',price:49},
    {id:'P-FR05',name:'นมสดโกโก้แฟรปเป้',         en:'Cocoa Fresh Milk Frappe',  price:49},
    {id:'P-FR06',name:'นมสดบราวน์ชูการ์แฟรปเป้',  en:'Brown Sugar Fresh Milk Frappe',price:39},
    {id:'P-FR07',name:'นมสดแฟรปเป้',              en:'Fresh Milk Frappe',        price:39},
    {id:'P-FR08',name:'ชานมเผือกแฟรปเป้',         en:'Taro Milk Tea Frappe',     price:34},
    {id:'P-FR09',name:'โอวัลตินแฟรปเป้',          en:'Ovaltine Frappe',          price:34},
    {id:'P-FR10',name:'ชานมโกโก้แฟรปเป้',         en:'Cocoa Milk Tea Frappe',    price:34},
    {id:'P-FR11',name:'ชานมกาแฟแฟรปเป้',          en:'Coffee Milk Tea Frappe',   price:34},
    {id:'P-FR12',name:'นมชมพูแฟรปเป้',            en:'Pink Milk Frappe',         price:34},
    {id:'P-FR13',name:'ชาเขียวนมแฟรปเป้',         en:'Green Tea Latte Frappe',   price:34},
    {id:'P-FR14',name:'โกโก้แฟรปเป้',             en:'Cocoa Frappe',             price:34},
    {id:'P-FR15',name:'ชาไทยแฟรปเป้',             en:'Thai Milk Tea Frappe',     price:34},
    {id:'P-FR16',name:'เนสกาแฟแฟรปเป้',           en:'Coffee Frappe',            price:34},
    {id:'P-FR17',name:'ชานมไต้หวันแฟรปเป้',        en:'Taiwan Milk Tea Frappe',   price:29},
  ]},
  {cat:'passion', label:'เสาวรส',      emoji:'🍈', noTop:false, items:[
    {id:'P-PS01',name:'เสาวรสสมูทตี้',  en:'Passion Fruit Smoothie',   price:44},
    {id:'P-PS02',name:'น้ำเสาวรส',      en:'Passion Fruit',             price:34},
    {id:'P-PS03',name:'ชาเสาวรส',       en:'Passion Fruit Tea',         price:34},
    {id:'P-PS04',name:'เสาวรสโซดา',     en:'Passion Fruit Soda',        price:34},
    {id:'P-PS05',name:'เสาวรสมรกต',     en:'Passion Fruit Green Tea',   price:34},
  ]},
  {cat:'peach',   label:'พีช',         emoji:'🍑', noTop:false, items:[
    {id:'P-PC01',name:'น้ำพีช',    en:'Peachy Peach',        price:34},
    {id:'P-PC02',name:'ชาพีช',     en:'Peach Tea',           price:34},
    {id:'P-PC03',name:'พีชโซดา',   en:'Peach Soda',          price:34},
    {id:'P-PC04',name:'น้ำพีชปั่น',en:'Juicy Peach Smoothie',price:44},
  ]},
  {cat:'premium', label:'พรีเมียม',    emoji:'⭐', noTop:false, items:[
    {id:'P-PM01',name:'นมสดสตรอว์เบอร์รีโยเกิร์ตสมูทตี้',en:'Fresh Milk Strawberry Yogurt Smoothie',price:59},
    {id:'P-PM02',name:'นมสดโยเกิร์ตสมูทตี้',              en:'Fresh milk yogurt smoothie',           price:49},
    {id:'P-PM03',name:'มัทฉะลาเต้',                       en:'Matcha Latte',                         price:55},
    {id:'P-PM04',name:'เสาวรส โยเกิร์ต สมูทตี้',          en:'Passion Fruit Yogurt Smoothie',        price:54},
    {id:'P-PM05',name:'นมสด โยเกิร์ต',                    en:'Fresh Milk Yogurt',                    price:39},
    {id:'P-PM06',name:'นมสดโกโก้',                        en:'Choco Fresh Milk',                     price:39},
    {id:'P-PM07',name:'นมสดคาราเมล',                      en:'Caramel Fresh Milk',                   price:39},
    {id:'P-PM08',name:'นมสดมะพร้าว',                      en:'Coconut Fresh Milk',                   price:39},
    {id:'P-PM09',name:'นมสดน้ำผึ้ง',                      en:'Honey Fresh Milk',                     price:39},
    {id:'P-PM10',name:'ชาเขียวน้ำผึ้ง',                   en:'Honey Green Tea',                      price:39},
    {id:'P-PM11',name:'น้ำผึ้ง',                          en:'Honey Water',                          price:29},
    {id:'P-PM12',name:'ชาบ๊วย',                           en:'Plum Green Tea',                       price:29},
    {id:'P-PM13',name:'น้ำมะพร้าว',                       en:'Coconut Water',                        price:29},
    {id:'P-PM14',name:'ชาเย็นไข่มุก',                     en:'Thai Milk Tea with Pearls',            price:29},
    {id:'P-PM15',name:'กาแฟลาเต้',                        en:'Coffee Latte',                         price:25},
    {id:'P-PM16',name:'มอคค่า',                           en:'Mocha',                                price:25},
    {id:'P-PM17',name:'ชานมไต้หวันไข่มุก',                en:'Taiwan Milk Tea with Pearls',          price:24},
  ]},
  {cat:'other',   label:'เมนูอื่นๆ',   emoji:'🫖', noTop:false, items:[
    {id:'P-OT01',name:'นมชมพู',        en:'Pink Milk',          price:25},
    {id:'P-OT02',name:'น้ำผึ้งมะนาว',  en:'Honey Lemon',        price:25},
    {id:'P-OT03',name:'ชาเขียวมะลิ',  en:'Jasmine Green Tea',  price:29},
    {id:'P-OT04',name:'กาแฟ',          en:'Coffee',             price:25},
    {id:'P-OT05',name:'โกโก้',         en:'Cocoa',              price:25},
    {id:'P-OT06',name:'โอวัลติน',      en:'Ovaltine',           price:25},
  ]},
  {cat:'water',   label:'น้ำดื่ม',     emoji:'💧', noTop:true, items:[
    {id:'P-WA01',name:'น้ำดื่มโนบิชา 600 มล. แพ็ค 12', en:'Nobi Cha Drinking Water 600ml Pack 12',price:55},
    {id:'P-WA02',name:'น้ำดื่มโนบิชา 350 มล. แพ็ค 12', en:'Nobi Cha Drinking Water 350ml Pack 12',price:45},
    {id:'P-WA03',name:'น้ำดื่มโนบิชา 600 มล.',          en:'Nobi Cha Drinking Water 600ml',        price:8},
    {id:'P-WA04',name:'น้ำดื่มโนบิชา 350 มล.',          en:'Nobi Cha Drinking Water 350ml',        price:6},
  ]},
  {cat:'bake',    label:'โนบิเบค',     emoji:'🍪', noTop:true, items:[
    {id:'P-BK01',name:'คุกกี้ผสมคอร์นเฟล็ก',      en:'Cornflakes Cookies',    price:55},
    {id:'P-BK02',name:'คุกกี้ข้าวโอ๊ตผสมลูกเกด',   en:'Oatmeal and Raisins Cookies',price:45},
    {id:'P-BK03',name:'คุกกี้ดับเบิ้ลช็อคโกแลต',  en:'Double Chocolate Cookies',price:45},
    {id:'P-BK04',name:'นัทเมอแรงค์',               en:'Nut Meringues',         price:45},
    {id:'P-BK05',name:'ขนมปังกรอบกระเทียม',        en:'Crispy Garlic Breads',  price:45},
    {id:'P-BK06',name:'ขนมปังกรอบเนยสด',           en:'Crispy Butter Breads',  price:45},
  ]},
];

const TOPPINGS = [
  {id:'T01',name:'โนบิ ครีมชีส',        en:'Nobi Cream Cheese',     price:15},
  {id:'T02',name:'ทาโร่ คริสตัล',       en:'Taro Crystal Pearl',    price:15},
  {id:'T03',name:'ว่านหางจระเข้',        en:'Aloevera',              price:15},
  {id:'T04',name:'สโนว์มุก',            en:'Snow Pearls',           price:15},
  {id:'T05',name:'ไข่มุกบราวน์ชูการ์',  en:'Brown Sugar Pearls',    price:10},
  {id:'T06',name:'บุกบราวน์ชูการ์',     en:'Brown Sugar Konjac',    price:10},
  {id:'T07',name:'ไข่มุกโนบิ',          en:'NOBI Pearl',            price:5},
  {id:'T08',name:'เยลลีผลไม้',          en:'Fruity Jelly',          price:5},
];

/* ═══════════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════════ */
let currentUser = null;
let currentCat  = 'thai';
let cart        = [];
let orderSeed   = 1;
let pendingItem = null;
let selectedSweet = '100%';
let selectedToppings = [];
let currentPayType = 'cash';
let selectedCardBrand = 'VISA';
let allOrders   = [];
let dashDays    = 1;
let charts      = {};
let currentCustomerId = null;   // ID ของลูกค้าที่เลือกในออเดอร์ปัจจุบัน

const CUSTOMERS = [
  {id:'C001', name:'มินตรา',  surname:'แสงทอง',   phone:'0811111111', points:120},
  {id:'C002', name:'ภัทร',    surname:'ศรีสุข',    phone:'0822222222', points:85},
  {id:'C003', name:'อารีย์',  surname:'มงคลชัย',  phone:'0833333333', points:60},
  {id:'C004', name:'นที',     surname:'เพชรรัตน์', phone:'0844444444', points:200},
  {id:'C005', name:'จิตรา',   surname:'สายชล',    phone:'0855555555', points:10},
];

/* ═══════════════════════════════════════════════════════════════
   AUTH
═══════════════════════════════════════════════════════════════ */
function doLogin(){
  const u=document.getElementById('login-user').value.trim();
  const p=document.getElementById('login-pass').value.trim();
  const found=USERS.find(x=>x.user===u&&x.pass===p);
  if(!found){
    document.getElementById('login-error').style.display='block';
    return;
  }
  currentUser=found;
  document.getElementById('page-login').classList.remove('active');
  document.getElementById('page-main').classList.add('active');
  document.getElementById('emp-name-badge').textContent=`👤 ${found.name} (${found.pos})`;
  initPOS();
  generateDemoOrders();
  renderDashboard();
}
document.getElementById('login-pass').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin()});

function doLogout(){
  currentUser=null;
  cart=[];
  document.getElementById('page-main').classList.remove('active');
  document.getElementById('page-login').classList.add('active');
  document.getElementById('login-error').style.display='none';
}

/* ═══════════════════════════════════════════════════════════════
   VIEW SWITCHER
═══════════════════════════════════════════════════════════════ */
function switchView(v){
  document.getElementById('nav-pos').classList.toggle('active',v==='pos');
  document.getElementById('nav-dash').classList.toggle('active',v==='dashboard');
  const pos=document.getElementById('view-pos');
  const dash=document.getElementById('view-dashboard');
  if(v==='pos'){pos.style.display='flex';dash.style.display='none';}
  else{pos.style.display='none';dash.style.display='block';renderDashboard();}
}

/* ═══════════════════════════════════════════════════════════════
   POS — MENU RENDER
═══════════════════════════════════════════════════════════════ */
function initPOS(){
  renderCategories();
  renderMenu(currentCat);
}

function renderCategories(){
  const bar=document.getElementById('cat-bar');
  bar.innerHTML='';
  MENU.forEach(c=>{
    const btn=document.createElement('button');
    btn.className='cat-btn'+(c.cat===currentCat?' active':'');
    btn.innerHTML=`${c.emoji} ${c.label}`;
    btn.onclick=()=>{
      currentCat=c.cat;
      document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('search-input').value='';
      renderMenu(c.cat);
    };
    bar.appendChild(btn);
  });
}

function renderMenu(cat){
  const catObj=MENU.find(c=>c.cat===cat);
  const grid=document.getElementById('menu-grid');
  grid.innerHTML='';
  if(!catObj)return;
  catObj.items.forEach(item=>{
    const div=document.createElement('div');
    div.className='menu-item';
    div.innerHTML=`
      ${catObj.noTop?'<span class="no-top-badge">ไม่มีท็อป</span>':''}
      <span class="item-emoji">${catObj.emoji}</span>
      <div class="item-name">${item.name}</div>
      <div class="item-name-en">${item.en}</div>
      <div class="item-price">฿${item.price}</div>
    `;
    div.onclick=()=>addItem(item, catObj.cat, catObj.noTop, catObj.emoji);
    grid.appendChild(div);
  });
}

function filterMenu(){
  const q=document.getElementById('search-input').value.trim().toLowerCase();
  if(!q){renderMenu(currentCat);return;}
  const grid=document.getElementById('menu-grid');
  grid.innerHTML='';
  MENU.forEach(catObj=>{
    catObj.items.forEach(item=>{
      if(item.name.toLowerCase().includes(q)||item.en.toLowerCase().includes(q)){
        const div=document.createElement('div');
        div.className='menu-item';
        div.innerHTML=`
          <span class="item-emoji">${catObj.emoji}</span>
          <div class="item-name">${item.name}</div>
          <div class="item-name-en">${item.en}</div>
          <div class="item-price">฿${item.price}</div>
        `;
        div.onclick=()=>addItem(item, catObj.cat, catObj.noTop, catObj.emoji);
        grid.appendChild(div);
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   POS — ADD ITEM (with or without topping modal)
═══════════════════════════════════════════════════════════════ */
function addItem(item, cat, noTop, emoji){
  if(NO_TOPPING_CATS.includes(cat)){
    // No topping — add directly
    pushToCart({...item, emoji, cat, qty:1, sweetness:null, toppings:[], uid:Date.now()+Math.random()});
  } else {
    openToppingModal(item, emoji, cat);
  }
}

/* ═══════════════════════════════════════════════════════════════
   TOPPING MODAL
═══════════════════════════════════════════════════════════════ */
function openToppingModal(item, emoji, cat){
  pendingItem={...item, emoji, cat};
  selectedSweet='100%';
  selectedToppings=[];
  document.getElementById('tmod-preview').innerHTML=`
    <span class="pv-emoji">${emoji}</span>
    <div><div class="pv-name">${item.name}</div><div class="pv-price">฿${item.price}</div></div>
  `;
  // Reset sweet
  document.querySelectorAll('.sweet-btn').forEach(b=>{
    b.classList.toggle('selected',b.dataset.val==='100%');
  });

  // ── Topping section: ซ่อนสำหรับเมนูร้อน ──
  const topSection  = document.getElementById('topping-grid');
  const topLabel    = document.getElementById('tmd-topping-label');
  const isHot       = (cat === 'hot');
  topSection.style.display  = isHot ? 'none' : 'grid';
  topLabel.style.display    = isHot ? 'none' : 'block';

  if(isHot){
    // แสดง note ว่าเมนูร้อนไม่มีท็อปปิ้ง
    let note = document.getElementById('tmod-hot-note');
    if(!note){ note=document.createElement('p'); note.id='tmod-hot-note'; note.style.cssText='font-size:.8rem;color:var(--gray);margin-top:12px;padding:8px 12px;background:var(--cream2);border-radius:8px;'; document.getElementById('topping-grid').parentNode.appendChild(note); }
    note.style.display='block';
    note.textContent='☕ เมนูร้อนไม่สามารถเพิ่มท็อปปิ้งได้';
  } else {
    const note=document.getElementById('tmod-hot-note');
    if(note) note.style.display='none';
  }

  // Render toppings (เฉพาะที่ไม่ใช่เมนูร้อน)
  const grid=document.getElementById('topping-grid');
  grid.innerHTML='';
  if(!isHot){
    TOPPINGS.forEach(t=>{
      const div=document.createElement('div');
      div.className='top-item';
      div.dataset.id=t.id;
      div.innerHTML=`
        <div class="top-check"></div>
        <div class="top-name">${t.name}</div>
        <div class="top-price">+฿${t.price}</div>
      `;
      div.onclick=()=>{
        div.classList.toggle('selected');
        if(div.classList.contains('selected')) selectedToppings.push(t);
        else selectedToppings=selectedToppings.filter(x=>x.id!==t.id);
      };
      grid.appendChild(div);
    });
  }
  openModal('modal-topping');
}

function selectSweet(btn){
  document.querySelectorAll('.sweet-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedSweet=btn.dataset.val;
}

function confirmAddToOrder(){
  if(!pendingItem)return;
  const toppingTotal=selectedToppings.reduce((s,t)=>s+t.price,0);
  pushToCart({
    ...pendingItem,
    qty:1,
    sweetness: selectedSweet,   // ทุก category (รวม hot) บันทึก sweetness
    toppings:[...selectedToppings],
    uid:Date.now()+Math.random(),
    toppingTotal,
  });
  closeModal('modal-topping');
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOMER LOOKUP
═══════════════════════════════════════════════════════════════ */
function lookupCustomer(){
  const phone = document.getElementById('cust-phone-input').value.trim();
  const resultEl = document.getElementById('cust-result');

  if(!phone){ showToast('กรุณากรอกเบอร์โทรก่อนค้นหา','error'); return; }

  // uncheck walk-in when searching
  document.getElementById('walkin-check').checked = false;

  const found = CUSTOMERS.find(c => c.phone === phone);
  if(found){
    currentCustomerId = found.id;
    resultEl.className = 'cust-result found';
    resultEl.innerHTML = `
      <span class="cr-icon">👤</span>
      <div>
        <div class="cr-name">${found.name} ${found.surname}</div>
        <div class="cr-detail">${found.phone}</div>
      </div>
      <button class="cr-clear" onclick="resetCustomer()" title="ล้างข้อมูลลูกค้า">✕</button>
    `;
    showToast(`✓ พบลูกค้า: ${found.name} ${found.surname}`,'success');
  } else {
    currentCustomerId = null;
    resultEl.className = 'cust-result not-found';
    resultEl.innerHTML = `
      <span class="cr-icon">❌</span>
      <div>
        <div class="cr-name">ไม่พบข้อมูลสมาชิก</div>
        <div class="cr-detail">เบอร์ ${phone} ไม่ได้ลงทะเบียน</div>
      </div>
      <button class="cr-clear" onclick="resetCustomer()">✕</button>
    `;
  }
}

function toggleWalkIn(){
  const cb = document.getElementById('walkin-check');
  const resultEl = document.getElementById('cust-result');
  if(cb.checked){
    // checked → Walk-in mode: clear phone, reset to default checkbox row
    currentCustomerId = null;
    document.getElementById('cust-phone-input').value = '';
    resultEl.className = 'cust-result';
    resultEl.innerHTML = `
      <input type="checkbox" id="walkin-check" checked onclick="toggleWalkIn()">
      <label for="walkin-check" style="font-size:.82rem;color:var(--brown2);font-weight:600;cursor:pointer">ลูกค้าทั่วไป (Walk-in)</label>
    `;
  } else {
    resetCustomer();
  }
}

function resetCustomer(){
  currentCustomerId = null;
  document.getElementById('cust-phone-input').value = '';
  const resultEl = document.getElementById('cust-result');
  resultEl.className = 'cust-result';
  resultEl.innerHTML = `
    <input type="checkbox" id="walkin-check" onclick="toggleWalkIn()">
    <label for="walkin-check" style="font-size:.82rem;color:var(--brown2);font-weight:600;cursor:pointer">ลูกค้าทั่วไป (Walk-in)</label>
  `;
}


function pushToCart(cartItem){
  cart.push(cartItem);
  renderCart();
  showToast(`✓ เพิ่ม "${cartItem.name}" แล้ว`,'success');
}

function renderCart(){
  const el=document.getElementById('order-items');
  if(cart.length===0){
    el.innerHTML=`<div class="order-empty"><div class="empty-icon">🍵</div><div>ยังไม่มีรายการ</div><div style="font-size:.78rem;color:var(--gray)">เลือกเมนูเพื่อเริ่มต้น</div></div>`;
  } else {
    el.innerHTML=cart.map((c,i)=>{
      const topStr=c.toppings&&c.toppings.length?c.toppings.map(t=>t.name).join(', '):'ไม่มีท็อปปิ้ง';
      const sweet=c.sweetness?`ความหวาน ${c.sweetness}`:'';
      const unitPrice=(c.price+(c.toppingTotal||0));
      return `<div class="order-item">
        <div class="oi-info">
          <div class="oi-name">${c.emoji||''} ${c.name}</div>
          <div class="oi-meta">${sweet}${sweet&&topStr?' · ':''}${topStr}</div>
          <div class="oi-qty">
            <button class="qty-btn qty-minus" onclick="changeQty(${i},-1)">−</button>
            <span class="qty-num">${c.qty}</span>
            <button class="qty-btn qty-plus" onclick="changeQty(${i},1)">+</button>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <div class="oi-price">฿${(unitPrice*c.qty).toFixed(0)}</div>
          <button class="oi-del" onclick="removeItem(${i})">✕</button>
        </div>
      </div>`;
    }).join('');
  }
  updateOrderSummary();
}

function changeQty(idx,delta){
  cart[idx].qty=Math.max(1,cart[idx].qty+delta);
  renderCart();
}
function removeItem(idx){
  cart.splice(idx,1);
  renderCart();
}
function clearOrder(){
  if(cart.length===0)return;
  cart=[];
  renderCart();
}

function updateOrderSummary(){
  const count=cart.reduce((s,c)=>s+c.qty,0);
  const subtotal=cart.reduce((s,c)=>s+((c.price+(c.toppingTotal||0))*c.qty),0);
  document.getElementById('oi-count').textContent=count+' รายการ';
  document.getElementById('oi-subtotal').textContent='฿'+subtotal.toFixed(2);
  document.getElementById('oi-total').textContent='฿'+subtotal.toFixed(2);
  document.getElementById('pay-btn').disabled=count===0;
  document.getElementById('order-meta').textContent=count>0?`${count} รายการ · ยอดรวม ฿${subtotal.toFixed(0)}`:'ว่างเปล่า — เลือกเมนูจากด้านซ้าย';
}

/* ═══════════════════════════════════════════════════════════════
   PAYMENT MODAL
═══════════════════════════════════════════════════════════════ */
function openPayment(){
  const total=cart.reduce((s,c)=>s+((c.price+(c.toppingTotal||0))*c.qty),0);
  document.getElementById('pay-total-display').textContent='฿'+total.toFixed(2);
  document.getElementById('pay-items-count').textContent=cart.length+' รายการ · '+cart.reduce((s,c)=>s+c.qty,0)+' แก้ว/ชิ้น';
  // Reset cash
  document.getElementById('cash-received').value='';
  document.getElementById('change-display').style.display='none';
  // QR
  document.getElementById('qr-amount-label').textContent='฿'+total.toFixed(2);
  generateQR(total);
  selectPayTab('cash',document.querySelector('.pay-tab'));
  // Reset card form
  document.getElementById('card-number').value='';
  document.getElementById('card-exp').value='';
  document.getElementById('card-cvv').value='';
  document.getElementById('card-name').value='';
  document.getElementById('card-brand-detected').style.display='none';
  document.getElementById('card-brand-unknown').style.display='none';
  selectedCardBrand='';
  openModal('modal-payment');
}

function selectPayTab(type, btn){
  currentPayType=type;
  document.querySelectorAll('.pay-tab').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('pay-content-cash').style.display=type==='cash'?'block':'none';
  document.getElementById('pay-content-qr').style.display=type==='qr'?'block':'none';
  document.getElementById('pay-content-card').style.display=type==='card'?'block':'none';
}

function setCash(v){
  document.getElementById('cash-received').value=v;
  calcChange();
}
function calcChange(){
  const total=cart.reduce((s,c)=>s+((c.price+(c.toppingTotal||0))*c.qty),0);
  const recv=parseFloat(document.getElementById('cash-received').value)||0;
  const chEl=document.getElementById('change-display');
  if(recv>=total){
    chEl.style.display='block';
    document.getElementById('change-amount').textContent='฿'+(recv-total).toFixed(2);
  } else {
    chEl.style.display=recv>0?'block':'none';
    document.getElementById('change-amount').textContent=recv>0?'เงินไม่พอ':'฿0';
    if(recv>0)chEl.style.background='linear-gradient(135deg,#C0392B,#E74C3C)';
    return;
  }
  chEl.style.background='linear-gradient(135deg,var(--matcha),#5a8a50)';
}

function generateQR(amount){
  const div=document.getElementById('qr-code-div');
  div.innerHTML='';
  try{
    new QRCode(div,{
      text:`PROMPTPAY|0812345678|THB|${amount.toFixed(2)}`,
      width:180,height:180,colorDark:'#3D2B1F',colorLight:'#FFFFFF',
      correctLevel:QRCode.CorrectLevel.M
    });
  }catch(e){div.innerHTML='<div style="width:180px;height:180px;background:#EEE;display:flex;align-items:center;justify-content:center;font-size:.8rem;color:#666">QR Code<br>฿'+amount+'</div>';}
}

function detectCardBrand(num){
  // ตรวจสอบจากหมายเลขบัตรตาม BIN ranges
  const raw=num.replace(/\s/g,'');
  if(!raw) return null;
  const first=raw[0];
  const first2=raw.substring(0,2);
  const first4=raw.substring(0,4);
  const first6=raw.substring(0,6);
  if(first==='4') return {name:'VISA',logo:'💳',color:'#1A1F71',bg:'#E8EEFF',badge:'VISA'};
  if(first2>='51'&&first2<='55') return {name:'Mastercard',logo:'💳',color:'#EB001B',bg:'#FFEAEA',badge:'Mastercard'};
  if(first2==='50'||(first2>='56'&&first2<='69')) return {name:'Mastercard / Maestro',logo:'💳',color:'#EB001B',bg:'#FFEAEA',badge:'Maestro'};
  if(first2==='34'||first2==='37') return {name:'American Express',logo:'💳',color:'#007BC1',bg:'#E5F4FF',badge:'AMEX'};
  if(first4==='3528'||first4==='3529'||(first2>='35'&&first2<='35')) return {name:'JCB',logo:'💳',color:'#003087',bg:'#E5EBF7',badge:'JCB'};
  if(first2==='62'||first2==='88') return {name:'UnionPay',logo:'💳',color:'#C0392B',bg:'#FDECEA',badge:'UnionPay'};
  if(first==='6') return {name:'Discover / UnionPay',logo:'💳',color:'#E65C00',bg:'#FFF0E5',badge:'Discover'};
  return {name:'ไม่รู้จักประเภทบัตร',logo:'❓',color:'#856404',bg:'#FFF3CD',badge:'?'};
}

function formatCard(inp){
  const raw=inp.value.replace(/\D/g,'').substring(0,16);
  inp.value=raw.replace(/(.{4})/g,'$1 ').trim();

  // Auto-detect brand
  const detected=document.getElementById('card-brand-detected');
  const unknown=document.getElementById('card-brand-unknown');
  if(!raw){ detected.style.display='none'; unknown.style.display='none'; selectedCardBrand=''; return; }

  const brand=detectCardBrand(raw);
  if(brand&&brand.badge!=='?'){
    detected.style.display='flex';
    unknown.style.display='none';
    document.getElementById('card-brand-logo').textContent=brand.logo;
    document.getElementById('card-brand-name').textContent=brand.name;
    const badge=document.getElementById('card-brand-badge');
    badge.textContent=brand.badge;
    badge.style.background=brand.bg;
    badge.style.color=brand.color;
    badge.style.border=`1px solid ${brand.color}33`;
    selectedCardBrand=brand.badge;
  } else if(raw.length>=1){
    detected.style.display='none';
    unknown.style.display='block';
    selectedCardBrand='';
  }
}
function formatExp(inp){
  let v=inp.value.replace(/\D/g,'').substring(0,4);
  if(v.length>2)v=v.substring(0,2)+'/'+v.substring(2);
  inp.value=v;
}

function confirmPayment(){
  const total=cart.reduce((s,c)=>s+((c.price+(c.toppingTotal||0))*c.qty),0);
  if(currentPayType==='cash'){
    const recv=parseFloat(document.getElementById('cash-received').value)||0;
    if(recv<total){showToast('⚠️ รับเงินมาไม่พอ','error');return;}
  }
  if(currentPayType==='card'){
    const num=document.getElementById('card-number').value.replace(/\s/g,'');
    if(num.length<16){showToast('⚠️ กรอกหมายเลขบัตรให้ครบ','error');return;}
  }
  // Build order record
  const recv=currentPayType==='cash'?parseFloat(document.getElementById('cash-received').value):total;
  const change=currentPayType==='cash'?recv-total:0;
  const now=new Date();
  const receiptId='RC'+now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0')+String(++orderSeed).padStart(3,'0');
  const order={
    receiptId,
    timestamp:now,
    employee:currentUser,
    customerId: currentCustomerId,
    items:JSON.parse(JSON.stringify(cart)),
    total,
    payType:currentPayType,
    amountReceived:recv,
    change,
    cardBrand:currentPayType==='card'?selectedCardBrand:null,
    status:'completed',
  };
  allOrders.push(order);
  closeModal('modal-payment');
  showReceipt(order);
}

/* ═══════════════════════════════════════════════════════════════
   RECEIPT
═══════════════════════════════════════════════════════════════ */
function showReceipt(order){
  const ts=order.timestamp;
  const dateStr=`${ts.getDate()}/${ts.getMonth()+1}/${ts.getFullYear()} ${String(ts.getHours()).padStart(2,'0')}:${String(ts.getMinutes()).padStart(2,'0')}`;
  const payLabel={cash:'เงินสด',qr:'QR Code',card:`บัตร (${order.cardBrand})`};
  let itemsHtml=order.items.map(it=>{
    const unit=it.price+(it.toppingTotal||0);
    const rows=[`<div class="ri-row"><div class="ri-name">${it.emoji} ${it.name} × ${it.qty}</div><div class="ri-price">฿${(unit*it.qty).toFixed(0)}</div></div>`];
    if(it.toppings&&it.toppings.length)rows.push(`<div class="ri-row"><div class="ri-name" style="color:var(--gray);font-size:.76rem;padding-left:12px">+ ${it.toppings.map(t=>t.name).join(', ')}</div></div>`);
    if(it.sweetness)rows.push(`<div class="ri-row"><div class="ri-name" style="color:var(--gray);font-size:.76rem;padding-left:12px">ความหวาน ${it.sweetness}</div></div>`);
    return rows.join('');
  }).join('');
  document.getElementById('receipt-content').innerHTML=`
    <div class="receipt-header">
      <div class="receipt-shop">🍵 NOBI CHA</div>
      <div class="receipt-time">${dateStr} · ${order.receiptId}</div>
      <div style="font-size:.78rem;color:var(--gray);margin-top:2px">พนักงาน: ${order.employee.name}</div>
    </div>
    <hr class="receipt-divider">
    <div class="receipt-items-list">${itemsHtml}</div>
    <div class="receipt-total-section">
      <div class="rt-row"><span>ยอดรวม</span><span>฿${order.total.toFixed(2)}</span></div>
      <div class="rt-row"><span>ชำระด้วย</span><span>${payLabel[order.payType]}</span></div>
      ${order.payType==='cash'?`<div class="rt-row"><span>รับมา</span><span>฿${order.amountReceived.toFixed(2)}</span></div><div class="rt-row"><span>เงินทอน</span><span>฿${order.change.toFixed(2)}</span></div>`:''}
      <div class="rt-row big"><span>ยอดชำระ</span><span>฿${order.total.toFixed(2)}</span></div>
    </div>
    <div style="text-align:center;margin-top:12px;font-size:.8rem;color:var(--gray)">ขอบคุณที่ใช้บริการ 🍵<br>NOBI CHA Bubble Tea</div>
  `;
  openModal('modal-receipt');
  showToast('✅ ชำระเงินสำเร็จ! ยอด ฿'+order.total.toFixed(0),'success');
}

function newOrder(){
  cart=[];
  resetCustomer();
  renderCart();
}

/* ═══════════════════════════════════════════════════════════════
   DEMO DATA GENERATOR
═══════════════════════════════════════════════════════════════ */
function generateDemoOrders(){
  if(allOrders.length>0)return;
  const cats=[
    {cat:'thai',items:MENU[0].items,noTop:false,emoji:'🍵'},
    {cat:'milk',items:MENU[1].items,noTop:false,emoji:'🧋'},
    {cat:'fresh',items:MENU[2].items,noTop:false,emoji:'🥛'},
    {cat:'hot',items:MENU[3].items,noTop:true,emoji:'☕'},
    {cat:'soda',items:MENU[4].items,noTop:false,emoji:'🥤'},
    {cat:'frappe',items:MENU[6].items,noTop:false,emoji:'🧊'},
    {cat:'premium',items:MENU[8].items,noTop:false,emoji:'⭐'},
    {cat:'water',items:MENU[11].items,noTop:true,emoji:'💧'},
    {cat:'bake',items:MENU[12].items,noTop:true,emoji:'🍪'},
  ];
  const payTypes=['cash','qr','card'];
  const emps=USERS.filter(u=>u.pos==='Staff'||u.pos==='Admin');
  const now=new Date();
  let seed=100;
  for(let d=30;d>=0;d--){
    const ordersToday=Math.floor(Math.random()*18)+5;
    for(let o=0;o<ordersToday;o++){
      const ts=new Date(now);
      ts.setDate(ts.getDate()-d);
      ts.setHours(9+Math.floor(Math.random()*11),Math.floor(Math.random()*60),0,0);
      const numItems=Math.floor(Math.random()*4)+1;
      const items=[];
      for(let i=0;i<numItems;i++){
        const catObj=cats[Math.floor(Math.random()*cats.length)];
        const item=catObj.items[Math.floor(Math.random()*catObj.items.length)];
        const tops=catObj.noTop?[]:TOPPINGS.filter(()=>Math.random()<0.4).slice(0,2);
        const toppingTotal=tops.reduce((s,t)=>s+t.price,0);
        const qty=Math.floor(Math.random()*3)+1;
        items.push({...item,emoji:catObj.emoji,cat:catObj.cat,qty,sweetness:catObj.noTop?null:['0%','50%','100%','125%'][Math.floor(Math.random()*4)],toppings:tops,toppingTotal});
      }
      const total=items.reduce((s,c)=>s+((c.price+(c.toppingTotal||0))*c.qty),0);
      const emp=emps[Math.floor(Math.random()*emps.length)];
      const pt=payTypes[Math.floor(Math.random()*payTypes.length)];
      const dateStr=`${ts.getFullYear()}${String(ts.getMonth()+1).padStart(2,'0')}${String(ts.getDate()).padStart(2,'0')}`;
      allOrders.push({
        receiptId:'RC'+dateStr+String(++seed).padStart(3,'0'),
        timestamp:ts,employee:emp,customerId:Math.random()<0.3?'C00'+Math.floor(Math.random()*5+1):null,
        items,total,payType:pt,amountReceived:total+(pt==='cash'?Math.ceil(total/10)*10-total:0),
        change:pt==='cash'?Math.ceil(total/10)*10-total:0,cardBrand:pt==='card'?'VISA':null,status:'completed',
      });
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════════ */
function setDateFilter(days, btn){
  dashDays=days;
  document.querySelectorAll('.df-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderDashboard();
}

function getFilteredOrders(){
  const now=new Date();
  const cutoff=new Date(now);
  cutoff.setDate(cutoff.getDate()-(dashDays-1));
  cutoff.setHours(0,0,0,0);
  return allOrders.filter(o=>o.timestamp>=cutoff&&o.status==='completed');
}

function renderDashboard(){
  const orders=getFilteredOrders();
  // Stats
  const revenue=orders.reduce((s,o)=>s+o.total,0);
  const cups=orders.reduce((s,o)=>s+o.items.filter(i=>!['water','bake'].includes(i.cat)).reduce((a,i)=>a+i.qty,0),0);
  const water=orders.reduce((s,o)=>s+o.items.filter(i=>i.cat==='water').reduce((a,i)=>a+i.qty,0),0);
  const bake=orders.reduce((s,o)=>s+o.items.filter(i=>i.cat==='bake').reduce((a,i)=>a+i.qty,0),0);
  const avg=orders.length?revenue/orders.length:0;
  const label=dashDays===1?'วันนี้':`${dashDays} วันล่าสุด`;
  document.getElementById('s-revenue').textContent='฿'+revenue.toLocaleString('th',{minimumFractionDigits:0});
  document.getElementById('s-revenue-sub').textContent=label;
  document.getElementById('s-orders').textContent=orders.length;
  document.getElementById('s-orders-sub').textContent=label;
  document.getElementById('s-cups').textContent=cups;
  document.getElementById('s-cups-sub').textContent='แก้วเครื่องดื่ม';
  document.getElementById('s-water').textContent=water;
  document.getElementById('s-water-sub').textContent='ขวด/แพ็ค';
  document.getElementById('s-bake').textContent=bake;
  document.getElementById('s-bake-sub').textContent='ชิ้น/แพ็ค';
  document.getElementById('s-avg').textContent='฿'+avg.toFixed(0);
  document.getElementById('s-avg-sub').textContent='เฉลี่ยต่อบิล';

  renderChartCat(orders);
  renderChartPay(orders);
  renderBestSeller(orders);
  renderHistory(orders);
}

function renderChartCat(orders){
  const CAT_LABELS={thai:'ชาไทย',milk:'ชานม',fresh:'นมสด',hot:'เมนูร้อน',soda:'โซดา',fruit:'ชาผลไม้',frappe:'ปั่น',passion:'เสาวรส',peach:'พีช',premium:'พรีเมียม',other:'อื่นๆ',water:'น้ำดื่ม',bake:'โนบิเบค'};
  const catCount={};
  orders.forEach(o=>o.items.forEach(i=>{catCount[i.cat]=(catCount[i.cat]||0)+i.qty;}));
  const labels=Object.keys(catCount).map(k=>CAT_LABELS[k]||k);
  const data=Object.values(catCount);
  const colors=['#C8A97E','#6B4226','#7A9E6F','#D4A843','#8B5E3C','#A8C79A','#5a8a50','#E8C77A','#3D2B1F','#9E8C7A','#C0392B','#2980B9','#4A235A'];
  if(charts.cat)charts.cat.destroy();
  charts.cat=new Chart(document.getElementById('chart-cat'),{
    type:'doughnut',
    data:{labels,datasets:[{data,backgroundColor:colors.slice(0,labels.length),borderWidth:2,borderColor:'#FDF6EE'}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{font:{family:'Sarabun',size:10},boxWidth:12,padding:6}}}}
  });
}

function renderChartPay(orders){
  const counts={cash:0,qr:0,card:0};
  orders.forEach(o=>counts[o.payType]=(counts[o.payType]||0)+o.total);
  if(charts.pay)charts.pay.destroy();
  charts.pay=new Chart(document.getElementById('chart-pay'),{
    type:'pie',
    data:{
      labels:['เงินสด','QR Code','บัตรเครดิต/เดบิต'],
      datasets:[{data:[counts.cash,counts.qr,counts.card],backgroundColor:['#7A9E6F','#2980B9','#D4A843'],borderWidth:2,borderColor:'#FDF6EE'}]
    },
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{font:{family:'Sarabun',size:10},boxWidth:12,padding:6}}}}
  });
}

function renderBestSeller(orders){
  const itemMap={};
  orders.forEach(o=>o.items.forEach(i=>{
    if(!itemMap[i.name])itemMap[i.name]={name:i.name,emoji:i.emoji,qty:0,rev:0};
    itemMap[i.name].qty+=i.qty;
    itemMap[i.name].rev+=(i.price+(i.toppingTotal||0))*i.qty;
  }));
  const top5=Object.values(itemMap).sort((a,b)=>b.qty-a.qty).slice(0,5);
  const ul=document.getElementById('bestseller-list');
  ul.innerHTML=top5.map((it,i)=>`
    <li>
      <div class="bs-rank ${i===0?'gold':''}">${i+1}</div>
      <div class="bs-name">${it.emoji} ${it.name}</div>
      <div class="bs-qty">${it.qty} แก้ว</div>
      <div class="bs-rev">฿${it.rev.toFixed(0)}</div>
    </li>
  `).join('');
}

function renderHistory(orders){
  const sorted=[...orders].sort((a,b)=>b.timestamp-a.timestamp).slice(0,50);
  document.getElementById('history-count-label').textContent=`แสดง ${sorted.length} รายการล่าสุด (จาก ${orders.length})`;
  const payLabel={cash:'เงินสด',qr:'QR Code',card:'บัตร'};
  const payClass={cash:'pay-cash',qr:'pay-qr',card:'pay-card'};
  const tbody=document.getElementById('history-tbody');
  tbody.innerHTML=sorted.map(o=>{
    const ts=o.timestamp;
    const dateStr=`${ts.getDate()}/${ts.getMonth()+1}/${ts.getFullYear()} ${String(ts.getHours()).padStart(2,'0')}:${String(ts.getMinutes()).padStart(2,'0')}`;
    const itemsSummary=o.items.slice(0,2).map(i=>`${i.emoji}${i.name}×${i.qty}`).join(', ')+(o.items.length>2?` +${o.items.length-2} อื่นๆ`:'');
    return `<tr>
      <td style="font-family:monospace;font-size:.78rem;font-weight:700;color:var(--brown)">${o.receiptId}</td>
      <td style="white-space:nowrap;font-size:.8rem">${dateStr}</td>
      <td style="font-size:.8rem">${o.employee.name}</td>
      <td style="font-size:.78rem;max-width:200px">${itemsSummary}</td>
      <td><span class="pay-type-badge ${payClass[o.payType]}">${payLabel[o.payType]}</span></td>
      <td style="text-align:right;font-weight:700;color:var(--brown)">฿${o.total.toFixed(2)}</td>
      <td><span class="badge-status status-${o.status}">${o.status==='completed'?'สำเร็จ':o.status==='pending'?'รอดำเนินการ':'ยกเลิก'}</span></td>
    </tr>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════════
   MODAL HELPERS
═══════════════════════════════════════════════════════════════ */
function openModal(id){document.getElementById(id).classList.add('show')}
function closeModal(id){document.getElementById(id).classList.remove('show')}
document.querySelectorAll('.modal-overlay').forEach(m=>{
  m.addEventListener('click',e=>{if(e.target===m)closeModal(m.id)});
});

/* ═══════════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════════ */
function showToast(msg,type=''){
  const c=document.getElementById('toast-container');
  const t=document.createElement('div');
  t.className='toast '+(type||'');
  t.textContent=msg;
  c.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(()=>t.remove(),300)},2500);
}
