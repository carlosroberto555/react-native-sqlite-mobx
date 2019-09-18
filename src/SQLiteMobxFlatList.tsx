import React, { useEffect } from 'react'
import { FlatList, FlatListProps } from 'react-native'
import { useObserver } from 'mobx-react-lite'

import SQLiteMobxModel from './SQLiteMobxModel'

interface SQLiteMobxFlatListProps<T extends { id: number }>
	extends Omit<FlatListProps<T>, 'data'> {
	model: SQLiteMobxModel<T>
	autofetch?: boolean
	select?: string
	where?: string
	join?: string
}

function SQLiteMobxFlatList(props: SQLiteMobxFlatListProps<any>) {
	const { model, select, where, join, autofetch = true, ...rest } = props

	if (autofetch) {
		useEffect(() => {
			model.loadItems({ select, join, where })
			return () => model.clear()
		}, [select, join, where])
	}

	return useObserver(() => <FlatList {...rest} data={model.data} />)
}

export { SQLiteMobxFlatListProps }
export default SQLiteMobxFlatList
