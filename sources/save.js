var sort = require('sort-json');

/**
 * @description 유저 정보를 저장합니다.
 * @return {object}
 */
module.exports.saveStudent = () => {
    let fs = require('fs');
    var sortedStudents = sort(global.students);
    fs.writeFile('./students.json', JSON.stringify(global.students, null, 4), 'utf-8');
	return sortedStudents;
}
