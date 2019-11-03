class Suudoku {
  constructor() {
    var mondai = new Array(9);
    for(let y = 0; y < 9; y++) {
      mondai[y] = new Array(9).fill(0);
    }
    this.mondai = mondai;
    this.answer_cnt;
    this.first_answer;
  }

  read_problem_from_file(file_path){
    var fs = require('fs');
    let text = fs.readFileSync(file_path, 'utf-8');

    var input_array = text.replace(/\r?\n/g, '').split(",");
    for (var i=0;i<9;i++){
      for (var j=0;j<9;j++){
        this.mondai[i][j] = input_array[9*i+j];
      }
    }
  }

  step_next(x,y){
    if (x==8){
      x = 0;
      y++;
    } else x++;
    return {x,y}
  }

  search(x,y,v){
    this.mondai[y][x]=v;
    if (x==8&&y==8) this.print_result();
    var bx = x;
    var by = y;
    while (true){
      var {x,y} = this.step_next(x,y);
      if (this.mondai[y][x] == 0){
        // box check
        let kouho = [0,0,0,0,0,0,0,0,0,0];
        for (var i=parseInt(x/3)*3;i<parseInt(x/3)*3+3;i++){
          for (var j=parseInt(y/3)*3;j<parseInt(y/3)*3+3;j++){
            kouho[this.mondai[j][i]]=1;
          }
        }

        //x check
        for (var i=0;i<9;i++){
          kouho[this.mondai[y][i]]=1;
        }

        // y check
        for (var i=0;i<9;i++){
          kouho[this.mondai[i][x]]=1;
        }

        for (var i=1;i<=9;i++){
          if (kouho[i]==0){
            this.search(x,y,i);
          }
        }
        break;
      }else{
        if (x==8&&y==8) this.print_result();
      }
    }
    this.mondai[by][bx] = 0;
  }

  print_result(){
    for (var i=0;i<9;i++){
      for (var j=0;j<9;j++){
        process.stdout.write(String(this.mondai[i][j])+" ");
      }
      console.log("");
    }
    process.exit(0);
  }
}

var suudoku = new Suudoku();
suudoku.read_problem_from_file("sample/problems/sample_1.txt");
for (var i=1;i<=9;i++){
  suudoku.search(0,0,i);
}
suudoku.print_result();
