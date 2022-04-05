function addToCart(id) {
	// INSERT CODE HERE --> PRIPREMA

	// END INSERT --> PRIPREMA
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

	for (let index = 0; index < categories.length; index++) {
		let category = categoryTemplate.content.cloneNode(true);
		let categoryTitleElement = category.querySelector('.decorated-title > span');
		categoryTitleElement.textContent = categories[index].name;
		
		let productsResponse = await fetch("https://web1lab2.azurewebsites.net/products?categoryId=" + categories[index].id);
		let products = await productsResponse.json();

		// INSERT CODE HERE --> PRIPREMA

		// END INSERT --> PRIPREMA

		main.appendChild(category);
	}
};
getData();