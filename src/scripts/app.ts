import Cube from './models/Cube'
import App from './models/App'
import Field from './models/Field'
import Up from './models/Move/Up'
import Down from './models/Move/Down'
import Left from './models/Move/Left'
import Right from './models/Move/Right'

const app = App.getInstance()

document.body.appendChild(app.view as any)

const field = new Field()

app.stage.addChild(field.getDisplayObject())

const cube = new Cube(2)
const cube2 = new Cube(2)
const cube3 = new Cube(3)
const cube4 = new Cube(4)

field.appendCube(cube, 1, 0)
field.appendCube(cube2, 1, 1)
field.appendCube(cube3, 2, 2)
field.appendCube(cube4, 0, 2)

setTimeout(() => {
	const move = new Up()
	field.makeOperation(move)
}, 500)
