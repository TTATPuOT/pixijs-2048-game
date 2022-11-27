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

	constructor() {
		this.data = Matrix.createData()
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

		this.data[positionY][positionX] = cube
	}

	getCubes(): MatrixCubeData[] {
		return Matrix.getCubes(this.data)
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
		this.data = operation.process(this.data)
	}
}
