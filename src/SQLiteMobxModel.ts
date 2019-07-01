import { action, runInAction } from 'mobx'
import SQLite from './SQLite'

export default abstract class SQLiteMobxModel<T extends { id: number }> {
	abstract table: string
	abstract data: T[]
	abstract where?: string

	@action
	async loadItems() {
		const resp = await SQLite.query(
			`SELECT * FROM ${this.table} WHERE ${this.where || 1}`
		)
		runInAction(() => {
			this.data = resp.toArray() || []
		})
	}

	@action
	async setItems(items: T[]) {
		await SQLite.truncateTable(this.table)
		await SQLite.insertMany(this.table, items)
		await this.loadItems()
	}

	@action
	async addItems(items: T[]) {
		await SQLite.insertMany(this.table, items)
		await this.loadItems()
	}

	@action
	async addItem(item: T) {
		await SQLite.insert(this.table, item)
		await this.loadItems()
	}

	@action
	async getItem(id: number) {
		// TODO: implement this
	}

	@action
	async editItem(item: T) {
		// TODO: implement this
	}

	@action
	async removeItem(item: T) {
		await SQLite.query(`DELETE FROM ${this.table} WHERE id = ${item.id}`)
		await this.loadItems()
	}
}
