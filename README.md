# Nbody :comet:
![Example image](/nbody.PNG)

## Basis
This is a small project I made to test and train on the physic simulation method of the **Verlet integration**.

You can go [there (https://mlhoutel.github.io/Nbody/) ](https://mlhoutel.github.io/Nbody/) to try it, have fun :wink:
https://mlhoutel.github.io/Nbody/

## Explanations
With the Euler method, you have the positions of the body and the vectors of speed to calculate the positions. With the Verlet integration method, it's way simpler. You don't have to recalculate the vectors of speed, you only have to save the last position and make the difference to compute the next position.

This is an example of the applications with the gravity force :

```javascript
this.Gravity = function(body) {

		let dist_x = abs(body.x - this.x)
		let dist_y = abs(body.y - this.y)
		let dist = sqrt(dist_x^2 + dist_y^2) + 10

		let LS = 100000000 // 2,998 * 10e+8
		let G = 10 //6.7 * 10e-11 
		
		// G * (ma * mb)/(r^2)
		let force = G * ((body.mass * this.mass) / (dist^2))

		if (force > LS) { force = LS }

		this.x += ((body.x - this.x) / dist) * force
		this.y += ((body.y - this.y) / dist) * force

		body.x += ((this.x - body.x) / dist) * force
		body.y += ((this.y - body.y) / dist) * force
		
	}
  ```
