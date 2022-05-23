const { query } = require("./index");

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

    // static async createNewPartner(name, ownerName, ownerSurname, email, partnerSince, selectId) {
    //     return await ;
    // }

    static async getAllItems() {
        let items = await query(`SELECT * FROM inventory`);
        return items.rows;
    }

    static async getCategories() {
        let categories = await query("SELECT * FROM categories");
        return categories.rows;
    }

    static async getPartners(itemId) {
        let partners = await query(`select * from partners where partnerfor=${itemId}`);
        return partners.rows;
    }

    static async getAllPartners() {
        let partners = await query('select * from partners');
        return partners.rows;
    }
}

module.exports = { InventoryRepository }