setTimeout(() =>{var board = [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']]
var old_pos = []
console.log("Started....");
var new_board = null
var a = document.getElementsByClassName("piece");
try{
	var is_white_player = document.querySelector(".clock-bottom").getAttribute("class").includes("white");

}catch(err){

	var is_white_player = true
	}
const start_pos = document.createElement("div")
const end_pos = document.createElement("div")
var last_square_start = null;
var last_square_end  = null;

document.querySelector('.board').insertBefore(start_pos,a[0])
document.querySelector('.board').insertBefore(end_pos,a[1])
start_pos.style.border = "2px solid red";
end_pos.style.border = "2px solid green";
if(is_white_player){
	start_pos.setAttribute('class','piece square-52')
	end_pos.setAttribute('class','piece square-54')
	start_pos.style.border = "2px solid red";
	end_pos.style.border = "2px solid green";
	//old_pos.push("e2e4")
}
is_white_player = false;
var 	int_ = setInterval( () => {
	a = document.getElementsByClassName("piece");
	board = [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']]
	for(var i =0;i < a.length;i++){
		var current = a[i]
		var data = a[i].getAttribute("class").split(" ")
		if(data.length < 3){continue}
		if(data[2].split("-")[1]){
		var posX = parseInt(data[2].split("-")[1][0]) -1 
		var posY = parseInt(data[2].split("-")[1][1]) -1
		board[posY][posX] = data[1]
		}
		else{
		var posX = parseInt(data[1].split("-")[1][0]) -1
		var posY = parseInt(data[1].split("-")[1][1]) -1
		board[posY][posX] = data[2]
		}


	}
	if(!new_board){
		new_board = board;
		return; 
	}
	pos = ['a','b','c','d','e','f','g','h']
	new_pos = ['','']
	for(var i = 0;i < 8;i++){
	for(var j =0;j<8;j++){
		if(board[i][j] != new_board[i][j]){
			if(board[i][j] == ''){
				new_pos[0] = pos[j] + String(i+1);
			}
			else{
				new_pos[1] = pos[j] + String(i+1);
			}
		}
}
}

	new_board = board
	if(new_pos[0] != '' && new_pos[1] != ''){
		console.log(new_pos);
		const pos = new_pos[0]+new_pos[1]
		if(pos == old_pos){
			old_pos = '';
		}
		if(is_white_player){
		is_white_player = true;
		return
		}
		fetch(`https://chess-api.herokuapp.com/next_best/${old_pos + pos}`).then(res => res.json()).then(result =>{
			console.log(result);
			var indexes = {"a":1,"b":2,"c":3,"d":4,"e":5,"f":6,"g":7,"h":8}
			if(last_square_end){
			
			try{
						//document.querySelector(".square-"+last_square_end).remove()
						//document.querySelector(".square-"+last_square_start).remove()
			}
			catch(err){
			console.log(err)
			}

			}
			start = result['bestNext'].slice(0,2)
			start_square = String(indexes[start[0]]) + start[1]
			end  = result['bestNext'].slice(2,4)
			console.log(start,end);
			end_square = String(indexes[end[0]]) +end[1]
			console.log(start_square, end_square);
			start_pos.setAttribute('class','piece square-'+start_square)
	end_pos.setAttribute('class','piece square-'+end_square)
	last_square_end = end_square;
	last_square_start = start_square;
			
		});
		if(old_pos == pos){
			return;
		}
		old_pos += pos;
	}


	
	
	
	
	},500)
	
	},20000)
