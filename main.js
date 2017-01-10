console.log("main.js loaded");
var canvasWidth = 800;
var canvasHeight = 800;
var numVectHoriz = 300;
var numVectVert = 300;
var w = canvasWidth/numVectHoriz;
var h = canvasHeight/numVectVert;
var tx;
var ty;

/*
The vector field is going to contain many vector objects
the vector object will contain both the xpos, ypos, and a Pvector
    made up of the xMag and yMag

*/


var vectorField;
function setup(){
    tx = 0;
    ty = 3;
    createCanvas(canvasWidth,canvasHeight);
    background(0);
    vectorField = new VectorField();

    for(var i = 0; i < numVectHoriz; i++){
        for(var j = 0; j < numVectVert; j++){
            vectorField.push(i*w, j*h, noise(tx), noise(ty));
            tx += 0.05;
            ty += 0.05;
        }
    }
    vectorField.log();  
}

function draw(){
    vectorField.display();
}

function VectorField(){
    this.vectorArr = [];
    this.push = function(xPos_,yPos_,xMag_,yMag_){
        var vectorObject = {
            xPos: xPos_,
            yPos: yPos_,
            vector: createVector(xMag_, yMag_)
        }
        this.vectorArr.push(vectorObject);
    }
    this.log = function(){
        console.log(this.vectorArr);
    }
    this.display = function(){
        for(var i = 0; i < this.vectorArr.length; i++){
            fill(map(this.vectorArr[i].vector.mag(),0,1,0,255));
            rect(
                this.vectorArr[i].xPos,
                this.vectorArr[i].yPos,
                w,
                h
            );
        }  
    }
}

