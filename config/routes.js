let routes = {
    'get  /'            : {   view: 'homepage'   }    ,
    'get  /index'       : 'ArticlesController.index'  ,
    'get  /create'      : 'ArticlesController.create' ,
    'post /store'       : 'ArticlesController.store'  ,
    'get  /edit/:id'    : 'ArticlesController.edit'   ,
    'post /update/:id'  : 'ArticlesController.update' ,
    'get  /delete/:id'  : 'ArticlesController.delete' ,



    'get   /login'           : 'UserController.getLogin'  ,
    'post  /login'           : 'UserController.postLogin'  ,
    'get   /signup'          : 'UserController.getSignUp'  ,
    'post  /signup'          : 'UserController.postSignUp'  ,
    'get   /user'            : 'UserController.index'  ,
    'get   /user/create'     : 'UserController.create' ,
    'post  /user/store'      : 'UserController.store'  ,
    'get   /user/edit/:id'   : 'UserController.edit'   ,
    'post  /user/update/:id' : 'UserController.update' ,
    'get   /user/delete/:id' : 'UserController.delete' ,

    'get   /admin'               : 'AdminController.index',
    'get   /admin/create'        : 'AdminController.create' ,
    'post  /admin/store'         : 'AdminController.store' ,
    'get   /admin/edit/:id'      : 'AdminController.edit' ,
    'post  /admin/update/:id'        : 'AdminController.update' 
};
module.exports.routes = routes;

