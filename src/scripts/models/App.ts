import * as PIXI from 'pixi.js'

export default class App {
    static app: PIXI.Application

    static getInstance(): PIXI.Application {
        if (!this.app) {
            this.app = new PIXI.Application({ background: 'pink' })
        }

        return this.app
    }
}
