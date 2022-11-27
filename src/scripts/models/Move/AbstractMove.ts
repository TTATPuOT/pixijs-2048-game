import Matrix, { MatrixCubeData, MatrixData } from '../Matrix'

export default abstract class AbstractMove {
	protected DEFAULT_VALUE = 0
	protected FIRST_PROPERTY: Extract<
		keyof MatrixCubeData,
		'positionX' | 'positionY'
	> = 'positionX'
	protected SECOND_PROPERTY: Extract<
		keyof MatrixCubeData,
		'positionX' | 'positionY'
	> = 'positionY'

	protected getCubes(data: MatrixData): MatrixCubeData[] {
		return Matrix.getCubes(data)
	}

	protected getPrevCube(
		column: MatrixCubeData[],
		position: number
	): MatrixCubeData | undefined {
		return column.find(c => c[this.SECOND_PROPERTY] < position)
	}

	protected getPrevPosition(position: number): number {
		return position + 1
	}

	process(data: MatrixData): MatrixData {
		const cubes = this.getCubes(data)
		const columns = this.getColumns(cubes)

		for (const [columnIndex, column] of columns.entries()) {
			for (const [dataIndex, data] of column.entries()) {
				if (data[this.SECOND_PROPERTY] === this.DEFAULT_VALUE) continue

				const prevCube = this.getPrevCube(
					column,
					data[this.SECOND_PROPERTY]
				)
				if (prevCube) {
					if (prevCube.cube.tier === data.cube.tier) {
						data.cube.destroy()
						delete columns[columnIndex][dataIndex]
						prevCube.cube.upTier()
					} else {
						data[this.SECOND_PROPERTY] = this.getPrevPosition(
							prevCube[this.SECOND_PROPERTY]
						)
					}
				} else {
					data[this.SECOND_PROPERTY] = this.DEFAULT_VALUE
				}
			}
		}

		return Matrix.createMatrixDataFromCubeDataArray(columns.flat(1))
	}

	private getColumns(cubes: MatrixCubeData[]): MatrixCubeData[][] {
		const columns: MatrixCubeData[][] = []
		for (const cube of cubes) {
			if (!columns[cube[this.FIRST_PROPERTY]])
				columns[cube[this.FIRST_PROPERTY]] = []

			columns[cube[this.FIRST_PROPERTY]].push(cube)
		}

		return columns
	}
}
