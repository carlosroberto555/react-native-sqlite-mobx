import { action, observable, runInAction } from 'mobx'
import SQLite from './SQLite'

type SelectParams = {
	select?: string
	join?: string
	where?: string
}

export default abstract class SQLiteMobxModel<T extends { id: number }> {
	abstract table: string
	abstract data: T[]

	@action.bound
	async loadItems(params?: SelectParams) {
		const { select, join, where } = params || {
			select: '*',
			join: '',
			where: '1'
		}

		const resp = await SQLite.query(
			`SELECT ${select} FROM ${this.table} ${join} WHERE ${where}`
		)
		runInAction(() => {
			this.data = resp.toArray() || []
		})
	}

	@action.bound
	async setItems(items: T[]) {
		await SQLite.truncateTable(this.table)
		await SQLite.insertMany(this.table, items)
		await this.loadItems()
	}

	@action.bound
	async addItems(items: T[]) {
		await SQLite.insertMany(this.table, items)
		await this.loadItems()
	}

	@action.bound
	async addItem(item: T) {
		await SQLite.insert(this.table, item)
		await this.loadItems()
	}

	@action.bound
	async setItem(item: T) {
		await SQLite.insertOrReplace(this.table, item)
		await this.loadItems()
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
	async removeItem(item: T) {
		await SQLite.query(`DELETE FROM ${this.table} WHERE id = ${item.id}`)
		await this.loadItems()
	}
}
