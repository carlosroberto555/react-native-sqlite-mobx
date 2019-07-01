export default class SQLiteResultSet {
    constructor(result) {
        this.insertId = result.insertId;
        this.rowsAffected = result.rowsAffected;
        this.rows = result.rows;
    }
    *data() {
        for (let i = 0; i < this.rows.length; i++) {
            yield this.rows.item(i);
        }
    }
    toArray() {
        return Array.from(this.data());
    }
}
//# sourceMappingURL=SQLiteResultSet.js.map