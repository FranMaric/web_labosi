function getCart() {
    return JSON.parse(localStorage.getItem(cartItemsKey));
}

 let refreshCart = async function () {
    let cart = getCart();

    if(cart){
        let ids = Object.keys(cart);
        if(ids.length < 1) return;
        let container = document.querySelector('.cart');
        container.innerHTML = "";

        let cartHeaderTemplate = document.querySelector('#cart-template-header');
        let cartHeader = cartHeaderTemplate.content.cloneNode(true);
        container.appendChild(cartHeader);

        let response = await fetch('data/lab2.json');
        let data = await response.json();

        let cartItemTemplate = document.querySelector('#cart-template-item');
        for(const id of ids){
            let product = data.products.find(p => p.id == id);

            let cartItem = cartItemTemplate.content.cloneNode(true);

            cartItem.querySelector(".cart-item").dataset.id = id;
            let title = cartItem.querySelector('.cart-item-title');
            title.textContent = product.name;
            let quantity = cartItem.querySelector('.cart-item-quantity');
            quantity.value = cart[id];

            cartItem.querySelector('.cart-item-price').textContent = product.price + ' kn';

            container.appendChild(cartItem);
        }
    }
}

refreshCart();