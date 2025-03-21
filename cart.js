export let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        cart = [{
        }]
    }  else {
        // Ensure all items in the cart have a valid quantity
        cart.forEach((item) => {
            if (item.quantity === null || item.quantity === undefined) {
                item.quantity = 1; // Initialize quantity if it's null or undefined
            }
        });
    }


export function savethecart () {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addingcart(idproduct) {
    let matching;
          cart.forEach((item)=>{
            if (idproduct === item.id) {
                matching = item;
            }
          });
          console.log(cart);
          if (matching) {
            matching.quantity += 1;
          } else {
            cart.push({
              id: idproduct,
              quantity: 1
            });
          }
          
            
          savethecart();
}
