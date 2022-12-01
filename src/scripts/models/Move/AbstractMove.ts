import Matrix, { MatrixCubeData, MatrixData } from '../Matrix'
import { EventEmitter } from 'events'

export default abstract class AbstractMove extends EventEmitter {
	protected DEFAULT_VALUE = 0
	protected FIRST_PROPERTY: Extract<
		keyof MatrixCubeData,
		'positionX' | 'positionY'
	> = 'positionX'
	protected SECOND_PROPERTY: Extract<
		keyof MatrixCubeData,
		'positionX' | 'positionY'
	> = 'positionY'

	async process(data: MatrixData): Promise<void> {
		for (let i = 0; i < 4; i++) {
			data = this.makeOneMove(data)
			this.emit('data', data)

			await this.wait(100)
		}
		this.emit('end')
	}

	wait(delay: number) {
		return new Promise(resolve => setTimeout(resolve, delay))
	}

	private makeOneMove(data: MatrixData): MatrixData {
		const cubes = this.getCubes(data)
		const columns = this.getColumns(cubes)

		for (const [columnIndex, column] of columns.entries()) {
			for (const [dataIndex, data] of column.entries()) {
				if (data[this.SECOND_PROPERTY] === this.DEFAULT_VALUE) continue

				//Предыдущий в обработке куб, идущий за тем, что мы обрабатываем
				//Нужно проверить, можем ли мы их совместить
				//Или текущий куб остановится перед предыдущим
				const prevCube = this.getPrevCube(
					column,
					data[this.SECOND_PROPERTY]
				)
				if (prevCube) {
					//Если тиры кубов ровны, то совмещаем их
					if (prevCube.cube.tier === data.cube.tier) {
						delete columns[columnIndex][dataIndex]
						prevCube.cube.upTier()
						data[this.SECOND_PROPERTY] = this.getNextPosition(
							data[this.SECOND_PROPERTY]
						)

						data.cube.destroy()
					} else {
						//Если тиры кубов не ровны, то нужно поставить текущий в упор к предыдущему
						data[this.SECOND_PROPERTY] = this.getPrevPosition(
							prevCube[this.SECOND_PROPERTY]
						)
					}
				} else {
					//Если предыдущего куба нет, то помещаем наш куб на один квадрат в нужную сторону
					data[this.SECOND_PROPERTY] = this.getNextPosition(
						data[this.SECOND_PROPERTY]
					)
				}
			}
		}

		return Matrix.createMatrixDataFromCubeDataArray(columns.flat(1))
	}

	protected getCubes(data: MatrixData): MatrixCubeData[] {
		return Matrix.getCubes(data)
	}

	protected getPrevCube(
		column: MatrixCubeData[],
		position: number
	): MatrixCubeData | undefined {
		return column.find(c => c[this.SECOND_PROPERTY] === position - 1)
	}

	protected getPrevPosition(position: number): number {
		return position + 1
	}

	protected getNextPosition(position: number): number {
		return position - 1
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
