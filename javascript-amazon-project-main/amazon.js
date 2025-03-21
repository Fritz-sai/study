import {products} from './data/products.js';
import {cart, addingcart} from '/cart.js';

let amazon = '';


products.forEach((item)=> {
    amazon += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${item.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${item.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${item.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${item.rating.count}
            </div>
          </div>

          <div class="product-price">
          ${(item.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart" id = "${item.id}" >
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary"
          data-product-id= "${item.id}">
            Add to Cart
          </button>
        </div>`
       
});
document.querySelector('.products-grid').innerHTML = amazon;
document.querySelectorAll('.button-primary').forEach((button)=> {
    button.addEventListener('click', ()=> {
      const idproduct = button.dataset.productId;
      addingcart(idproduct);
      let cartquantity = 0;
      cart.forEach((item)=>{
        if(item.quantity) {
        cartquantity = cartquantity + item.quantity;
        }
    });
    console.log(cartquantity);
    document.querySelector('.cart-quantity').innerHTML = cartquantity;
      const popout = document.getElementById(`${idproduct}`);
      popout.style.opacity = 1;
      setTimeout (()=> {
        popout.style.opacity = 0;
      }, 2000);

    
})});

