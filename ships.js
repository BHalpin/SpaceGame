//Add planet function
function addPlanet(inX,inY,inZ, inPhong, inScalingFactor, inTexture, rotX, rotY, rotZ, moonScale){
	let retObj = scene.add();
	let newObj = retObj.add();
	//newObj.add(sphere, inPhong).identity().translate(inX, inY, inZ).scale(inScalingFactor);
	newObj.add(sphere, inPhong).identity();
	if(inTexture){
		newObj.children[0].textureSrc = inTexture;
		newObj.children[0].phong = phong([.1,.1,.1], [.5,.5,.5], [1,1,1], 20);
	}
	if(rotX){
		newObj.children[0].rotateX(rotX);
	}
	if(rotY){
		newObj.children[0].rotateY(rotY);
	}
	if(rotZ){
		newObj.children[0].rotateZ(rotZ);
	}
	if(moonScale && moonScale > 0){
		newObj.add(sphere, inPhong).scale(moonScale);
	}
	//newObj.children[newObj.children.length - 1].textureSrc = "planetOne.jpg";
	//newObj.add(cube, clear).identity().scale(1);
	newObj.add(cube, inPhong);
	newObj.children[newObj.children.length - 1].seeThrough = true;
	retObj.identity().translate(inX, inY, inZ).scale(inScalingFactor);
	return retObj;
	//let newPlanet = scene.add(sphere, inPhong).identity().translate(inX,inY,inZ).scale(inScalingFactor);
}

function createShipHumanCruiser(inX,inY,inZ, inPhong, inScalingFactor){
	//Create the parent object
	//let newObj = scene.add();
	let retObj = scene.add();
	let newObj = retObj.add();
	newObj.add(cube, inPhong);

	//Set up scaling factors
	let updatedScaleBody = [0.55,0.25,0.12];
	let updatedScaleBackCyl = [1.26,1.26,0.5];
	let updatedScaleGunBarrelOne = [.45,.45,.35];
	let updatedScaleGunBarrelTwo = [.3,.3,.35];
	let updatedScaleSuperstructurePartOne = [0.4,0.4,0.4];
	let updatedMissileBattery = [0.2,0.4,0.4];
	let updatedBoundingBox = [3,2,1.26];
	
	//Create the body
	newObj.identity().translate(inX, inY, inZ).scale(updatedScaleBody);

	//Create the cylindrical body section
	newObj.add(cylinder, inPhong).identity().rotateY(Math.PI/2).translate(0,0,1.46).scale(updatedScaleBackCyl);

	//Add front gun barrels
	newObj.add(cylinder, inPhong)
	.identity()
	.rotateY(Math.PI/2)
	.translate(0,0.25,-1.35)
	.scale(updatedScaleGunBarrelOne);
	newObj.add(cylinder, inPhong).identity()
	.rotateY(Math.PI/2)
	.translate(0,-0.6,-1.35)
	.scale(updatedScaleGunBarrelTwo);

	//Add bridge section
	newObj.add(cube, inPhong).identity().translate(0.7,1,0).scale(updatedScaleSuperstructurePartOne);
	
	//Add booster
	newObj.add(myTack, inPhong).identity().rotateY(Math.PI/2).translate(0,0,1.9);

	//Add the missile battery section (essentially the same as the bridge but farther back)
	newObj.add(cube, inPhong).identity().translate(1.5,0.9,0).scale(updatedMissileBattery);

	//Bounding box
	newObj.add(cube, inPhong).identity().scale(updatedBoundingBox);
	newObj.children[7].seeThrough = true;

	//Scale the entire ship appropriately
	newObj.scale(inScalingFactor);

	return retObj;
}

let createTestShape = function() {
   let a = 1, b = 1, c = 1,
       A  = .5, B = .1, C = .2;

   testProfile = sampleBezierPath(
      [a,b,  -.1,-.1,-.1,  .1,.1,.1,  b,a,c, c,a],
      [A,B,  B,A,C, -C,-A,-B,  -B,-A,-C, C,A],
      [0,0,0,0],
      20);
   return extrude(testProfile, createCircularPath(50));
}

let createBooster = function() {
   let a = .1, b = .4, c = 0.1,
       A  = .8, B = .5, C = 0.1;

   ringProfile = sampleBezierPath(
      [a,b,  0,0,0,  0,0,0,  b,a,c, c,a],
      [A,B,  B,A,C, -C,-A,-B,  -B,-A,-C, C,A],
      [0,0,0,0],
      20);
   return extrude(ringProfile, createCircularPath(50));
}

let myTack = createTriangleMesh(uvToLathe, 30, 30,
   [
      [0.5,.1, .1,1,.5, .5,.5], // r
      [0.2,0.1, 0.1,1,0, 0,0]     // z
   ]
);

const randomNamesOfPlanets = [
"Thor",
"Odin",
"Baldur",
"Loki",
"Huginn",
"Muninn",
"Zeus",
"Minerva",
"Berlina",
"Perlinus"
];
/*
Good booster values
[0.5,.1, .1,1,.5, .5,.5],
[0,0, 0,.8,.85, .4,0] More unique shape

[0.5,.1, .1,1,.5, .5,.5], // r
      [0.2,0.1, 0.1,1,0, 0,0] - More conical 
*/

/*
function createShipHumanCruiser(inX,inY,inZ, inPhong, inScalingFactor){
	//Create the parent object
	let newObj = scene.add(cube, inPhong);

	//Set up scaling factors
	let updatedScaleBody = [0.55,0.25,0.12];
	let updatedScaleBackCyl = [1.26,1.26,0.5];
	let updatedScaleGunBarrelOne = [.45,.45,.35];
	let updatedScaleGunBarrelTwo = [.3,.3,.35];
	let updatedScaleSuperstructurePartOne = [0.4,0.4,0.4];
	let updatedMissileBattery = [0.2,0.4,0.4];
	
	//Create the body
	newObj.identity().translate(inX, inY, inZ).scale(updatedScaleBody);

	//Create the cylindrical body section
	newObj.add(cylinder, inPhong).identity().rotateY(Math.PI/2).translate(0,0,1.46).scale(updatedScaleBackCyl);

	//Add front gun barrels
	newObj.add(cylinder, inPhong)
	.identity()
	.rotateY(Math.PI/2)
	.translate(0,0.25,-1.35)
	.scale(updatedScaleGunBarrelOne);
	newObj.add(cylinder, inPhong).identity()
	.rotateY(Math.PI/2)
	.translate(0,-0.6,-1.35)
	.scale(updatedScaleGunBarrelTwo);

	//Add bridge section
	newObj.add(cube, inPhong).identity().translate(0.7,1,0).scale(updatedScaleSuperstructurePartOne);
	
	//Add booster
	newObj.add(myTack, steel).identity().rotateY(Math.PI/2).translate(0,0,1.9);

	//Add the missile battery section (essentially the same as the bridge but farther back)
	newObj.add(cube, inPhong).identity().translate(1.5,0.9,0).scale(updatedMissileBattery);

	//Scale the entire ship appropriately
	newObj.scale(inScalingFactor);

	
	return newObj;
}
*/