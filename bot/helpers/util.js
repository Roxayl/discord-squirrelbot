'use strict';

module.exports = {
    generateRandomString: (length) => {
        let result           = '';
        let characters       = '0123456789abcdef';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }
};
