const User = require('../main');

function read_answer(file_path){
  let fs = require('fs');
  let text = fs.readFileSync(this.file_path, 'utf-8');
  let input_array = text.replace(/\r?\n/g, '').split(",");

  let answer = new Array(9);
  for(let y = 0; y < 9; y++) {
    answer[y] = new Array(9).fill(0);
  }

  for (let i=0;i<9;i++){
    for (let j=0;j<9;j++){
      answer[i][j] = input_array[9*i+j];
    }
  }
  return answer;
}

describe('check answer', () => {
  let suudoku = new Suudoku("sample/problems/sample_1.txt"); 
  let answer = suudoku.read_answer("sample/answers/answer_1.txt");
  for (var i=1;i<=9;i++){
    suudoku.search(0,0,i);
  }
  it('correct answer', () => {
    expect(suudoku.mondai).toBe(answer);
  });
});
