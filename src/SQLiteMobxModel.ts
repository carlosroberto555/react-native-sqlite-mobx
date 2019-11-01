import { action, runInAction, observable } from 'mobx'
import SQLite, { SQLiteItem } from './SQLite'
import SQLiteResultSet from './SQLiteResultSet'

type QueryParams = {
	select?: string
	join?: string
	where?: string
}

export default abstract class SQLiteMobxModel<T extends object> {
	@observable lastParams?: QueryParams
	abstract table: string
	abstract data: (T & SQLiteItem)[]

	@action.bound
	async loadItems(params?: QueryParams) {
		const { select, join, where } = getQueryParams(params)

		const resp = await SQLite.query(
			`SELECT ${select} FROM ${this.table} ${join} WHERE ${where}`
		)
		runInAction(() => {
			this.data = resp.toArray() || []
			this.lastParams = params
		})
	}

	@action.bound
	async setItems(items: T[]) {
		await SQLite.truncateTable(this.table)
		await SQLite.insertMany(this.table, items)
		this.loadItems(this.lastParams)
	}

	@action.bound
	async addItems(items: T[]) {
		await SQLite.insertMany(this.table, items)
		this.loadItems(this.lastParams)
	}

	@action.bound
	async addItem(item: T): Promise<SQLiteResultSet> {
		const result = await SQLite.insert(this.table, item)
		this.loadItems(this.lastParams)
		return result
	}

	@action.bound
	async setItem(item: T & SQLiteItem): Promise<SQLiteResultSet> {
		const result = await SQLite.insertOrReplace(this.table, item)
		this.loadItems(this.lastParams)
		return result
	}

	@action.bound
	async getItem(id: number) {
		// TODO: implement this
	}

	@action.bound
	async editItem(item: T) {
		// TODO: implement this
	}

	@action.bound
	async removeItem(item: T & SQLiteItem): Promise<SQLiteResultSet> {
		const result = await SQLite.query(
			`DELETE FROM ${this.table} WHERE id = ${item.id}`
		)
		this.loadItems(this.lastParams)
		return result
	}

	@action.bound
	clear() {
		this.lastParams = undefined
		this.data = []
	}

	@action.bound
	async truncate(): Promise<SQLiteResultSet> {
		const result = await SQLite.truncateTable(this.table)
		runInAction(() => this.clear())
		return result
	}
}

function getQueryParams(p?: QueryParams) {
	if (p) {
		return {
			select: p.select || '*',
			join: p.join || '',
			where: p.where || '1'
		}
	} else {
		return {
			select: '*',
			join: '',
			where: '1'
		}
	}
}
