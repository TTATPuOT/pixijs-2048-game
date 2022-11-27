import { MatrixCubeData } from '../Matrix'
import AbstractReverseMove from './AbstractReverseMove'

export default class Down extends AbstractReverseMove {
	protected DEFAULT_VALUE = 3
	protected FIRST_PROPERTY: Extract<
		keyof MatrixCubeData,
		'positionX' | 'positionY'
	> = 'positionY'
	protected SECOND_PROPERTY: Extract<
		keyof MatrixCubeData,
		'positionX' | 'positionY'
	> = 'positionX'
}
