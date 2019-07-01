import sqlite, {
	DatabaseParams,
	SQLiteDatabase,
	Transaction,
	ResultSet,
	ResultSetRowList
} from 'react-native-sqlite-storage'

sqlite.enablePromise(true)
sqlite.DEBUG(true)

interface TransactionCallback {
	(tx: SQLiteTransaction): void
}

export default class SQLite {
	protected static db: SQLiteDatabase

	static async openDatabase(params: DatabaseParams) {
		SQLite.db = await sqlite.openDatabase(params)
	}

	static async query(statement: string, params?: any[]) {
		const [result] = await SQLite.db.executeSql(statement.trim(), params)
		return new SQLiteResultSet(result)
	}

	/**
	 * TODO: Terminar essa função
	 * @param callback
	 */
	static transaction(callback: TransactionCallback) {
		return SQLite.db.transaction(tx => {
			callback(new SQLiteTransaction(tx))
		})
	}

	static truncateTable(table: string) {
		return SQLite.query(
			`DELETE FROM ${table}; DELETE FROM sqlite_sequence where name='${table}';`
		)
	}

	static insert(table: string, item: object) {
		// Faz o join
		let columns = Object.keys(item).join(',')
		let values = Object.values(item).join("','")

		// Gera a query
		let query = `INSERT INTO ${table} (${columns}) VALUES ('${values}');`

		// Executa a query
		return SQLite.query(query)
	}

	static insertOrReplace(table: string, item: object) {
		// @ts-ignore
		const { id, ...rest } = item

		// Faz o join
		let columns = Object.keys(rest).join(',')
		let values = Object.values(rest).join("','")

		// Gera a query
		let query = `REPLACE INTO ${table} (id, ${columns}) VALUES (${id ||
			'null'},'${values}');`

		// Executa a query
		return SQLite.query(query)
	}

	static async insertMany(table: string, items: object[]) {
		if (!items) return

		// Faz o join
		let columns = Object.keys(items[0]).join(',')

		// Inicia a query de insert
		let queries = []
		let query = `INSERT INTO ${table} (${columns}) VALUES `

		// Itera os registros
		for (let i = 0; i < items.length; i++) {
			const item = items[i]

			// Se já tiver 500 registros, vai pra próxima query
			if (i && i % 500 === 0) {
				queries.push(query.slice(0, -1))
				query = `INSERT INTO ${table} (${columns}) VALUES `
			}

			// Insere um por um no banco
			query += "('" + Object.values(item).join("','") + "'),"
		}

		// Concatena a última query
		queries.push(query.slice(0, -1))

		// Executa as queries
		for (const stmt of queries) {
			return SQLite.query(stmt)
		}
	}
}

class SQLiteTransaction {
	transaction: Transaction

	constructor(tx: Transaction) {
		this.transaction = tx
	}

	async query(statement: string, params?: any[]) {
		const [, result] = await this.transaction.executeSql(statement, params)
		return new SQLiteResultSet(result)
	}
}

class SQLiteResultSet implements ResultSet {
	insertId: number
	rowsAffected: number
	rows: ResultSetRowList

	constructor(result: ResultSet) {
		this.insertId = result.insertId
		this.rowsAffected = result.rowsAffected
		this.rows = result.rows
	}

	*data() {
		for (let i = 0; i < this.rows.length; i++) {
			yield this.rows.item(i)
		}
	}

	toArray() {
		return Array.from(this.data())
	}
}

// function* transactionCallback(tx) {
// 	yield
// }
