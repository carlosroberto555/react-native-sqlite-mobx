var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, runInAction } from 'mobx';
import SQLite from './SQLite';
export default class SQLiteMobxModel {
    async loadItems() {
        const resp = await SQLite.query(`SELECT * FROM ${this.table} WHERE ${this.where || 1}`);
        runInAction(() => {
            this.data = resp.toArray() || [];
        });
    }
    async setItems(items) {
        await SQLite.truncateTable(this.table);
        await SQLite.insertMany(this.table, items);
        await this.loadItems();
    }
    async addItems(items) {
        await SQLite.insertMany(this.table, items);
        await this.loadItems();
    }
    async addItem(item) {
        await SQLite.insert(this.table, item);
        await this.loadItems();
    }
    async getItem(id) {
        // TODO: implement this
    }
    async editItem(item) {
        // TODO: implement this
    }
    async removeItem(item) {
        await SQLite.query(`DELETE FROM ${this.table} WHERE id = ${item.id}`);
        await this.loadItems();
    }
}
__decorate([
    action
], SQLiteMobxModel.prototype, "loadItems", null);
__decorate([
    action
], SQLiteMobxModel.prototype, "setItems", null);
__decorate([
    action
], SQLiteMobxModel.prototype, "addItems", null);
__decorate([
    action
], SQLiteMobxModel.prototype, "addItem", null);
__decorate([
    action
], SQLiteMobxModel.prototype, "getItem", null);
__decorate([
    action
], SQLiteMobxModel.prototype, "editItem", null);
__decorate([
    action
], SQLiteMobxModel.prototype, "removeItem", null);
//# sourceMappingURL=SQLiteMobxModel.js.map