status = "";
thing = document.getElementById("object").value;
objects = [];

function preload()
{

}

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(350, 350);
    video.hide();
}

function find()
{
    objectdetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
  console.log("Coco Ssd is loaded!!");
  status = "true";
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video,0,0 ,480,380);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);

        for(i = 0; i< objects.length; i++)
        {
         document.getElementById("status").innerHTML = "Status: Objects Detected";
         document.getElementById("detected_objects").innerHTML = "Objects detected are - " + objects;
         fill("#FF0000");
         percentage = floor(objects[i].confidence*100);
         text(objects[i].label + " "+percentage+"%", objects[i].x + 15 , objects[i].y + 15);
         noFill();
         stroke("#FF0000"); 
         rect(objects[i].y, objects[i].x, objects[i].width, objects[i].height);
        }
    }
}