console.log("drawstuff here");


function drawLine(x1,y1,x2,y2,clr_style,line_width = 1){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineWidth = line_width;
    ctx.strokeStyle = clr_style;
    ctx.stroke();
}

function quadCurve(x1,y1,x2,y2,x3,y3,line_width = 1){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.quadraticCurveTo(x1,x2,y2,y1);
    ctx.lineWidth = line_width;
    ctx.stroke();
}

function drawCircle(x1,x2,r,start=0,end=2,line_width = 1){
    ctx.beginPath();
    ctx.arc(x1,y1,r,start*Math.PI,end*Math.PI);
    ctx.lineWidth = line_width;
    ctx.stroke();
}
