const db = require('../util/database');

module.exports = class User {
    constructor( username, password, name) {
        this.username = username;
        this.password = password;
        this.name = name;
    }
    save() {
      return db.execute("INSERT INTO user (username, password, name) VALUES (?, ?, ?)", [this.username, this.password, this.name]);
    }
}

