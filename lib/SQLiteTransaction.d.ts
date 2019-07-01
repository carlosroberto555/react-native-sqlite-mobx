import { Transaction } from 'react-native-sqlite-storage';
import SQLiteResultSet from './SQLiteResultSet';
export default class SQLiteTransaction {
    transaction: Transaction;
    constructor(tx: Transaction);
    query(statement: string, params?: any[]): Promise<SQLiteResultSet>;
}
