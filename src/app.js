//var mondai = [[0,7,0,0,0,9,5,0,3],
//              [0,0,0,0,8,0,0,0,2],
//              [0,5,8,0,4,0,0,0,1],
//              [5,0,3,8,2,0,6,4,7],
//              [2,8,0,0,0,7,0,0,9],
//              [0,4,6,9,0,0,1,0,0],
//              [6,3,4,2,9,0,7,1,5],
//              [0,0,0,1,0,0,0,3,6],
//              [8,1,7,5,3,6,2,9,4]]

var mondai = [[0,0,0,0,0,0,0,5,0],
              [0,4,7,0,9,0,0,0,0],
              [0,0,0,0,8,0,7,6,2],
              [0,0,5,9,1,0,0,0,0],
              [0,0,8,6,4,0,3,0,0],
              [0,0,0,0,0,0,0,9,0],
              [0,2,0,8,0,0,0,0,5],
              [6,0,0,0,0,0,4,8,0],
              [8,0,0,0,0,7,0,0,0]]

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

for (var i=1;i<=9;i++){
  dfs(0,0,i);
}
console.log("解けません＂)

