
var system

function setup() {
	createCanvas(1200, 800)
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
		for (var i = 0; i < this.bodies.length; i++) {
			this.bodies[i].Draw()
		}

		for (var i = 0; i < this.tupples.length; i++) {
			stroke(100)
			strokeWeight(3)
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

		// G * (ma * mb)/(r^2)
		// force = 9.81 * ((body.mass * this.mass) / (dist^2))
		
		// force = 6.673 * 10e-11 * body.mass * this.mass * dist / dist^3
		let LS = 100000000
		let G = 10 //6.7 * 10e-11 
		force = G * ((body.mass * this.mass) / (dist^2))

		if (force > LS) { force = LS }

		this.x += ((body.x - this.x) / dist) * force
		this.y += ((body.y - this.y) / dist) * force

		body.x += ((this.x - body.x) / dist) * force
		body.y += ((this.y - body.y) / dist) * force
		
	}
}