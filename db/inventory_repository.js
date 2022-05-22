const { query } = require("./db");

class InventoryRepository {
    static async getItem(itemId) {
        let items = await query(`select inventory.*, categories.name as categoryName, categories.description as categoryDescription, categories.seasonal
                                    from inventory
                                    left join categories
                                    on inventory.categoryid = categories.id
                                    where inventory.id = ${itemId}`);

        if (items.rows.length === 0) {
            return null;
        }

        return items.rows[0];
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