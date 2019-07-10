import React, { useEffect } from 'react'
import { FlatList, FlatListProps } from 'react-native'
import { useObserver } from 'mobx-react-lite'

import SQLiteMobxModel from './SQLiteMobxModel'

// @ts-ignore
interface Props<T extends { id: number }> extends FlatListProps<T> {
	model: SQLiteMobxModel<T>
	data?: undefined
	select?: string
	where?: string
	join?: string
}

function SQLiteMobxFlatList(props: Props<any>) {
	const { model, select, where, join, ...rest } = props

	useEffect(() => {
		model.loadItems({ select, join, where })
	}, [where])

	return useObserver(() => <FlatList {...rest} data={model.data} />)
}

export default SQLiteMobxFlatList
