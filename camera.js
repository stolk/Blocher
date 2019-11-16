var camera = {};

camera.create = function(a)
{
	var c = {};
	c.pos = vec3.create(a);
	c.coi = vec3.create([0,0,0]);
	return c;
};

camera.trf = function(cam)
{
	var m = mat4.create();
	var x = vec3.create();
	var y = vec3.create();
	var z = vec3.create();
	var up = vec3.create( [0,0,1] );

	//vec3.subtract ( cam.coi, cam.pos, z );
	vec3.subtract ( cam.pos, cam.coi, z );
	vec3.normalize( z, z );
	vec3.cross    ( up, z, x );
	vec3.normalize( x, x );
	vec3.cross    ( z, x, y );
	var p = cam.pos;
	var m = mat4.create(
		[
			x[0],x[1],x[2],0,
			y[0],y[1],y[2],0,
			z[0],z[1],z[2],0,
			p[0],p[1],p[2],1
		]
	);
	return m;
};


