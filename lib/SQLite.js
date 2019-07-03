import sqlite from 'react-native-sqlite-storage';
import SQLiteTransaction from './SQLiteTransaction';
import SQLiteResultSet from './SQLiteResultSet';
sqlite.enablePromise(true);
export default class SQLite {
    static async openDatabase(params) {
        SQLite.db = await sqlite.openDatabase(params);
    }
    static async query(statement, params) {
        const [result] = await SQLite.db.executeSql(statement.trim(), params);
        return new SQLiteResultSet(result);
    }
    /**
     * TODO: Terminar essa função
     * @param callback
     */
    static transaction(callback) {
        return SQLite.db.transaction(tx => {
            callback(new SQLiteTransaction(tx));
        });
    }
    static truncateTable(table) {
        return SQLite.query(`DELETE FROM ${table}; DELETE FROM sqlite_sequence where name='${table}';`);
    }
    static insert(table, item) {
        // Faz o join
        let columns = Object.keys(item).join(',');
        let values = Object.values(item).join("','");
        // Gera a query
        let query = `INSERT INTO ${table} (${columns}) VALUES ('${values}');`;
        // Executa a query
        return SQLite.query(query);
    }
    static insertOrReplace(table, item) {
        // @ts-ignore
        const { id, ...rest } = item;
        // Faz o join
        let columns = Object.keys(rest).join(',');
        let values = Object.values(rest).join("','");
        // Gera a query
        let query = `REPLACE INTO ${table} (id, ${columns}) VALUES (${id ||
            'null'},'${values}');`;
        // Executa a query
        return SQLite.query(query);
    }
    static async insertMany(table, items) {
        if (!items)
            return;
        // Faz o join
        let columns = Object.keys(items[0]).join(',');
        // Inicia a query de insert
        let queries = [];
        let query = `INSERT INTO ${table} (${columns}) VALUES `;
        // Itera os registros
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            // Se já tiver 500 registros, vai pra próxima query
            if (i && i % 500 === 0) {
                queries.push(query.slice(0, -1));
                query = `INSERT INTO ${table} (${columns}) VALUES `;
            }
            // Insere um por um no banco
            query += "('" + Object.values(item).join("','") + "'),";
        }
        // Concatena a última query
        queries.push(query.slice(0, -1));
        // Executa as queries
        for (const stmt of queries) {
            SQLite.query(stmt);
        }
    }
}
//# sourceMappingURL=SQLite.js.map