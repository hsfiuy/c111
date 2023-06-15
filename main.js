Webcam.set({
    width:350, height:300, image_format:'png', png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src = "' + data_uri + '"/>';
    });
}
console.log("ml5 version : ", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/D3j5r49ly/model.json', modelLoaded);

function modelLoaded(){
    console.log('MODEL LOADED!!!!!!!!!!!!!!!!!!!');
}

function check(){  
    img= document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
    
    document.getElementById("result_object_name").innerHTML=results[0].label;
    gesture = results[0].label;
    toSpeak="";
    if(gesture == "thumb"){
        toSpeak="this is a thumb";
        document.getElementById("result_object_gesture_icon").innerHTML="👍";
    }
    else if(gesture == "ok"){
        toSpeak="this is a ok";
        document.getElementById("result_object_gesture_icon").innerHTML="👌"; 
    }
    else if(gesture == "hand"){
        toSpeak="this is a hand";
        document.getElementById("result_object_gesture_icon").innerHTML="✋"; 
    }
    else if(gesture == "fist thign"){
        toSpeak="this is a fist";
        document.getElementById("result_object_gesture_icon").innerHTML="👊"; 
    }
    else if(gesture == "o"){
        toSpeak="this is a o";
        document.getElementById("result_object_gesture_icon").innerHTML="⭕"; 
    }
    speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
