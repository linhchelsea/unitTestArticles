/**
 * ArticlesController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'index' : async (req , res) => {
	    let articles = await Articles.find({});
	    // res.send(articles);
	    res.render('article-index',{articles : articles});
  },
  'create' : async (req , res) => {
    res.render('article-create');
  },
  'store' : async (req , res) => {
	  let data = {
	    title : req.body.title,
      body : req.body.body
    };
	  let create = await Articles.create(data);
    res.send({
      article : create
    });
	  // res.redirect('/index');
  },
  'edit' : async (req , res) => {
	  let article = await Articles.findOneById(req.params.id);
    res.send({
      article : article
    });
    // res.render('article-edit',{article : article});
  },
  'update' : async (req , res) => {
    let article = {
      title : req.body.title,
      body : req.body.body
    };
    let create = await Articles.update({id : req.params.id}, article);

    res.send({
      article : create[0]
    });
    // res.redirect('/index');
  },
  'delete' : async (req , res) => {
      await Articles.destroy({id : req.params.id});
      res.send({
        message : 'Delete Successfully'
      });
      // res.redirect('/index');
  }
};

