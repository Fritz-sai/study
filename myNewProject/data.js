const product = [{
    name: 'Burger',
    quantity: 1,
    price: 50,
}, {
    name: 'Pizza',
    quantity: 1,
    price: 100,
},{
    name: 'Hotdog',
    quantity: 1,
    price: 40,
},{
    name: 'Ham',
    quantity: 1,
    price: 20,
}]

function order(item) {
    if (item === product.name) {
        console.log(product);
    }
}