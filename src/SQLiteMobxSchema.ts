import SQLite from './SQLite'
import SQLiteResultSet from './SQLiteResultSet'

type SQLiteMobxActioner = (table: SQLiteMobxTable) => void
type SQLiteMobxColumns = {
	[key: string]: SQLiteMobxColumn
}

interface SQLParseable {
	toSQL(): string
}

class SQLiteMobxColumn implements SQLParseable {
	private _name?: string
	private _type?: string
	private _size?: number
	private _nullable?: boolean
	private _autoIncrement?: boolean
	private _default?: string | number | boolean

	constructor(name: string, type: string, size: number) {
		this._name = name
		this._type = type
		this._size = size
		return this
	}

	autoIncrement(value: boolean = true) {
		this._autoIncrement = value
		return this
	}

	nullable(value: boolean = true) {
		this._nullable = value
		return this
	}

	default(value?: string | number | boolean) {
		this._default = value
		return this
	}

	toSQL() {
		let sql = `${this._name} ${this._type}`

		// Add column size
		if (this._size) {
			sql += `(${this._size})`
		}

		// SET Autoincrement
		if (this._autoIncrement) {
			sql += ' AUTOINCREMENT'
		}

		// Add Nullable
		if (this._nullable) {
			sql += ' NULL'
		} else {
			sql += ' NOT NULL'
		}

		// SET Default value
		if (this._default) {
			sql += ` DEFAULT ${this._default}`
		}

		// Add Finish comma
		return sql + ',\n'
	}
}

class SQLiteMobxTable implements SQLParseable {
	private _name: string
	private _columns: SQLiteMobxColumns = {}
	private _ifNotExists?: boolean

	constructor(name: string) {
		this._name = name
	}

	primary(param: string = 'id') {
		const column = new SQLiteMobxColumn(param, 'INTEGER PRIMARY KEY', 0)
		return (this._columns[param] = column.autoIncrement().nullable(false))
	}

	string(param: string, size: number = 50) {
		return (this._columns[param] = new SQLiteMobxColumn(param, 'VARCHAR', size))
	}

	integer(param: string, size: number = 11) {
		return (this._columns[param] = new SQLiteMobxColumn(param, 'INTEGER', size))
	}

	boolean(param: string, size: number = 0) {
		return (this._columns[param] = new SQLiteMobxColumn(param, 'BOOLEAN', size))
	}

	double(param: string) {
		return (this._columns[param] = new SQLiteMobxColumn(param, 'DOUBLE', 0))
	}

	date(param: string) {
		return (this._columns[param] = new SQLiteMobxColumn(param, 'DATE', 0))
	}

	ifNotExists(value: boolean = true) {
		this._ifNotExists = value
	}

	toSQL() {
		let sql = 'CREATE TABLE'

		// Add IF NOT EXISTS
		if (this._ifNotExists) {
			sql += ' IF NOT EXISTS'
		}

		// Set Column name and starts block
		sql += ` ${this._name} (\n`

		// Add Column list
		for (const key in this._columns) {
			sql += this._columns[key].toSQL()
		}

		// Remove last comma and finish block
		return sql.replace(/,\n$/g, '\n);')
	}
}

class SQLiteMobxSchema {
	static create(
		name: string,
		actioner: SQLiteMobxActioner
	): Promise<SQLiteResultSet> {
		// Cria uma tabela com o seguinte nome
		const table = new SQLiteMobxTable(name)
		// Inicia com chave primária
		table.primary()
		// Chama o table builder
		actioner(table)
		// Cria a tabela
		return SQLite.query(table.toSQL())
	}

	static drop(name: string): Promise<SQLiteResultSet> {
		return SQLite.query(`DROP TABLE ${name}`)
	}

	static dropIfExists(name: string): Promise<SQLiteResultSet> {
		return SQLite.query(`DROP TABLE IF EXISTS ${name}`)
	}

	static async hasTable(name: string) {}
	static async hasColumn(...columns: string[]) {}
}

export { SQLiteMobxActioner, SQLiteMobxTable, SQLiteMobxColumn }
export default SQLiteMobxSchema
