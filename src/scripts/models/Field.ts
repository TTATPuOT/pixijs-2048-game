import * as PIXI from 'pixi.js'
import cubeConfig from '../configs/cube'
import fieldConfig from '../configs/field'
import Matrix, { MatrixCubeData } from './Matrix'
import Cube from './Cube'
import App from './App'
import AbstractMove from './Move/AbstractMove'

export default class Field {
	object: PIXI.Graphics
	matrix: Matrix

	constructor() {
		this.matrix = new Matrix()
		this.object = new PIXI.Graphics()

		this.object.beginFill(0xb8ad9f)
		this.object.drawRoundedRect(
			0,
			0,
			cubeConfig.width * 4 + fieldConfig.cubeGap * 5,
			cubeConfig.height * 4 + fieldConfig.cubeGap * 5,
			cubeConfig.radius
		)
		this.object.endFill()

		for (let row = 0; row < 4; row++) {
			for (let column = 0; column < 4; column++) {
				const graphics = new PIXI.Graphics()

				graphics.beginFill(0xcdbfb1)
				graphics.drawRoundedRect(
					cubeConfig.width * column +
						fieldConfig.cubeGap * (column + 1),
					cubeConfig.height * row + fieldConfig.cubeGap * (row + 1),
					cubeConfig.width,
					cubeConfig.height,
					cubeConfig.radius
				)
				graphics.endFill()
				this.object.addChild(graphics)
			}
		}

		App.getInstance().ticker.add(() => {
			for (const data of this.matrix.getCubes()) {
				this.renderCube(data)
			}
		})
	}

	private renderCube(cubeData: MatrixCubeData) {
		const { cube, positionY, positionX } = cubeData

		cube.setX(
			cubeConfig.width * positionX + fieldConfig.cubeGap * (positionX + 1)
		)
		cube.setY(
			cubeConfig.height * positionY +
				fieldConfig.cubeGap * (positionY + 1)
		)
	}

	makeOperation(operation: AbstractMove) {
		this.matrix.makeOperation(operation)
		console.log('Field cubes updated:', this.matrix.getCubes())
	}

	appendCube(cube: Cube, positionX: number, positionY: number) {
		this.matrix.appendCube(cube, positionX, positionY)
		console.log('Field cubes updated:', this.matrix.getCubes())
	}

	getDisplayObject(): PIXI.Graphics {
		return this.object
	}
}
