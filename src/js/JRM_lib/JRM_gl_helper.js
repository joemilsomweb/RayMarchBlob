//utility class to handle webgl boilerplate
const GlHelper = {

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

export default GlHelper;