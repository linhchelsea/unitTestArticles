var bcrypt = require('bcrypt');

module.exports = {
	'getLogin' : (req, res) => {
	  res.render('user/login');
  },
  'postLogin' : async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let admin = await Admin.findOne({username : username});
    console.log(admin);
    if(! admin ){
      res.redirect('/user');
    } 
    // // Load hash from your password DB.
    let compare = bcrypt.compareSync(password, admin.password);
    console.log(compare);
    if(compare){
      req.session.userLogin = admin;
      res.redirect('/admin');
    }else{
      res.redirect('/login');
    }
  },
	'getSignUp' : (req, res) => {
	  res.render('user/signup');
  },
  'postSignUp' : (req, res) => {

  },
  'index' : async (req , res) => {
	  let users = await User.find({});
	  let path = req.path;
	  res.render('user/user-index',{
	    users : users,
      path
	  });
  },
  'create' : async (req , res ) => {
    let path = req.path;
	  res.render('user/user-create',{path});
  },
  'store' : async (req , res ) => {
	  let body = {
	    username : req.body.username,
      password : req.body.password
    };

	  let user = await User.create(body);
	  res.redirect('/user');
  },
  'edit' : async (req , res) => {
	  let id = req.params.id;
	  let user = await User.findOneById(id);
    let path = req.path;
    res.render('user/user-edit',{
      user : user,
      path
    });
  },
  'update': async (req, res) => {
    let id = req.params.id;
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let body = {};
    console.log(req.body);
    console.log(password === '');
    if( confirmPassword !== password ){
      req.flash('fail', 'Password and Confirm Password are not the same');
      res.redirect('back');
    }
      body = {
        username : req.body.username,
        password : req.body.password
      }
    let user = await User.update({id : id},body);
    res.redirect('/user');
  },
  'delete': async (req, res) => {
    let id = req.params.id;
    await User.destroy({id : id});
    res.redirect('back');
  }
};

