import { products } from "./data/products.js";
import { deliveryOption } from "./data/deliveryOption.js";
import { cart, removeFromCart, savethecart, updateDelivery } from "./cart.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

function render() {
let checkoutHTML = '';
cart.forEach((item) => {
    const idproduct = item.id;
    const producto = products.find(product => product.id === idproduct);


    const x = item.deliveryOptionId || '1';

    let hehehe = deliveryOption.find(options => x === options.id);
  
    const day = dayjs();
    const date = day.add(hehehe.days, 'days');
    const daystring = date.format('dddd, MMMM D');
        
    if (producto) {
        checkoutHTML += ` 
        <div class="cart-item-container js-container${producto.id}">
            <div class="delivery-date ">
              Delivery date: ${daystring}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${producto.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${producto.name}
                </div>
                <div class="product-price">
                ${(producto.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity" data-product = "${producto.id}">
                  <span>
                    Quantity: <span class="quantity-labe${producto.id}">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update${producto.id}" data-update-id = "${producto.id}">
                    Update
                  </span>
                  <input class="quantity-input
                  quantity-input${producto.id}" type="number">
                  <span class="save-quantity-link js-save
                  save-quantity-link${producto.id} link-primary" data-save = "${producto.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete"
                  data-delete-id = "${producto.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryHTML(producto,item)}
              </div>
            </div>
          </div>
          `
    } 
    document.querySelector('.order-summary').innerHTML = checkoutHTML;
});





function deliveryHTML(producto, item) {
  let html = '';

  deliveryOption.forEach((option) => {
    const day = dayjs();
    const date = day.add(option.days, 'days');
    const daystring = date.format('dddd, MMMM D');

    const ischecked = option.id === item.deliveryOptionId;
    
    const priceString = option.pricecents === 0
      ? 'FREE'
      : (option.pricecents / 100).toFixed(2);

    html += `
      <div class="delivery-option js-option"
      data-product-id = ${producto.id}
      data-delivery-id = ${option.id}>
        <input type="radio"
          ${ischecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${producto.id}">
        <div>
          <div class="delivery-option-date">
            ${daystring}
          </div>
          <div class="delivery-option-price">
            $${priceString} - Shipping
          </div>
        </div>
      </div>
    `;
  });

  return html;
}





document.querySelectorAll('.js-delete').forEach((link)=> {
  link.addEventListener('click', ()=> {
    const productid = link.dataset.deleteId;
    removeFromCart(productid);
    
    /*to update the HTML */
    const container = document.querySelector(`.js-container${productid}`);
    console.log(container);
    container.remove();
    itemsupdate(); 
    savethecart();
  });
});
function itemsupdate() {
  document.querySelector('.js-items').innerHTML = 
  `Checkout (<a class="return-to-home-link js-items"
    href="amazon.html">${cart.length - 1} items</a>)`
}

itemsupdate();


document.querySelectorAll('.update-quantity-link').forEach((element) => {
  element.addEventListener('click', () => {
    const elementid = element.dataset.updateId;
    const update = document.querySelector(`.js-update${elementid}`)
      const updateid = update.dataset.updateId;
      if (elementid === updateid) {
        document.querySelector(`.quantity-input${elementid}`).style.display = "initial";
        document.querySelector(`.save-quantity-link${elementid}`).style.display = "initial";
        document.querySelector(`.js-update${elementid}`).style.display = "none";
      }

        
  });
});
  document.querySelectorAll(".js-save").forEach((save)=> {
    save.addEventListener('click',()=> {
      const saveid = save.dataset.save;
      const updateQuantity = document.querySelector(`.quantity-input${saveid}`).value;
      console.log(saveid);
      if (updateQuantity === '' || updateQuantity < 0) {
        document.querySelector(`.quantity-input${saveid}`).style.display = "none";
        document.querySelector(`.save-quantity-link${saveid}`).style.display = "none";
        document.querySelector(`.js-update${saveid}`).style.display = "initial";
        return;
      } else {
        cart.forEach((item) => {
          if (item.id === saveid) {
            item.quantity = updateQuantity;
          }
        });
        document.querySelector(`.quantity-input${saveid}`).style.display = "none";
        document.querySelector(`.save-quantity-link${saveid}`).style.display = "none";
        document.querySelector(`.js-update${saveid}`).style.display = "initial";
        
      }
      savethecart();
      
      
      document.querySelector(`.quantity-labe${saveid}`).innerText = updateQuantity;
    });
  });  

  document.querySelectorAll('.js-option')
  .forEach((x) => {
    x.addEventListener('click', () => {
      
      const producto = x.dataset.productId;
      const option = x.dataset.deliveryId;


      updateDelivery(producto, option);
      render();
    });
  });
}
render();








