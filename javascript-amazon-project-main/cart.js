export let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        cart = [{
        }]
    } 


export function savethecart () {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addingcart(idproduct, hehe) {

    
    let matching;
          cart.forEach((item)=>{
            if (idproduct === item.id) {
                matching = item;
            }
          });
          if (matching) {
            let quantity = Number(matching.quantity);
            quantity += hehe;
            matching.quantity = quantity;
            console.log(quantity);
          } else {
            cart.push({
              id: idproduct,
              quantity: hehe,
              deliveryOptionId: '1'
            });
          }
          
          console.log(cart); 
          savethecart();
}

export function removeFromCart(productid) {
  const newcart = []

  cart.forEach((item)=> {
    if (item.id !== productid) {
      newcart.push(item);
    }
  });
  cart = newcart;
}

export function updateDelivery (producto, option) {
  let matching;
  cart.forEach((item)=>{
    

    if (!producto || !item.id) {
        return;
    } else if (producto === item.id) {
      matching = item;
    }
  });
  

  if (matching) {
    
    matching.deliveryOptionId = option;
    savethecart();
}
}
