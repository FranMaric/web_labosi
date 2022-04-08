const cartItemsKey = 'cart_items';

function addToCart(id) {
	id = id.toString();

	let cartItems = {};

	if(localStorage.getItem(cartItemsKey) !== null) {
		cartItems = JSON.parse(localStorage.getItem(cartItemsKey));
	}
	if(cartItems.hasOwnProperty(id)) {
		cartItems[id]++;
	} else {
		cartItems[id] = 1;
	}

	localStorage.setItem(cartItemsKey, JSON.stringify(cartItems));

	refreshCartItems();
}

let getData = async function () {
	let response = await fetch('data/lab2.json');
	let data = await response.json();
	addCategories(data);
}

let addCategories = async function (data) {
	let main = document.querySelector('main');
	let categoryTemplate = document.querySelector('#category-template');
	let productTemplate = document.querySelector('#product-template');

	for (let index = 0; index < data.categories.length; index++) {
		let category = categoryTemplate.content.cloneNode(true);
		let categoryTitleElement = category.querySelector('.decorated-title > span');
		categoryTitleElement.textContent = data.categories[index].name;

		let products = data.products.filter(p => p.categoryId ==  data.categories[index].id);

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
}

getData();