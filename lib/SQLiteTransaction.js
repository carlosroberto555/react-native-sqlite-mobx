import SQLiteResultSet from './SQLiteResultSet';
export default class SQLiteTransaction {
    constructor(tx) {
        this.transaction = tx;
    }
    async query(statement, params) {
        const [, result] = await this.transaction.executeSql(statement, params);
        return new SQLiteResultSet(result);
    }
}
//# sourceMappingURL=SQLiteTransaction.js.map