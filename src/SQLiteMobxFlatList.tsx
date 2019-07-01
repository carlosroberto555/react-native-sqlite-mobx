import React, { useEffect } from 'react'
import { FlatList, FlatListProps } from 'react-native'
import { Observer } from 'mobx-react-lite'

import SQLiteMobxModel from './SQLiteMobxModel'

// @ts-ignore
interface Props<T extends { id: number }> extends FlatListProps<T> {
	model: SQLiteMobxModel<T>
	data?: undefined
}

function SQLiteMobxFlatList(props: Props<any>) {
	const { model, ...rest } = props

	useEffect(() => {
		model.loadItems()
	}, [])

	return <Observer>{() => <FlatList {...rest} data={model.data} />}</Observer>
}

export default SQLiteMobxFlatList
