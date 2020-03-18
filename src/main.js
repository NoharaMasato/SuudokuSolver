const Suudoku = require('./suudoku');

let suudoku = new Suudoku("sample/problems/sample_3.txt");
suudoku.read_problem_from_file();
suudoku.search();
suudoku.print_result();
