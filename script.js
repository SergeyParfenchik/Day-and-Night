let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");

let firstArray = new Array();
let secondArray = new Array();

const LEN = 500;

for(let i = LEN; i >= 0; i--){
	firstArray[i] = new Array();
	for(let j = LEN; j >= 0; j--){
		firstArray[i][j] = Math.floor(Math.sin(Math.random()*2)+0.1);
	}
}


function draw(){

for(let i = LEN; i >= 0; i--){
	secondArray[i] = new Array();
	for(let j = LEN; j >= 0; j--){
		let livingCells = getNumberOfLivingCellsAround(firstArray, i, j);
		if(livingCells == 3 || livingCells == 6 || livingCells == 7 || livingCells == 8){
			secondArray[i][j] = 1;
		} else if(livingCells == 0 || livingCells == 1 || livingCells == 2 || livingCells == 5){
			secondArray[i][j] = 0;			
		} else {
			secondArray[i][j] = firstArray[i][j];
		}
	}
}


for(let i = LEN; i >= 0; i--){
	firstArray[i] = new Array();
	for(let j = LEN; j >= 0; j--){
		let livingCells = getNumberOfLivingCellsAround(secondArray, i, j);
		if(livingCells == 3 || livingCells == 6 || livingCells == 7 || livingCells == 8){
			firstArray[i][j] = 1;
		} else if(livingCells == 0 || livingCells == 1 || livingCells == 2 || livingCells == 5){
			firstArray[i][j] = 0;			
		} else {
			firstArray[i][j] = secondArray[i][j];
		}
	}
}
let qwee = 500;
for (let x = 0; x < qwee; x++){
	for (let y = 0; y < qwee; y++){
		
		if (firstArray[y%LEN][x%LEN] == 0) {
			if (getNumberOfLivingCellsAround(firstArray, y%LEN, x%LEN) == 0){
				ctx.fillStyle = "green";
			} else {
				ctx.fillStyle = "orange";
			}
		} else {
			ctx.fillStyle = "blue";
		} 
		ctx.fillRect(x, y, 1, 1);
	}
}
}

// for (let i = 0; i < 50; i++){
// 	draw();
// }
setInterval(draw, 20)




function getNumberOfLivingCellsAround(array, i, j){
	let il = array.length;
	let jl = array[i].length;
	let result = 0;
	if(array[(i+1)%il][j] == 1){result++;}
	if(array[i][(j+1)%jl] == 1){result++;}
	if(array[(i+1)%il][(j+1)%jl] == 1){result++;}
	if(array[(il+i-1)%il][j] == 1){result++;}
	if(array[i][(jl+j-1)%jl] == 1){result++;}
	if(array[(il+i-1)%il][(jl+j-1)%jl] == 1){result++;}
	if(array[(i+1)%il][(jl+j-1)%jl] == 1){result++;}
	if(array[(il+i-1)%il][(j+1)%jl] == 1){result++;}
	return result;
}