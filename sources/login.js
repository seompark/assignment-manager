module.exports = (studentNumber, password) => {
    return global.students[studentNumber] ? global.students[studentNumber].password === password : false;
}
