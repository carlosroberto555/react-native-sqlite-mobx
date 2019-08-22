import React, { useEffect } from 'react'
import { FlatList, FlatListProps } from 'react-native'
import { useObserver } from 'mobx-react-lite'

import SQLiteMobxModel from './SQLiteMobxModel'

interface Props<T extends { id: number }>
	extends Omit<FlatListProps<T>, 'data'> {
	model: SQLiteMobxModel<T>
	select?: string
	where?: string
	join?: string
}

function SQLiteMobxFlatList(props: Props<any>) {
	const { model, select, where, join, ...rest } = props

	useEffect(() => {
		model.loadItems({ select, join, where })
		return () => model.clear()
	}, [select, join, where])

	return useObserver(() => <FlatList {...rest} data={model.data} />)
}

export default SQLiteMobxFlatList
