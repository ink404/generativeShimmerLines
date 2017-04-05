console.log("main.js loaded");
var running = false;
var t = 0;
//innitalize value for mouse position to center of screen
mouseX = window.innerWidth/2;
mouseY = window.innerHeight/2;

function genNoise(amp,coef=100){
    // var rand_seed = (Math.random());
    shake = 1000;
    var noise_val = noise.simplex2(amp+t, coef);
    return amp * Math.abs(noise_val+Math.random()/shake);
}

function genRGBColor(a=1,shimmer=false){
    if(shimmer){
    var smooth_rand = 3;
    var rand_seed = genNoise((Math.random()*smooth_rand)/50,+t+(Math.random()*smooth_rand)/100);
    }
    else{
        rand_seed = 1;
    }
    var r = genNoise(255, -10*rand_seed);
    var g = genNoise(255, 10*rand_seed);
    var b = genNoise(255, 20*rand_seed);

    var color_str = 'rgba('+r+'%,'+g+'%,'+b+'%,'+a+')';
    return color_str;
}

function draw(){
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    t += .001;

    var color_str = genRGBColor(.4);
    document.body.style.backgroundColor = color_str;
    document.body.style.filter = 'hue-rotate('+180+'deg)';

    var array_2d = [];
    while(array_2d.length < 20){
        if(mouseX == 0 || mouseY == 0){
            continue;
        }
        array_2d.push([mouseX,mouseY]);
    }//while
    for(i = 0; i < array_2d.length; ++i){
        for(j = 0; i < array_2d[i].length; ++i){
            for(k = 0; k <= 100; ++k){
            var offset = 22.5;
            var line_width = 2;
            var a = .3;
            x1 = genNoise(array_2d[i][0]+k,window.innerWidth)+offset;
            y1 = genNoise(array_2d[i][1]+k,window.innerHeight)+offset;
            x11 = genNoise(array_2d[i][0]+k,window.innerWidth)+offset;
            y11 = genNoise(array_2d[i][1]+k,window.innerHeight)+offset;
            x2 = genNoise(array_2d[i][0]+k,window.innerWidth)+offset;
            y2 = genNoise(array_2d[i][1]+k,window.innerHeight)+offset;
            x3 = genNoise(array_2d[i][0]+k,window.innerWidth)+offset;
            y3 = genNoise(array_2d[i][1]+k,window.innerHeight)+offset;
            color_str = genRGBColor(.5,true);
            quadCurve(x1,y1,x2,y2,x3,y3,color_str,line_width);
            drawCircle(x1,x2,genNoise(10+k),line_width);
            drawCircle(x1,x2,1+k/2,0,2,line_width);
            drawCircle(x1,x2,1+k/10,0,2,line_width);
            drawCircle(x1,x2,2,0,2,line_width);
            drawLine(x11,y11,x2,y2,color_str,line_width);
            ctx.shadowBlur = blur;
        }//for 3
        }//for 2
        }//for 1
    for(i = 0; i < array_2d.length; ++i){
        for(j = 0; i < array_2d[i].length; ++i){
            for(k = 0; k <= 100; ++k){
            var offset = 20;
            x1 = genNoise(array_2d[i][0]+k,window.innerWidth)+offset;
            y1 = genNoise(array_2d[i][1]+k,window.innerHeight)+offset;
            x11 = genNoise(array_2d[i][0]+k,window.innerWidth)+offset;
            y11 = genNoise(array_2d[i][1]+k,window.innerHeight)+offset;
            x2 = genNoise(array_2d[i][0]+k,window.innerWidth)+offset;
            y2 = genNoise(array_2d[i][1]+k,window.innerHeight)+offset;
            x3 = genNoise(array_2d[i][0]+k,window.innerWidth)+offset;
            y3 = genNoise(array_2d[i][1]+k,window.innerHeight)+offset;
            color_str = genRGBColor(1,true);
            quadCurve(x1,y1,x2,y2,x3,y3,color_str);
            drawCircle(x1,x2,genNoise(10+k));
            drawCircle(x1,x2,1+k/2);
            drawCircle(x1,x2,1+k/10);
            drawCircle(x1,x2,2);
            drawLine(x11,y11,x2,y2,color_str);
        }//for 3
    }//for 2
}//for 1


}//draw fn

function init() {
    canvas = document.getElementById('drawing');
    canvas.addEventListener('mousedown', onMouseEvent, false);
    canvas.addEventListener('mouseup', onMouseEvent, false);
    canvas.addEventListener('click', onMouseEvent, false);
    canvas.addEventListener('dblclick', onMouseEvent, false);
    canvas.addEventListener('mousewheel', onMouseEvent, false);
    canvas.addEventListener('mousemove', onMouseEvent, false);
    canvas.addEventListener('mouseover', onMouseEvent, false);
    canvas.addEventListener('mouseout', onMouseEvent, false);

    ctx = canvas.getContext('2d');
    ctx.canvas.width  = window.innerWidth-25;
    ctx.canvas.height = window.innerHeight-25;

    if (!running) {
        console.log('started');
    animationTimer = setInterval(draw, .001);
        running = true;
    } else {
        console.log('stopped')
        clearInterval(draw);
    document.getElementById("btn").innerHTML = '0';
        running = false;
    }
}

function onMouseEvent (evt) {
    var rect = canvas.getBoundingClientRect();
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;
}

//runs init() once the window is loaded
window.onload = init;
