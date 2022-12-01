import Cube from './Cube'
import AbstractMove from './Move/AbstractMove'

type MatrixDataCubeOrNull = Cube | null
export type MatrixData = [
	[
		MatrixDataCubeOrNull,
		MatrixDataCubeOrNull,
		MatrixDataCubeOrNull,
		MatrixDataCubeOrNull
	],
	[
		MatrixDataCubeOrNull,
		MatrixDataCubeOrNull,
		MatrixDataCubeOrNull,
		MatrixDataCubeOrNull
	],
	[
		MatrixDataCubeOrNull,
		MatrixDataCubeOrNull,
		MatrixDataCubeOrNull,
		MatrixDataCubeOrNull
	],
	[
		MatrixDataCubeOrNull,
		MatrixDataCubeOrNull,
		MatrixDataCubeOrNull,
		MatrixDataCubeOrNull
	]
]

export interface MatrixCubeData {
	cube: Cube
	positionX: number
	positionY: number
}

export default class Matrix {
	private data: MatrixData
	private prevData: MatrixData
	public isLocked: boolean

	constructor() {
		this.data = Matrix.createData()
		this.prevData = Matrix.createData()
		this.isLocked = false
	}

	static createData(): MatrixData {
		return [
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null],
		]
	}

	appendCube(cube: Cube, positionX: number, positionY: number) {
		if (
			this.data[positionY] === undefined ||
			this.data[positionY][positionX] === undefined
		)
			return

		this.prevData = [
			[...this.data[0]],
			[...this.data[1]],
			[...this.data[2]],
			[...this.data[3]],
		]
		this.data[positionY][positionX] = cube
	}

	getCubes(prev: boolean = false): MatrixCubeData[] {
		return Matrix.getCubes(prev ? this.prevData : this.data)
	}

	static getCubes(data: MatrixData): MatrixCubeData[] {
		const result: MatrixCubeData[] = []

		for (const [positionY, row] of data.entries()) {
			for (const [positionX, cube] of row.entries()) {
				if (!cube) continue

				result.push({
					cube,
					positionX,
					positionY,
				})
			}
		}

		return result
	}

	static createMatrixDataFromCubeDataArray(array: MatrixCubeData[]) {
		const data = Matrix.createData()

		for (const i of array) {
			data[i.positionY][i.positionX] = i.cube
		}

		return data
	}

	makeOperation(operation: AbstractMove) {
		this.isLocked = true

		operation.on('data', (data: MatrixData) => {
			console.log('new data event', data)
			this.data = data
		})

		operation.process(this.data).then()

		operation.once('end', () => {
			this.isLocked = false
		})
	}
}
