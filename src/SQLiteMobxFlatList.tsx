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
		model.select = select
		model.where = where
		model.join = join
		model.loadItems()
	}, [where])

	return useObserver(() => <FlatList {...rest} data={model.data} />)
}

export default SQLiteMobxFlatList
