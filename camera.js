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


camera.drag = function(cam, dx, dy)
{
	var delta = vec3.create();
	vec3.subtract( cam.pos, cam.coi, delta );
	var l = vec3.length( delta );
	var trf = camera.trf( cam );
	var camx = vec3.create( [ trf[0], trf[1], trf[2] ] );
	var camy = vec3.create( [ trf[4], trf[5], trf[6] ] );
	var movementx = vec3.create();
	var movementy = vec3.create();
	vec3.scale( camx, -dx, movementx );
	vec3.scale( camy,  dy, movementy );
	vec3.add( cam.pos, movementx, cam.pos );
	vec3.add( cam.pos, movementy, cam.pos );
	vec3.subtract( cam.pos, cam.coi, delta );
	var tocam = vec3.create();
	vec3.normalize( delta, tocam );
	vec3.scale( tocam, l );
	vec3.add( cam.coi, tocam, cam.pos );
}

