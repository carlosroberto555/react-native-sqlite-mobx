import { action, observable, runInAction } from 'mobx'
import SQLite from './SQLite'

export default abstract class SQLiteMobxModel<T extends { id: number }> {
	abstract table: string
	abstract data: T[]
	@observable select?: string = '*'
	@observable where?: string = '1'
	@observable join?: string = ''

	@action.bound
	async loadItems() {
		const resp = await SQLite.query(
			`SELECT ${this.select} FROM ${this.table} ${this.join} WHERE ${
				this.where
			}`
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
