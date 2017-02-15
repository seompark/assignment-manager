class User {
    constructor(id, password) {
        if(id.length === 4)
            id = id[0] + '0' + id.slice(1, 3);
        this._id = id;
        this._password = password;
    }
    static login(id, password) {
        //TODO
        return true;
    }

    static register(id, password) {
        return new Promise((resolve, reject) => {
            let user = new User(id, password);
            if(user.isRegistered())
                reject(new Error('You are already registered'));

        });
    }

    static getStudents(clazz) {
        try {
            return require(__dirname + `/database/users/${clazz}.json`);
        } catch(err) {
            return undefined;
        }
    }

    makeUserFile(id) {
        //TODO
    }

    save() {
        //TODO
    }

    verifyId() {
        return this._id.match(/^\d{4,5}$/g);
    }

    verifyPassword() {
        //TODO throw Error if it can't be verified
    }

    login() {
        return this.isRegistered() ? this.verifyId() || this.verifyPassword() : false;
    }

    getGrade() {
        return this._id[0];
    }

    getClass() {
        return this.id[1] + this.id[2];
    }

    getStudentNumber() {
        return this._id;
    }

    isRegistered() {
        try {
            return !!require(`./database/users/${this.getGrade()}/${this.getClass()}.json`)[this.getStudentNumber()];
        } catch(err) {
            return false;
        }
    }
}

module.exports = User;
