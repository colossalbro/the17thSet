const grammy = require("grammy");

const InlineKeyboard = grammy.InlineKeyboard
const pictureKey = function() {
    return {
        'reply_markup': new InlineKeyboard().text('get my picture', 'picture')
    }
}


const tryAgain = function(){
    return {
        'reply_markup': new InlineKeyboard().text('try again', 'picture')
    }
}


exports.pictureKey = pictureKey;
exports.tryAgain = tryAgain;