import { MatrixCubeData } from '../Matrix'
import AbstractMove from './AbstractMove'

export default class Left extends AbstractMove {
	protected FIRST_PROPERTY: Extract<
		keyof MatrixCubeData,
		'positionX' | 'positionY'
	> = 'positionY'
	protected SECOND_PROPERTY: Extract<
		keyof MatrixCubeData,
		'positionX' | 'positionY'
	> = 'positionX'
}
