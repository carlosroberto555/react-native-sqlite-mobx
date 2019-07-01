import { ResultSet, ResultSetRowList } from 'react-native-sqlite-storage'

export default class SQLiteResultSet implements ResultSet {
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
