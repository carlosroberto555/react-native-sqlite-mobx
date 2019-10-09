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

const modelTest = new ModelTest()

test('SQLiteMobxFlatList renders correctly', () => {
	const tree = renderer.create(
		<SQLiteMobxFlatList model={modelTest} renderItem={() => null} />
	)

	expect(tree).toMatchSnapshot()
})
