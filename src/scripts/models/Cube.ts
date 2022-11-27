import * as PIXI from 'pixi.js'
import App from './App'
import cube from '../configs/cube'

type CubeTier = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export default class Cube {
	object: PIXI.Sprite
	tier: CubeTier

	constructor(tier: CubeTier = 1) {
		this.tier = tier

		this.createAndSetSprite()
		//App.getInstance().ticker.add(delta => (this.object.x += 0.1 * delta))
	}

	createAndSetSprite() {
		if (this.object) this.object.destroy()

		const texture = this.createTexture()
		this.object = new PIXI.Sprite(texture as any)

		this.object.x = -100
		this.object.y = -100

		App.getInstance().stage.addChild(this.object)
	}

	createTexture(): PIXI.Resource {
		const graphics = new PIXI.Graphics()

		graphics.beginFill(cube.colors[this.tier])
		graphics.drawRoundedRect(0, 0, cube.width, cube.height, cube.radius)
		graphics.endFill()

		const text = new PIXI.Text(Math.pow(2, this.tier))
		text.anchor.set(0.5)
		text.x = 50
		text.y = 50
		graphics.addChild(text)

		return App.getInstance().renderer.generateTexture(graphics) as any
	}

	setX(x: number) {
		this.object.x = x
	}

	setY(y: number) {
		this.object.y = y
	}

	upTier() {
		this.tier++
		console.log('Tier up! Now is', this.tier)

		this.createAndSetSprite()
	}

	destroy() {
		this.object.destroy()
	}

	getDisplayObject(): PIXI.Sprite {
		return this.object
	}
}
