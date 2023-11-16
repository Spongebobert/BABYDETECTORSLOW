song = ""
status1 ="";
objects = [];
function preload(){
   song = loadSound("sound.mp3");

}

function setup(){
canvas = createCanvas(380,380);
canvas.center();


video = createCapture(VIDEO)
video.size(380,380)
video.hide()
objectdetector = ml5.objectDetector('cocossd', modelloaded)
 document.getElementById("status").innerHTML = "Status : detecting objects ";
}

function modelloaded(){
    console.log("Model is loaded")
    status1 = true;
   }

function gotResults(error,results){
 if(error){
    console.error(error)
 }
 else{
    console.log(results)
    objects = results;
 }
}

function draw(){
 image(video,0,0,380,380);
 if(status1 != ""){
r = random(255);
g = random(255);
b = random(255);

objectdetector.detect(video,gotResults);

 
   for(i = 0; i < objects.length; i++){
      document.getElementById("numberofobjects").innerHTML = " Number of Objects detected are"+ objects.length +" ";
     fill(r,g,b)
     percent = floor(objects[i].confidence * 100)
     text(objects[i].label + " "+ percent, objects[i].x, objects[i].y);
     noFill()
     stroke(r,g,b)
     rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
     if(objects[i].label == "person"){
      document.getElementById("status").innerHTML = "Status : Baby Detected";
      song.stop()
     }
     else {
      document.getElementById("status").innerHTML = "Status : Baby NOT detected";
      song.play()
     }
   }
   if(objects.length == 0){
      document.getElementById("status").innerHTML = "Status : Baby NOT detected";
      song.play()
   }
}
}

