function addToCart(id) {
	id = id.toString();

	let cartItems = {};

	if(localStorage.getItem(cartItemsKey) !== null) {
		cartItems = JSON.parse(localStorage.getItem('cart_items'));
	}
	if(cartItems.hasOwnProperty(id)) {
		cartItems[id]++;
	} else {
		cartItems[id] = 1;
	}

	localStorage.setItem('cart_items', JSON.stringify(cartItems));

	refreshCartItems();
}

let getData = async function () {
	let response = await fetch('data/lab2.json');
	data = await response.json();
	addCategories();
}

var data;


let addCategories = async function () {
	let main = document.querySelector('main');

	let child = main.lastElementChild;
	while (child) {
		if(child.classList.contains('order-filter')) break;
		main.removeChild(child);
		child = main.lastElementChild;
	}

	let categoryTemplate = document.querySelector('#category-template');
	let productTemplate = document.querySelector('#product-template');

	for (let index = 0; index < data.categories.length; index++) {
		let category = categoryTemplate.content.cloneNode(true);
		let categoryTitleElement = category.querySelector('.decorated-title > span');
		categoryTitleElement.textContent = data.categories[index].name;

		let filter = localStorage.getItem('filter');
		if(!filter) filter='';
		let products = data.products.filter(p => p.categoryId ==  data.categories[index].id && p.name.toLowerCase().includes(filter.toLowerCase()));

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

window.onload = function(){
	document.querySelector('.order-filter-apply').addEventListener("click", function() {
		let input = document.querySelector('.order-filter-input').value;

		localStorage.setItem('filter', input);

		addCategories();
	});
}