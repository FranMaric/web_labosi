const { query } = require("./db");

class InventoryRepository {
    static async getItem(itemId) {
        let items = await query(`SELECT * FROM inventory WHERE id=${itemId}`);

        if (items.rows.length === 0) {
            return null;
        }

        let item = items.rows[0];

        let category = await InventoryRepository.getCategory(item.categoryid);

        item.categoryName = category.name;
        item.seasonal = category.seasonal;

        return item;
    }

    static async getCategory(categoryId) {
        let categories = await query(`SELECT * FROM categories WHERE id=${categoryId}`);

        if (categories.rows.length === 0) {
            return null;
        }

        return categories.rows[0];

    }

    static async getItems(categoryId) {
        let items = await query(`SELECT * FROM inventory WHERE categoryId=${categoryId}`);
        return items.rows;
    }

    static async getCategories() {
        let categories = await query("SELECT * FROM categories");
        return categories.rows;
    }
}

module.exports = { InventoryRepository }