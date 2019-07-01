import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { Observer } from 'mobx-react-lite';
function SQLiteMobxFlatList(props) {
    const { model, ...rest } = props;
    useEffect(() => {
        model.loadItems();
    }, []);
    return <Observer>{() => <FlatList {...rest} data={model.data}/>}</Observer>;
}
export default SQLiteMobxFlatList;
//# sourceMappingURL=SQLiteMobxFlatList.js.map