var context; // context for drawing on canvas
var redRange; // % of original red pixel value
var greenRange; // % of original green pixel value
var blueRange; // % of original blue pixel value
var alphaRange; // alpha amount value

var image = new Image(); // image object to store loaded image
image.src = "redflowers.png"; // set the image source

function start() 
{
   var canvas = document.getElementById( "thecanvas" );
   context = canvas.getContext("2d")
   context.drawImage(image, 0, 0); // original image  
   context.drawImage(image, 250, 0); // image for user change
   processGrayscale(); // display grayscale of original image

   // configure GUI events
   redRange = document.getElementById( "redRange" );
   redRange.addEventListener( "change", 
      function() { processImage( this.value, greenRange.value, 
         blueRange.value ); }, false );
   greenRange = document.getElementById( "greenRange" );
   greenRange.addEventListener( "change",  
      function() { processImage( redRange.value, this.value, 
         blueRange.value ); }, false )
   blueRange = document.getElementById( "blueRange" );
   blueRange.addEventListener( "change",  
      function() { processImage( redRange.value, 
         greenRange.value, this.value ); }, false )
   alphaRange = document.getElementById( "alphaRange" );
   alphaRange.addEventListener( "change",  
      function() { processAlpha( this.value ); }, false )
   document.getElementById( "resetButton" ).addEventListener(
      "click", resetImage, false );
} // end function start

// sets the alpha value for every pixel
function processAlpha( newValue )
{
   // get the ImageData object representing canvas's content
   var imageData = context.getImageData(0, 0, 250, 250);
   var pixels = imageData.data; // pixel info from ImageData

   // convert every pixel to grayscale
   for ( var i = 3; i < pixels.length; i += 4 )
   {
      pixels[ i ] = newValue;
   } // end for

   context.putImageData( imageData, 250, 0 ); // show grayscale
} // end function processImage

// sets the RGB values for every pixel
function processImage( redPercent, greenPercent, bluePercent )
{
   // get the ImageData object representing canvas's content
   context.drawImage(image, 250, 0);   
   var imageData = context.getImageData(0, 0, 250, 250);
   var pixels = imageData.data; // pixel info from ImageData

   // set percentages of red, green and blue in each pixel 
   for ( var i = 0; i < pixels.length; i += 4 )
   {
      pixels[ i ] *= redPercent / 100; 
      pixels[ i + 1 ] *= greenPercent / 100;
      pixels[ i + 2 ] *= bluePercent / 100;
   } // end for

   context.putImageData( imageData, 250, 0 ); // show grayscale
} // end function processImage

// creates grayscale version of original image
function processGrayscale()
{
   // get the ImageData object representing canvas's content
   context.drawImage(image, 500, 0);   
   var imageData = context.getImageData(0, 0, 250, 250);
   var pixels = imageData.data; // pixel info from ImageData
   
   // convert every pixel to grayscale
   for ( var i = 0; i < pixels.length; i += 4 )
   {
      var average = 
         (pixels[ i ] * 0.30 + pixels[ i + 1 ] * 0.59 + 
         pixels[ i + 2 ] * 0.11).toFixed(0);

      pixels[ i ] = average;
      pixels[ i + 1 ] = average;
      pixels[ i + 2 ] = average;
   } // end for

   context.putImageData( imageData, 500, 0 ); // show grayscale
} // end function processGrayscale

// resets the user manipulated image and the sliders
function resetImage()
{
   context.drawImage(image, 250, 0);   
   redRange.value = 100; 
   greenRange.value = 100; 
   blueRange.value = 100; 
   alphaRange.value = 255; 
} // end function resetImage

window.addEventListener( "load", start, false );