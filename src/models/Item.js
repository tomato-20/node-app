const { v4: uuidv4 } = require("uuid");

const pool = require("../helpers/db.helper");

class Item {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }

  async save() {
    try {
      let date = new Date().toISOString().slice(0, 19).replace("T", " ");
      let id = uuidv4();

      let sql = `
        INSERT INTO items (
            id,
            title,
            description,
            created_at
        ) VALUES (?,?,?,?)
        `;

      let [result, _] = await pool.execute(sql, [
        id,
        this.title,
        this.description ? this.description : null,
        date,
      ]);
      return { id, title: this.title, description: this.description };
    } catch (error) {
      throw error;
    } 
  }

  static async findAll(page = 0, offset = 10) {
    try {
      let sql = `SELECT * from items LIMIT ${page * offset},${offset}`;
      let [result, _] = await pool.execute(sql);
      return result;
    } catch (error) {
      throw error;
    } 
  }

  static async findById(id) {
    try {
      let sql =
        "SELECT `id`,`title`,`description` FROM `items` WHERE `id` = ? ;";
      let [result, _] = await pool.execute(sql, [id]);
      return result.length ? result[0] : null;
    } catch (error) {
      throw error;
    } 
  }

  static async update(id, updateInput) {
    let date = new Date().toISOString().slice(0, 19).replace("T", " ");
    let table = "UPDATE `items` ";
    let whereCondition = "WHERE `id` = ?";

    try {
      if (Object.keys(updateInput).length) {
        let set = Object.keys(updateInput)
          .map((field) => `\`${field}\`= ?`)
          .join(",");
        set = set.concat(",`updated_at`= ? ");
        let sql = table + "SET " + set +whereCondition + ";";

        const values = Object.values(updateInput);
        values.push(...[date,id]);

        await pool.execute(sql, values);
      }
      return;
    } catch (error) {
      throw error;
    } 
  }

  static async delete(id) {
    try {
      let sql = `
        DELETE FROM \`items\` where \`id\` = ? ;
        `;
      let [result, _] = await pool.execute(sql, [id]);
    } catch (error) {
      throw error;
    } 
  }
}

module.exports = Item;
