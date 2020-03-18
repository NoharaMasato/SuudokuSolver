const Suudoku = require('../suudoku');

function read_answer(file_path){
  let fs = require('fs');
  let text = fs.readFileSync(file_path, 'utf-8');
  let input_array = text.replace(/\r?\n/g, '').split(",");
  let answer = new Array(9);
  for(let y = 0; y < 9; y++) {
    answer[y] = new Array(9).fill(0);
  }

  for (let i=0;i<9;i++){
    for (let j=0;j<9;j++){
      answer[i][j] = parseInt(input_array[9*i+j]);
    }
  }
  return answer;
}

describe('check answer', () => {
  for (let i=1;i<=3;i++){
    let suudoku = new Suudoku(`sample/problems/sample_${i}.txt`); 
    suudoku.read_problem_from_file();
    let answer = read_answer(`sample/answers/answer_${i}.txt`);
    suudoku.search();
    it('correct answer', () => {
      expect(suudoku.first_answer).toEqual(answer);
    });
  }
});
