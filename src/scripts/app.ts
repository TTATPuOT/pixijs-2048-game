import * as PIXI from 'pixi.js'

const app = new PIXI.Application({ background: 'pink' })

document.body.appendChild(app.view as any)

const basicText = new PIXI.Text('New project on pixi.js')
basicText.x = 20
basicText.y = 20

app.stage.addChild(basicText)
