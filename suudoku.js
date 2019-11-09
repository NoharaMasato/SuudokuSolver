module.exports = class Suudoku {
  constructor(file_path) {
    let mondai = new Array(9);
    for(let y = 0; y < 9; y++) {
      mondai[y] = new Array(9).fill(0);
    }
    this.mondai = mondai;
    this.file_path = file_path;
    this.first_answer;
    this.answer_cnt = 0;
  }

  read_problem_from_file(){
    let fs = require('fs');
    let text = fs.readFileSync(this.file_path, 'utf-8');
    let input_array = text.replace(/\r?\n/g, '').split(",");
    for (let i=0;i<9;i++){
      for (let j=0;j<9;j++){
        this.mondai[i][j] = input_array[9*i+j];
      }
    }
  }

  check_all(mondai){
    //x check
    var correct_answer=1;
    for (var i=0;i<9;i++){
      var kouho = new Array(10).fill(0);
      for (var j=0;j<9;j++){
        kouho[mondai[i][j]]++;
      }
      for (var j=1;j<=9;j++){
        if (kouho[j] != 1) correct_answer = 0;
      }
    }

    //y check
    for (var i=0;i<9;i++){
      var kouho = new Array(10).fill(0);
      for (var j=0;j<9;j++){
        kouho[mondai[j][i]]++;
      }
      for (var j=1;j<=9;j++){
        if (kouho[j] != 1) correct_answer = 0;
      }
    }
// check box
    for (var i=0;i<3;i++){
      for (var j=0;j<3;j++){
        var kouho = new Array(10).fill(0);
        for (var k=0;k<3;k++){
          for (var l=0;l<3;l++){
            kouho[mondai[i*3+k][j*3+l]]++;
          }
        }
        for (var j=1;j<=9;j++){
          if (kouho[j] != 1) correct_answer = 0;
        }
      }
    }
    return correct_answer;
    //if (correct_answer == 0) console.log("correct answer");
    //else console.log("Not connrect answer");
  }

  step_next(x,y){
    if (x==8){
      x = 0;
      y++;
    } else x++;
    return {x,y}
  }

  set_answer(){
    console.log(this.check_all(this.mondai));
    if (this.check_all(this.mondai) == 1){
      if(this.answer_cnt == 0){
        this.first_answer = new Array(9);
        for(let y = 0; y < 9; y++) {
          this.first_answer[y] = new Array(9).fill(0);
        }
        for (let i=0;i<9;i++){
          for (let j=0;j<9;j++){
            this.first_answer[i][j] = this.mondai[i][j];
          }
        }
      }
      this.answer_cnt++;
    }
  }

  check(x,y){
    // box check
    let kouho = new Array(10).fill(0);
    for (let i=parseInt(x/3)*3;i<parseInt(x/3)*3+3;i++){
      for (let j=parseInt(y/3)*3;j<parseInt(y/3)*3+3;j++){
        kouho[this.mondai[j][i]]=1;
      }
    }

    //x check
    for (let i=0;i<9;i++){
      kouho[this.mondai[y][i]]=1;
    }

    // y check
    for (let i=0;i<9;i++){
      kouho[this.mondai[i][x]]=1;
    }
    return kouho
  }

  search(x,y,v){
    this.mondai[y][x]=v;
    let bx = x;
    let by = y;
    if (x==8&&y==8) {
      this.set_answer();
      return;
    }
    while (true){
      var {x,y} = this.step_next(x,y);
      if (this.mondai[y][x] == 0){
        let kouho = this.check(x,y);
        for (let i=1;i<=9;i++){
          if (kouho[i]==0){
            this.search(x,y,i);
          }
        }
        break;
      }else{
        if (x==8&&y==8) {
          this.set_answer();
          return;
        }
      }
    }
    this.mondai[by][bx] = 0;
  }

  print_result(){
    for (let i=0;i<9;i++){
      for (let j=0;j<9;j++){
        process.stdout.write(String(this.first_answer[i][j])+" ");
      }
      console.log("");
    }
  }
}

