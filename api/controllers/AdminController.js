var bcrypt = require('bcrypt');
module.exports = {
	'index' : async (req , res) => {
        let admins = await Admin.find({});
        let path = req.path;
        res.render('admin/admin-index', {
            admins : admins,
            path
        });
    },
    'create' : (req , res) => {
        res.render('admin/admin-create');
    },
    'store' : async (req , res) => {
        var data = {
            username : req.body.username,
            password : req.body.password,
            fullname : req.body.fullname
        };

        //upload anh
        let dirname = require('path').resolve(sails.config.appPath, 'assets/images/avatars');
        let fileUploaded = await req.file('avatar').upload({
            dirname: dirname
        });
        let folder = fileUploaded._files[0].stream.fd;
        let arrFolder = folder.split("/");
        let avatar = arrFolder[arrFolder.length - 1];
        data.avatar = avatar;
        console.log(data);
        var admin = await Admin.create(data);
        res.redirect('/admin');
    },
    'edit' : async (req , res) => {
        let id = req.params.id;
        let admin = await Admin.findOneById(id);
        console.log(admin);
        res.render('admin/admin-edit', {admin : admin});
    },
    'update' : async (req , res ) => {
        let id       = req.params.id;
        let fullname = req.body.fullname;
        let password = req.body.password;
        if(password === ""){
            let admin = await Admin.findOneById(id);
            password  = admin.password;
        }else{
            var salt = bcrypt.genSaltSync(10);
            password = bcrypt.hashSync(password, salt);
        }
        let data = {
            fullname : fullname,
            password : password
        }
        let admin = await Admin.update({id : id}, data)
        res.redirect('/admin');
    }
};

