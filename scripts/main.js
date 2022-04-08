function refreshCartItems(){
	let	cartItems = JSON.parse(localStorage.getItem(cartItemsKey));

	let count = 0

	Object.keys(cartItems).forEach(function(key) {
		count+=cartItems[key];
	});

	document.querySelector('#cart-items').textContent = count;
}

refreshCartItems();