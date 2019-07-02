import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { Observer } from 'mobx-react-lite';
function SQLiteMobxFlatList(props) {
    const { model, where, ...rest } = props;
    useEffect(() => {
        model.where = where;
        model.loadItems();
    }, [where]);
    return (<Observer>
			{() => (<FlatList {...rest} data={model.data} initialNumToRender={model.data.length}/>)}
		</Observer>);
}
export default SQLiteMobxFlatList;
//# sourceMappingURL=SQLiteMobxFlatList.js.map