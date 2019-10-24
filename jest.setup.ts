import SQLiteMobxModel from './src/SQLiteMobxModel'

jest.mock('./src/SQLiteMobxModel', () => ({
	__esModule: true,
	default: class<T extends object>
		implements MockOf<SQLiteMobxModel<T>, 'lastParams' | 'data' | 'table'> {
		addItem = jest.fn().mockResolvedValue(null)
		addItems = jest.fn().mockResolvedValue(null)
		setItem = jest.fn().mockResolvedValue(null)
		setItems = jest.fn().mockResolvedValue(null)
		getItem = jest.fn().mockResolvedValue(null)
		editItem = jest.fn().mockResolvedValue(null)
		removeItem = jest.fn().mockResolvedValue(null)
		loadItems = jest.fn().mockResolvedValue(null)
		clear = jest.fn()
		truncate = jest.fn()
	}
}))

type MockOf<Class, Omit extends keyof Class = never> = {
	[Member in Exclude<keyof Class, Omit>]: Class[Member]
}
