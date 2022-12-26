const data = require("../database/database.json")

function convoPicUrl(matno) {
    const comp = matno.slice(0, 4);
    
    if (comp === '17cg' || comp === '18cg') {
        
        const search = matno.slice(-3) + '.JPG';

        if (data[search]) return data[search]
    }
    
    const jpg = matno.toUpperCase() + '.JPG';
    
    if (data[jpg]) return data[jpg]

    return null 
}

module.exports = convoPicUrl;