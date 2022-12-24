const data = require("../database/database.json")

function convoPicUrl(matno) {
    const jpg = matno.toUpperCase() + '.JPG';
    
    if (data[jpg]) {
        return data[jpg]
    }

    return null 
}

module.exports = convoPicUrl;