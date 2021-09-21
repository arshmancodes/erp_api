const db = require('../util/database');

module.exports = class Business {
    constructor(id, bizname, phonenumber, email, postal, citytown)
    {
        this.id = id;
        this.bizname = bizname;
        this.phonenumber = phonenumber;
        this.email = email;
        this.postal = postal;
        this.citytown = citytown;
    }

    save() {
       return db.execute('INSERT INTO business (biz_name, phone_number, email, postal, citytown) VALUES (?, ?, ?, ?, ?)', [this.bizname, this.phonenumber, this.email, this.postal, this.citytown]);
    }
}