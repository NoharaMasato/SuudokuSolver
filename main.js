function print_result(){
  for (var i=0;i<9;i++){
    for (var j=0;j<9;j++){
      process.stdout.write(String(mondai[i][j])+" ");
    }
    console.log("");
  }
  process.exit(0);
}

function step_next(x,y){
  if (x==8){
    x = 0;
    y++;
  } else x++;
  return {x,y}
}

function read_problem(file_name){
  var fs = require('fs');
  let text = fs.readFileSync(file_name, 'utf-8');

  var input_array = text.replace(/\r?\n/g, '').split(",");
  for (var i=0;i<9;i++){
    for (var j=0;j<9;j++){
      mondai[i][j] = input_array[9*i+j];
    }
  }
}

function dfs(x,y,v){ // 座標x,yにvが入る
  mondai[y][x]=v;
  if (x==8&&y==8) print_result();
  var bx = x;
  var by = y;
  while (true){
    var {x,y} = step_next(x,y);
    if (mondai[y][x] == 0){
      // box check
      let kouho = [0,0,0,0,0,0,0,0,0,0];
      for (var i=parseInt(x/3)*3;i<parseInt(x/3)*3+3;i++){
        for (var j=parseInt(y/3)*3;j<parseInt(y/3)*3+3;j++){
          kouho[mondai[j][i]]=1;
        }
      }

      //x check
      for (var i=0;i<9;i++){
        kouho[mondai[y][i]]=1;
      }

      // y check
      for (var i=0;i<9;i++){
        kouho[mondai[i][x]]=1;
      }

      for (var i=1;i<=9;i++){
        if (kouho[i]==0){
          dfs(x,y,i);
        }
      }
      break;
    }else{
      if (x==8&&y==8) print_result();
    }
  }
  mondai[by][bx] = 0;
}

var mondai = new Array(9);
for(let y = 0; y < 9; y++) {
  mondai[y] = new Array(9).fill(0);
}

read_problem("sample/problems/sample_2.txt");
for (var i=1;i<=9;i++){
  dfs(0,0,i);
}
console.log("解けません")

