import sqlite from 'react-native-sqlite-storage'
import SQLite from '../src/SQLite'

it('test if database is opening ok', async () => {
	// Open database and mock functions
	await SQLite.openDatabase({ name: 'app.db', location: 'default' })

	// Check if database is opened ok
	expect(sqlite.openDatabase).toBeCalledWith({
		name: 'app.db',
		location: 'default'
	})
})

it('test sql generated with query', async () => {
	// Execute a query with params
	await SQLite.query('SELECT * FROM test WHERE id = ?', [1])

	// Check if executeSql is executed correct
	expect(SQLite.databaseInstance.executeSql).toBeCalledWith(
		'SELECT * FROM test WHERE id = ?',
		[1]
	)
})

it('test sql generated with truncateTable', async () => {
	// Execute a query with params
	await SQLite.truncateTable('test')

	// Check if executeSql is executed correct
	expect(SQLite.databaseInstance.executeSql).toBeCalledWith(
		"DELETE FROM test; DELETE FROM sqlite_sequence where name='test';",
		undefined
	)
})
