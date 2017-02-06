module.exports = class {

    /**
     * @description id의 길이를 체크합니다.
     * @param {string} id
     * @return {boolean}
     */
    static isAllowedLength(id) {
        if (!typeof(id) === 'string') {
            return false;
        }
        switch (this.id[0]) {
            case 1: // 1학년
                return global.config.lengthOfId['1'] === id.length;
            case 2: // 2학년
                return global.config.lengthOfId['2'] === id.length;
            case 3: // 3학년
                return global.config.lengthOfId['3'] === id.length;
            default:
                return false;
        }
    }

    /**
     * @description 이미 회원가입 된 아이디가 아닌지 확인합니다.
     * @param {string} id
     * @return {boolean}
     */
    static isAlreadyRegistered(id) {
        return !!global.student[id];
    }
}
