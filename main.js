Webcam.set({
    width:350,
    height:350,
    image_format:'jpeg',
    jpeg_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
prediction_1="";
prediction_2="";

function snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/y1oJDaWuZ/model.json',modelLoaded);

function modelLoaded()
{
    console.log("modelLoded");
}

function speak()
{
    var synth=window.speechSynthesis;
    speak_data1="The First Prediction is :"+prediction_1;
    speak_data2="The Second Prediction is :"+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterthis);
}
function check()
{
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_name").innerHTML=results[0].label;
        document.getElementById("result_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

        if(results[0].label=="Victory")
        {
            document.getElementById("result_emoji").innerHTML="&#9996;";
        }
        if(results[0].label=="Best")
        {
            document.getElementById("result_emoji").innerHTML="&#128076;";
        }
        if(results[0].label=="Amazing")
        {
            document.getElementById("result_emoji").innerHTML="&#128077;";
        }
        if(results[1].label=="Victory")
        {
            document.getElementById("result_emoji2").innerHTML="&#9996;";
        }
        if(results[1].label=="Best")
        {
            document.getElementById("result_emoji2").innerHTML="&#128076;";
        }
        if(results[1].label=="Amazing")
        {
            document.getElementById("result_emoji2").innerHTML="&#128077;";
        }
    }
}