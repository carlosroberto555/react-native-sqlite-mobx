import sqlite from 'react-native-sqlite-storage'
import SQLite from '../src/SQLite'
import { databaseMock } from '../__mocks__/react-native-sqlite-storage'

it('test if database is opening ok', async () => {
	// Open database and mock functions
	await SQLite.openDatabase({ name: 'app.db', location: 'default' })

	// Check if database is opened ok
	expect(sqlite.openDatabase).toBeCalledWith({
		name: 'app.db',
		location: 'default'
	})
})

it('test if sqlite is triggering executeSql on query', async () => {
	// Execute a query with params
	await SQLite.query('SELECT * FROM test WHERE id = ?', [1])

	// Check if executeSql is executed correct
	expect(databaseMock.executeSql).toBeCalledWith(
		'SELECT * FROM test WHERE id = ?',
		[1]
	)
})
