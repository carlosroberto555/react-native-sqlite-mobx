import sqlite from 'react-native-sqlite-storage';
import SQLiteTransaction from './SQLiteTransaction';
import SQLiteResultSet from './SQLiteResultSet';
interface TransactionCallback {
    (tx: SQLiteTransaction): void;
}
export default class SQLite {
    protected static db: sqlite.SQLiteDatabase;
    static openDatabase(params: sqlite.DatabaseParams): Promise<void>;
    static query(statement: string, params?: any[]): Promise<SQLiteResultSet>;
    /**
     * TODO: Terminar essa função
     * @param callback
     */
    static transaction(callback: TransactionCallback): Promise<sqlite.Transaction>;
    static truncateTable(table: string): Promise<SQLiteResultSet>;
    static insert(table: string, item: object): Promise<SQLiteResultSet>;
    static insertOrReplace(table: string, item: object): Promise<SQLiteResultSet>;
    static insertMany(table: string, items: object[]): Promise<SQLiteResultSet | undefined>;
}
export {};
