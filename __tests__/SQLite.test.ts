import sqlite from 'react-native-sqlite-storage'
import SQLite from '../src/SQLite'

describe('test database setup', () => {
	it('database is opening ok', async () => {
		// Open database and mock functions
		await SQLite.openDatabase({ name: 'app.db', location: 'default' })

		// Check if database is opened ok
		expect(sqlite.openDatabase).toBeCalledWith({
			name: 'app.db',
			location: 'default'
		})
	})
})

describe('test generated sql', () => {
	it('method query', async () => {
		// Execute a query with params
		await SQLite.query('SELECT * FROM test WHERE id = ?', [1])

		// Check if executeSql is executed correct
		expect(SQLite.databaseInstance.executeSql).toBeCalledWith(
			'SELECT * FROM test WHERE id = ?',
			[1]
		)
	})

	it('method truncateTable', async () => {
		// Execute a query with params
		await SQLite.truncateTable('test')

		// Check if executeSql is executed correct
		expect(SQLite.databaseInstance.executeSql).toBeCalledWith(
			"DELETE FROM test; DELETE FROM sqlite_sequence where name='test';",
			undefined
		)
	})

	it('method insert', async () => {
		// Execute a query with params
		await SQLite.insert('test', { foo: 'bar' })

		// Check if executeSql is executed correct
		expect(SQLite.databaseInstance.executeSql).toBeCalledWith(
			"INSERT INTO test (foo) VALUES ('bar');",
			undefined
		)
	})

	it('method insertOrReplace', async () => {
		// Execute a query with params
		await SQLite.insertOrReplace('test', { id: 1, foo: 'bar' })

		// Check if executeSql is executed correct
		expect(SQLite.databaseInstance.executeSql).toBeCalledWith(
			"REPLACE INTO test (id, foo) VALUES (1,'bar');",
			undefined
		)
	})

	it('method insertMany', async () => {
		// Execute a query with params
		await SQLite.insertMany('test', [{ foo: 'bar' }, { foo: 'bar1' }])

		// Check if executeSql is executed correct
		expect(SQLite.databaseInstance.executeSql).toBeCalledWith(
			"INSERT INTO test (foo) VALUES ('bar'),('bar1')",
			undefined
		)
	})
})
