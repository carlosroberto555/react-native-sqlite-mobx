import React, { useEffect } from 'react'
import { FlatList, FlatListProps } from 'react-native'
import { useObserver } from 'mobx-react-lite'

import SQLiteMobxModel from './SQLiteMobxModel'

// @ts-ignore
interface Props<T extends { id: number }> extends FlatListProps<T> {
	model: SQLiteMobxModel<T>
	data?: undefined
	where?: string
}

function SQLiteMobxFlatList(props: Props<any>) {
	const { model, where, ...rest } = props

	useEffect(() => {
		model.where = where
		model.loadItems()
	}, [where])

	return useObserver(() => <FlatList {...rest} data={model.data} />)
}

export default SQLiteMobxFlatList
