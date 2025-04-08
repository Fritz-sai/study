

export function orderPaymentSummary(cart, products, deliveryOption) {
    let total = 0;
    let html = ``;
    let totalShipping = 0;
    let totalAll = 0;
    let tax = 0;
    let overall = 0;
  
    cart.forEach((cartItem) => {
      const item = products.find(product => product.id === cartItem.id);
      const option = deliveryOption.find(options => options.id === cartItem.deliveryOptionId);
      if (item) {
        total += item.priceCents * cartItem.quantity;
      }

      if (option) {
        totalShipping += option.pricecents;
      }

      totalAll = totalShipping + total;
      tax = totalAll * 0.1;
      overall = tax + totalAll;
    });
  
    console.log(total);
    html = `
       <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${(total/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(totalShipping/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalAll/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(tax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(overall/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment').innerHTML = html;
  }
  