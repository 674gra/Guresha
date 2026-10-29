// // Simple client-side cart using localStorage
// (function(){
//     const KEY = 'guresha_cart_v1';

//     function getCart(){
//         try{
//             return JSON.parse(localStorage.getItem(KEY)) || [];
//         }catch(e){
//             return [];
//         }
//     }

//     function saveCart(cart){
//         localStorage.setItem(KEY, JSON.stringify(cart));
//         updateCartCount();
//     }

//     function updateCartCount(){
//         const cart = getCart();
//         const count = cart.reduce((s,i)=>s + (i.qty||1),0);
//         const el = document.getElementById('cart-count');
//         if(el) el.textContent = count;
//     }

//     function addToCart(name, price, img){
//         const cart = getCart();
//         const existing = cart.find(i=>i.name === name);
//         if(existing){ 
//             // prevent increasing beyond MAX_QTY
//             if((existing.qty||1) >= MAX_QTY){
//                 alert('Maximum quantity per item is ' + MAX_QTY);
//                 return;
//             }
//             existing.qty = (existing.qty||1) + 1; 
//         }
//         else cart.push({ name, price: Number(price)||0, img: img||'', qty: 1 });
//         saveCart(cart);
//         // small feedback
//         alert(name + ' added to cart');
//     }

//     function removeFromCart(index){
//         const cart = getCart();
//         if(index>=0 && index < cart.length){ cart.splice(index,1); saveCart(cart); }
//         renderPanel();
//     }

//     function changeQty(index, delta){
//         const cart = getCart();
//         if(index>=0 && index < cart.length){
//             const current = (cart[index].qty||1);
//             let next = current + delta;
//             if(delta > 0 && next > MAX_QTY){
//                 alert('Maximum quantity per item is ' + MAX_QTY);
//                 next = MAX_QTY;
//             }
//             cart[index].qty = Math.max(0, next);
//             if(cart[index].qty === 0) cart.splice(index,1);
//             saveCart(cart);
//         }
//         renderPanel();
//     }

//     function getTotal(){
//         return getCart().reduce((s,i)=>s + (i.price * (i.qty||1)),0);
//     }

//     // maximum quantity allowed per single item
//     const MAX_QTY = 7;

//     // render a small panel in the page
//     function renderPanel(){
//         let panel = document.getElementById('cart-panel');
//         if(!panel){
//             panel = document.createElement('div');
//             panel.id = 'cart-panel';
//             panel.style.position = 'fixed';
//             panel.style.right = '20px';
//             panel.style.top = '70px';
//             panel.style.width = '320px';
//             panel.style.maxHeight = '70vh';
//             panel.style.overflow = 'auto';
//             panel.style.background = 'white';
//             panel.style.border = '1px solid #ccc';
//             panel.style.borderRadius = '8px';
//             panel.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
//             panel.style.padding = '10px';
//             panel.style.zIndex = 9999;
//             document.body.appendChild(panel);
//         }
//         const cart = getCart();
//         if(cart.length === 0){
//             panel.innerHTML = '<strong>Cart is empty</strong><br><button onclick="clearCart()">Clear</button>';
//             return;
//         }
//         let html = '<strong>Your Cart</strong><hr>';
//         cart.forEach((it, idx)=>{
//             const plusDisabled = (it.qty||1) >= MAX_QTY ? 'disabled' : '';
//             html += `<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
//                 <img src="${it.img||''}" style="width:60px;height:50px;object-fit:cover;border-radius:6px;"/>
//                 <div style="flex:1">
//                     <div style="font-weight:600">${it.name}</div>
//                     <div>${it.price} ብር × ${it.qty}</div>
//                 </div>
//                 <div style="display:flex;flex-direction:column;gap:4px;">
//                     <button style="padding:2px 6px" ${plusDisabled} onclick="changeQty(${idx},1)">+</button>
//                     <button style="padding:2px 6px" onclick="changeQty(${idx},-1)">-</button>
//                     <button style="padding:2px 6px" onclick="removeFromCart(${idx})">✕</button>
//                 </div>
//             </div>`;
//         });
//         html += `<hr><div style="font-weight:700">Total: ${getTotal()} ብር</div>
//                  <div style="display:flex;gap:6px;margin-top:8px">
//                    <button onclick="goToCheckout()">Checkout</button>
//                    <button onclick="clearCart()">Clear</button>
//                  </div>`;
//         panel.innerHTML = html;
//     }

//     function togglePanel(){
//         const panel = document.getElementById('cart-panel');
//         if(panel){ panel.remove(); }
//         else renderPanel();
//     }

//     function clearCart(){
//         localStorage.removeItem(KEY);
//         updateCartCount();
//         const panel = document.getElementById('cart-panel');
//         if(panel) panel.remove();
//         alert('Cart cleared');
//     }

