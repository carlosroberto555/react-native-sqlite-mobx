import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import SQLiteMobxFlatList from '../src/SQLiteMobxFlatList'
import SQLiteMobxModel from '../src/SQLiteMobxModel'

type ModelDataType = {
	id: number
}

class ModelTest extends SQLiteMobxModel<ModelDataType> {
	data: ModelDataType[] = []
	table: string = 'test'
}

describe('test SQLiteMobxFlatList', () => {
	const modelTest = new ModelTest()

	test('renders correctly', () => {
		const tree = renderer.create(
			<SQLiteMobxFlatList model={modelTest} renderItem={() => null} />
		)
		expect(tree).toMatchSnapshot()
		tree.unmount()
	})

	test('loadItems called on start', () => {
		expect(modelTest.loadItems).toBeCalledTimes(1)
	})

	test('clear called on finish', () => {
		expect(modelTest.clear).toBeCalledTimes(1)
	})
})
