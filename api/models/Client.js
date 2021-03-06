var bcrypt = require('bcryptjs');

module.exports = {

  attributes: {
    username : { type : 'string' },
    password : { type : 'string' },
    fullname : { type : 'string' },
    avatar   : { type : 'string' },
    toJSON : () => {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: (client, cb) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(client.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
          cb(err);
        }else{
          client.password = hash;
          cb(null, client);
        }
      });
    });
  },
  connection : 'mongodb'
};

