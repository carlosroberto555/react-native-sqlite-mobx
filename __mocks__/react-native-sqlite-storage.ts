export const databaseMock = {
	transaction: jest.fn(),
	readTransaction: jest.fn(),
	close: jest.fn(),
	executeSql: jest.fn(),
	attach: jest.fn(),
	dettach: jest.fn()
}

databaseMock.executeSql.mockReturnValue([
	{
		insertId: 0,
		rowsAffected: 0,
		rows: {
			length: 0,
			item: (index: number) => null
		}
	}
])

export const DEBUG = jest.fn()
export const enablePromise = jest.fn()
export const openDatabase = jest.fn()
openDatabase.mockReturnValue(databaseMock)

export default {
	enablePromise,
	openDatabase,
	DEBUG
}
