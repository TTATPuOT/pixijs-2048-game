import AbstractMove from './AbstractMove'
import Matrix, { MatrixCubeData, MatrixData } from '../Matrix'

export default abstract class AbstractReverseMove extends AbstractMove {
	protected getCubes(data: MatrixData): MatrixCubeData[] {
		return Matrix.getCubes(data).reverse()
	}

	protected getPrevCube(
		column: MatrixCubeData[],
		positionY: number
	): MatrixCubeData | undefined {
		return column.find(c => c.positionY > positionY)
	}

	protected getPrevPosition(positionY: number): number {
		return positionY - 1
	}

	protected getNextPosition(position: number): number {
		return position + 1
	}
}
