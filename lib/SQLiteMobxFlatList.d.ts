/// <reference types="react" />
import { FlatListProps } from 'react-native';
import SQLiteMobxModel from './SQLiteMobxModel';
interface Props<T extends {
    id: number;
}> extends FlatListProps<T> {
    model: SQLiteMobxModel<T>;
    data?: undefined;
}
declare function SQLiteMobxFlatList(props: Props<any>): JSX.Element;
export default SQLiteMobxFlatList;
