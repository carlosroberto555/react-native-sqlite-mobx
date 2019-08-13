import SQLite from './SQLite'

type SQLiteMobxActioner = (table: SQLiteMobxTable) => void

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
	}

	autoIncrement(value: boolean = true) {
		this._autoIncrement = value
	}

	nullable(value: boolean = true) {
		this._nullable = value
	}

	default(value?: string | number | boolean) {
		this._default = value
	}

	toSQL() {
		let sql = `${this._name} ${this._type}`

		// Add column size
		if (this._size) {
			sql += `(${this._size})`
		}

		// Add Nullable
		if (this._nullable) {
			sql += ' NULL'
		} else {
			sql += ' NOT NULL'
		}

		// SET Autoincrement
		if (this._autoIncrement) {
			sql += ' AUTOINCREMENT'
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
	private _columns: { [key: string]: SQLiteMobxColumn } = {}
	private _ifNotExists?: boolean

	constructor(name: string) {
		this._name = name
	}

	primary(param: string = 'id', size: number = 11) {
		const type = `INTEGER(${size}) PRIMARY KEY`
		const column = new SQLiteMobxColumn(param, type, 0)
		column.nullable(false)
		column.autoIncrement()
		return (this._columns[param] = column)
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
	static async create(name: string, actioner: SQLiteMobxActioner) {
		// Cria uma tabela com o seguinte nome
		const table = new SQLiteMobxTable(name)
		// Inicia com chave primária
		table.primary()
		// Chama o table builder
		actioner(table)
		// Cria a tabela
		await SQLite.query(table.toSQL())
	}

	static async drop(name: string) {}
	static async dropIfExists(name: string) {}
	static async hasTable(name: string) {}
	static async hasColumn(...columns: string[]) {}
}

export { SQLiteMobxActioner, SQLiteMobxTable, SQLiteMobxColumn }
export default SQLiteMobxSchema
