/**
 * ClientController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'index' : async (req , res) => {
        let clients = await Client.find({});
        let path = req.path;
        res.render('client/client-index', {
            clients : clients,
            path
        });
    },
    'create' : (req , res) => {
        res.render('client/client-create');
    },
    'store' : async (req , res) => {
        var data = {
            username : req.body.username,
            password : req.body.password,
            fullname : req.body.fullname
        };

        //upload anh
        let dirname = require('path').resolve(sails.config.appPath, 'assets/images/avatars');
        let avatar = await req.file('avatar').upload({
            dirname: dirname
        }, (err, uploadedFiles) => {
            if (err) return res.negotiate(err);
            let folder= uploadedFiles[0].fd;
            let arrFolder = folder.split("/");
            let avatar = arrFolder[arrFolder.length - 1];
            data.avatar = avatar;
        });
        
        var client = await Client.create(data);
        res.redirect('/client');
    }
};

