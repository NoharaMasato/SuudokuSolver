const Suudoku = require('./suudoku');

let suudoku = new Suudoku("sample/problems/sample_2.txt");
suudoku.read_problem_from_file();
for (let i=1;i<=9;i++){
  suudoku.search(0,0,i);
}
suudoku.print_result();
console.log(suudoku.answer_cnt);

