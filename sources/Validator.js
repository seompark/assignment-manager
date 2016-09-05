module.exports = class {
    /**
     * @description id를 생성자로 받습니다.
     * @param {string} id
     */
    constructor(id) {
        this.id = id;
    }

    /**
     * @description id의 길이를 체크합니다.
     * @return {boolean}
     */
    isAllowedLength() {
        if (!typeof(id) === 'string') {
            return false;
        }
        switch (this.id[0]) {
            case 1: // 1학년
                return global.config.lengthOfId['1'] === id.length;
                break;
            case 2: // 2학년
                return global.config.lengthOfId['2'] === id.length;
                break;
            case 3: // 3학년
                return global.config.lengthofId['3'] === id.length;
                break;
        }
    }

    /**
     * @description 이미 회원가입 된 아이디가 아닌지 확인합니다.
     * @return {boolean}
     */
    isAlreadyRegistered() {
        if (global.students[id] instanceof Object) {
            return false;
        }
        return true;
    }
}