//     function goToCheckout(){
//         window.location.href = 'buyf.html';
//     }

//     // For checkout page rendering
//     function renderCartPage(rootId){
//         const root = document.getElementById(rootId || 'cart-root');
//         if(!root) return;
//         const cart = getCart();
//         if(cart.length === 0){ root.innerHTML = '<p>Cart is empty.</p>'; return; }
//         let html = '<h3>Order Summary</h3><div>';
//         cart.forEach((it,idx)=>{
//             html += `<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
//                 <img src="${it.img||''}" style="width:80px;height:60px;object-fit:cover;border-radius:6px;"/>
//                 <div style="flex:1">
//                     <div style="font-weight:700">${it.name}</div>
//                     <div>${it.qty} × ${it.price} ብር</div>
//                 </div>
//             </div>`;
//         });
//         html += `</div><hr><div style="font-weight:800">Total: ${getTotal()} ብር</div>
//                  <div style="margin-top:12px"><button onclick="confirmOrder()">Confirm Order</button>
//                  <button onclick="clearCart()" style="margin-left:8px">Clear Cart</button></div>`;
//         root.innerHTML = html;
//     }

//     function confirmOrder(){
//         // simple mock confirmation
//         const total = getTotal();
//         if(total === 0){ alert('Cart empty'); return; }
//         alert('Order confirmed. Total: ' + total + ' ብር');
//         clearCart();
//         // optionally redirect home
//         window.location.href = 'food.html';
//     }

//     // expose to global
//     window.addToCart = addToCart;
//     window.removeFromCart = removeFromCart;
//     window.changeQty = changeQty;
//     window.clearCart = clearCart;
//     window.togglePanel = togglePanel;
//     window.renderCartPage = renderCartPage;
//     window.confirmOrder = confirmOrder;

//     // update count on load
//     document.addEventListener('DOMContentLoaded', updateCartCount);
// })();
  // ==========================
// GURESHA SIMPLE CART
// ==========================

const CART_KEY = "guresha_cart";
const MAX_ITEMS = 7;

// ---------- GET CART ----------
function getCart() {
  let data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

// ---------- SAVE CART ----------
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

// ---------- TOTAL ITEMS ----------
function getItemCount() {
  return getCart().length;
}

// ---------- ADD TO CART ----------
function addToCart(name, price) {
  let cart = getCart();

  if (cart.length >= MAX_ITEMS) {
    alert("ከ7 በላይ ምግብ መዘዝ አይቻልም");
    return;
  }

  cart.push({
    name: name,
    price: price
  });

  saveCart(cart);
  alert(name + " ወደ ጋሪ ታክሏል");
}

// ---------- REMOVE ITEM ----------
function removeFromCart(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

// ---------- TOTAL PRICE ----------
function getTotal() {
  let cart = getCart();
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }

  return total;
}

// ---------- RENDER CART ON CHECKOUT PAGE ----------
function renderCart() {
  let root = document.getElementById("cart-root");
  if (!root) return;

  let cart = getCart();

  if (cart.length === 0) {
    root.innerHTML = "<p>ጋሪው ባዶ ነው</p>";
    return;
  }

  let html = "<h3>የትዕዛዝ ዝርዝር</h3>";

  for (let i = 0; i < cart.length; i++) {
    html += `
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span>${cart[i].name}</span>
        <span>${cart[i].price} ብር</span>
        <button onclick="removeFromCart(${i})">✕</button>
      </div>
    `;
  }

  html += `<hr><strong>ጠቅላላ: ${getTotal()} ብር</strong>`;
  root.innerHTML = html;
}

// ---------- CART COUNT ----------
function updateCartCount() {
  let el = document.getElementById("cart-count");
  if (el) {
    el.innerText = getItemCount();
  }
}

// ---------- CLEAR CART ----------
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
  renderCart();
}

// ---------- NAVBAR CART = CHECKOUT ----------
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  renderCart();

  let cartBtn = document.getElementById("cart-toggle");

  if (cartBtn) {
    cartBtn.addEventListener("click", function () {
      let cart = getCart();

      if (cart.length === 0) {
        alert("ጋሪው ባዶ ነው");
        return;
      }

      // GO TO CHECKOUT PAGE
      window.location.href = "buyf.html";
    });
  }
});

function placeOrder() {
  alert("ትእዛዞ ደርሶናል!!!");

  // clear only the cart (recommended)
  localStorage.removeItem("guresha_cart");

  // update cart count to 0
  let countEl = document.getElementById("cart-count");
  if (countEl) {
    countEl.innerText = "0";
  }

  // clear cart view if on checkout page
  let cartRoot = document.getElementById("cart-root");
  if (cartRoot) {
    cartRoot.innerHTML = "<p>ጋሪው ባዶ ነው</p>";
  }
}

