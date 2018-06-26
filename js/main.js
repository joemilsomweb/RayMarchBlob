"use strict";

(function(){

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

    //put into another file
    var glHelper = {
    	createProgram : function(){

    	},
    	createPositionBuffer : function(){

    	},
    	compileShader : function(glContext, shaderText, shaderType){
			var shader = glContext.createShader(shaderType);
	  		glContext.shaderSource(shader, shaderText);
	  		glContext.compileShader(shader);

			if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
    			console.error('An error occurred compiling the shaders: ' + glContext.getShaderInfoLog(shader));
    			glContext.deleteShader(shader);
    			return null;
  			}

	  		return shader;
    	},

    	//code from the mdn.
    	loadTexture : function(glContext, src){
    		var texture = glContext.createTexture();
    		glContext.bindTexture(glContext.TEXTURE_2D, texture);

    		var level = 0;
  			var internalFormat = glContext.RGBA;
  			var width = 1;
  			var height = 1;
  			var border = 0;
  			var srcFormat = glContext.RGBA;
  			var srcType = glContext.UNSIGNED_BYTE;

  			var pixel = new Uint8Array([0, 0, 255, 255]);
  			glContext.texImage2D(glContext.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  			var image = new Image();

  			var self = this;

  			image.onload = function(){
				glContext.bindTexture(glContext.TEXTURE_2D, texture);
			    glContext.texImage2D(glContext.TEXTURE_2D, level, internalFormat,
			                  srcFormat, srcType, image);

			    if (self.isPowerOf2(image.width) && self.isPowerOf2(image.height)) {
			       glContext.generateMipmap(glContext.TEXTURE_2D);
			    } else {
			       glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.CLAMP_TO_EDGE);
			       glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_T, glContext.CLAMP_TO_EDGE);
			       glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MIN_FILTER, glContext.LINEAR);
    			}	
  			};

  			image.src = src;

    		return texture;
    	},

    	isPowerOf2 : function(value) {
  			return (value & (value - 1)) == 0;
		},

		createAttributeBuffer : function(glContext, data, numComponents, type, attribPos){
			//create buffer
			var buffer = glContext.createBuffer();
			//bind to an array buffer
  			glContext.bindBuffer(glContext.ARRAY_BUFFER, buffer);
  			//assign data to buffer
  			glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array(data), glContext.STATIC_DRAW);

	 		glContext.enableVertexAttribArray(attribPos);

  			glContext.vertexAttribPointer(
				attribPos,
				numComponents,
				type,
				false,
				0,
				0
			);

  			return buffer;
		}
    };


	function Scene(options){
		this.canvas = options.canvas;
		var gl = this.canvas.getContext("webgl");

	  	var vertShader = glHelper.compileShader(gl, options.vertexShader, gl.VERTEX_SHADER);
	  	var fragShader = glHelper.compileShader(gl, options.fragmentShader, gl.FRAGMENT_SHADER);
	 
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
		var positionBuffer = glHelper.createAttributeBuffer(gl, 
			sqVData.data, 
			sqVData.numComponents, 
			gl[sqVData.type], 
			programInfo.attribLocations.position
			);
		
		//buffer for uvs
		var sqTexData = SHAPE.SQUARE.uv;
		var textureBuffer = glHelper.createAttributeBuffer(
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

  		var texture = glHelper.loadTexture(gl, "images/norm2.jpg");
  		
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

	loadShaders("js/shaders/vertex.glsl", "js/shaders/fragment.glsl", onErr);

})();