var nb_body = 3
var G = 10
var LS = 1
var system

function setup() {
	createCanvas(1200, 800)

	textSize(15);


  	//NBtext = createInput('3');

	Gslider = createSlider(0, 20, 10);
	Gslider.position(60, 10);
	Gslider.style('width', '300px')

  	LSslider = createSlider(0, 10, 1);
	LSslider.position(60, 30);
	LSslider.style('width', '300px')

	system = new System()

	for (var i = 0; i < 3; i++)
	{
		system.add(new Body(this.RandomInt(1000), this.RandomInt(800), randomColor()))
	}

	system.setTupples()

	
	console.log(system.tupples)
}

function RandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
function randomColor() {
	return [RandomInt(255),RandomInt(255),RandomInt(255)]
}

function draw() {
	background(0);

	fill(255)
	strokeWeight(2)

	text('G', 10, 20);
	text('LS', 10, 40);

	system.Step()
	system.Draw()
	system.Gravity()

}

function System() {
	this.bodies = []
	this.tupples = []

	this.setTupples = function() {
		for (var i = 0; i < this.bodies.length; i++) {
			for (var j = 0; j < this.bodies.length; j++) {
				if (i != j && !this.tuppleExist(this.bodies[i], this.bodies[j]))
				{
					this.tupples.push([this.bodies[i], this.bodies[j]])
				}
			}
		}
	}

	this.tuppleExist = function(bodyA, bodyB) {
		let exist = false
		for (var i = 0; i < this.tupples.length; i++) {
			if ((this.tupples[i][0] == bodyA && this.tupples[i][1] == bodyB) || (this.tupples[i][1] == bodyA && this.tupples[i][0] == bodyB)) {
				exist = true
			}
		}
		return exist
	}

	this.Step = function() {
		for (var i = 0; i < this.bodies.length; i++) {
			this.bodies[i].Step()
		}

		for (var i = 0; i < this.tupples.length; i++) {
			this.tupples[i][0].Gravity(this.tupples[i][1])
		}
	}

	this.Draw = function() {

		strokeWeight(3)

		for (var i = 0; i < this.bodies.length; i++) {
			this.bodies[i].Draw()
		}

		for (var i = 0; i < this.tupples.length; i++) {
			stroke(100)
			//line(this.tupples[i][0].x, this.tupples[i][0].y, this.tupples[i][1].x, this.tupples[i][1].y)
		}
	}

	this.Gravity = function() {
	}

	this.add = function(body) {
		this.bodies.push(body)
	}
}

function Body(x, y, color) {
	this.x = x
	this.y = y
	this.size = 10

	this.x_last = x
	this.y_last = y

	this.mass = 0.1
	this.trail = [[this.x, this.y]]

	this.color = color

	this.Step = function() {
		temp_x = this.x
		temp_y = this.y

		this.x = this.x + (this.x - this.x_last)
		this.y = this.y + (this.y - this.y_last)

		this.x_last = temp_x
		this.y_last = temp_y

		this.trail.push([this.x, this.y])
	}

	this.Draw = function() {
		
		fill(this.color)
		stroke(this.color)
		ellipse(this.x, this.y, this.size, this.size);

		for (var i = 0; i < this.trail.length - 1; i++) {
			line(this.trail[i][0],this.trail[i][1],this.trail[i+1][0],this.trail[i+1][1])
		}
	}

	this.Gravity = function(body) {

		let dist_x = abs(body.x - this.x)
		let dist_y = abs(body.y - this.y)
		let dist = sqrt(dist_x^2 + dist_y^2) + 10

		let tempLS = LS * 100000000 // 2,998 * 10e+8
		let tempG = G //6.7 * 10e-11 
		
		// G * (ma * mb)/(r^2)
		let force = tempG * ((body.mass * this.mass) / (dist^2))

		if (force > tempLS) { force = tempLS }

		this.x += ((body.x - this.x) / dist) * force
		this.y += ((body.y - this.y) / dist) * force

		body.x += ((this.x - body.x) / dist) * force
		body.y += ((this.y - body.y) / dist) * force
		
	}
}