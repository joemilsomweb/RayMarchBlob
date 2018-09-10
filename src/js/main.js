import JRM_glHelper from "JRM_lib/JRM_gl_helper";

function loadData(path, success, error)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				if (success)
					success(xhr.responseText);
			} else {
				if (error)
					error(xhr);
			}
		}
	}
	xhr.open("GET", path, true);
	xhr.send();
}



function onErr(error){
	console.error("Error loading shader ", error);
}

function loadShaders(vertexPath, fragmentPath, error){
	var vertexShader;
	var fragmentShader;

	var onVertexLoadSuccess = function(result){
		vertexShader = result;
		loadData(fragmentPath, onFragmentLoadSuccess, error);
	}

	var onFragmentLoadSuccess = function(result){
		fragmentShader = result;
		init(vertexShader, fragmentShader);
	}

	loadData(vertexPath, onVertexLoadSuccess, error);
}

function init(vertexShader, fragmentShader){
	var scene = new Scene({
		vertexShader : vertexShader,
		fragmentShader : fragmentShader,
		canvas : document.getElementById("raymarchCanvas")
	});

	scene.render(0);
}



var SHAPE = {
	SQUARE : {
		vertices : {
			numComponents : 2,
			data : [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0],
			type : "FLOAT"
		},
		uv : {
			numComponents : 2,
			data : [1.0, 1.0, 0, 1.0, 1.0, 0, 0, 0],
			type : "FLOAT"
		}
	}
};

function Scene(options){
	this.canvas = options.canvas;
	var gl = this.canvas.getContext("webgl");

	var vertShader = JRM_glHelper.compileShader(gl, options.vertexShader, gl.VERTEX_SHADER);
	var fragShader = JRM_glHelper.compileShader(gl, options.fragmentShader, gl.FRAGMENT_SHADER);

	  	//create the program to use the shaders
	  	var program = gl.createProgram();
	  	gl.attachShader(program, vertShader);
	  	gl.attachShader(program, fragShader);
	  	gl.linkProgram(program);
	  	gl.useProgram(program);

	  	gl.clearColor(0, 0, 0, 1);
	  	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	  	var programInfo = {
	  		program: program,
	  		attribLocations: {
	  			position: gl.getAttribLocation(program, 'position'),
	  			uv: gl.getAttribLocation(program, 'uv')
	  		},
	  		uniformLocations: {
	  			time: gl.getUniformLocation(program, 'iTime'),
	  			resolution: gl.getUniformLocation(program, 'iResolution'),
	  			mouse: gl.getUniformLocation(program, 'iMouse'),
	  			mainTex: gl.getUniformLocation(program, 'texture')
	  		}
	  	};


		//create buffer for square
		var sqVData = SHAPE.SQUARE.vertices;
		var positionBuffer = JRM_glHelper.createAttributeBuffer(gl, 
			sqVData.data, 
			sqVData.numComponents, 
			gl[sqVData.type], 
			programInfo.attribLocations.position
			);
		
		//buffer for uvs
		var sqTexData = SHAPE.SQUARE.uv;
		var textureBuffer = JRM_glHelper.createAttributeBuffer(
			gl, 
			sqVData.data, 
			sqVData.numComponents, 
			gl[sqVData.type], 
			programInfo.attribLocations.uv);

		gl.enable(gl.DEPTH_TEST);          
		gl.depthFunc(gl.LEQUAL); 

		gl.enableVertexAttribArray(programInfo.attribLocations.position);
		gl.enableVertexAttribArray(programInfo.attribLocations.uv);
		gl.useProgram(programInfo.program);

		var texture = JRM_glHelper.loadTexture(gl, "images/norm2.jpg");

		var self = this;

		this.render = function(time) {
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			//set uniforms
			gl.uniform1f(programInfo.uniformLocations.time, time/1000.);
			gl.uniform2fv(programInfo.uniformLocations.resolution, [self.canvas.width, self.canvas.height]);
			gl.uniform4fv(programInfo.uniformLocations.mouse, [0, 0, 0, 0]);
			gl.uniform1i(programInfo.uniformLocations.texture, 0);
			
			//quite cool, dont need to set all the vertices!!
			var offset = 0;
			var vertexCount = 4;
			gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);

			requestAnimationFrame(self.render);
		}
	}

loadShaders("shaders/vertex.glsl", "shaders/fragment.glsl", onErr);
