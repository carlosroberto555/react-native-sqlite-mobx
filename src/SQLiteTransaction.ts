import { Transaction } from 'react-native-sqlite-storage'
import SQLiteResultSet from './SQLiteResultSet'

export default class SQLiteTransaction {
	transaction: Transaction

	constructor(tx: Transaction) {
		this.transaction = tx
	}

	async query(statement: string, params?: any[]) {
		const [, result] = await this.transaction.executeSql(statement, params)
		return new SQLiteResultSet(result)
	}
}
