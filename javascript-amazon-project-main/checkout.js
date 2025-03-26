import { products } from "./data/products.js";
import { cart, removeFromCart, savethecart } from "./cart.js";



console.log(cart);
let checkoutHTML = '';
cart.forEach((item) => {
    const idproduct = item.id;
    const producto = products.find(product => product.id === idproduct);
    
    if (producto) {
        checkoutHTML += ` 
        <div class="cart-item-container js-container${producto.id}">
            <div class="delivery-date ">
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${producto.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${producto.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${producto.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `
    } else {
        console.log('cant find')
    }

    
    document.querySelector('.order-summary').innerHTML = checkoutHTML;
});

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









