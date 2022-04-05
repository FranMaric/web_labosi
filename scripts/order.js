function addToCart(id) {
	let cartItems = {};

	if(localStorage.getItem('cart_items') !== null) {
		cartItems = JSON.parse(localStorage.getItem('cart_items'));
	}

	if(cartItems.hasOwnProperty(id)) {
		cartItems[id]++;
	} else {
		cartItems[id] = 1;
	}

	localStorage.setItem('cart_items', JSON.stringify(cartItems));

	console.log(cartItems);

	refreshCartItems();
}

let getData = async function () {
	let response = await fetch("https://web1lab2.azurewebsites.net/categories");
	let data = await response.json();
	addCategories(data);

}

let addCategories = async function (categories) {
	let main = document.querySelector('main');
	let categoryTemplate = document.querySelector('#category-template');
	let productTemplate = document.querySelector('#product-template');

	for (let index = 0; index < categories.length; index++) {
		let category = categoryTemplate.content.cloneNode(true);
		let categoryTitleElement = category.querySelector('.decorated-title > span');
		categoryTitleElement.textContent = categories[index].name;

		let productsResponse = await fetch("https://web1lab2.azurewebsites.net/products?categoryId=" + categories[index].id);
		let products = await productsResponse.json();

		for(let i = 0; i < products.length; i++) {
			let product = productTemplate.content.cloneNode(true);
			product.querySelector('.photo-box').setAttribute('data-id', products[i].id);
			product.querySelector('.photo-box-title').textContent = products[i].name;
			product.querySelector('.photo-box-image').setAttribute('src', products[i].imageUrl);
			product.querySelector('.cart-btn').setAttribute('onclick', `addToCart(${products[i].id})`);
			category.querySelector('.gallery').appendChild(product);
		}

		main.appendChild(category);
	}
};

getData();