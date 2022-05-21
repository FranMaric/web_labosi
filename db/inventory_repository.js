const { query } = require("./db");

class InventoryRepository {
    getItem(itemId) {
        // query("SELECT * FROM");
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