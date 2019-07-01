import { ResultSet, ResultSetRowList } from 'react-native-sqlite-storage';
export default class SQLiteResultSet implements ResultSet {
    insertId: number;
    rowsAffected: number;
    rows: ResultSetRowList;
    constructor(result: ResultSet);
    data(): IterableIterator<any>;
    toArray(): any[];
}
