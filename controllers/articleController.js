const {Article, Comment, Reply} = require('../models');

module.exports.renderAddForm = function(req, res){
    const article = {
        title: '',
        artist: '',
        image_url: '',
        lyric: ''
    };
    res.render('articles/add', {article});
};

module.exports.addArticle = async function(req, res){
    const article = await Article.create({
        title: req.body.title,
        artist: req.body.artist,
        image_url: req.body.image_url,
        lyric: req.body.lyric,
        author_id: req.user.id,
        published_on: new Date()
    });
    res.redirect('/')
};

module.exports.displayArticle = async function(req, res){
    const article = await Article.findByPk(req.params.articleId, {
        include: [
            'author',
            {
                model: Comment,
                as: 'comments',
                required: false,
                include: [{
                    model: Reply,
                    as: 'replies',
                    required: false
                }]
            }
        ],
        order: [
            ['comments', 'commented_on', 'desc']
        ]
    });
    res.render('articles/view', {article});
};

module.exports.displayAll = async function(req, res){
    const articles = await Article.findAll({
        include: ['author']
    });
    res.render('articles/viewAll', {articles});
};

module.exports.renderEditForm = async function(req, res){
    const article = await Article.findByPk(req.params.articleId);
    res.render('articles/edit', {article});
};
//if (!article.isOwnedBy(user)){
//         res.redirect('/');
//         return;
//     }
module.exports.updateArticle = async function(req, res){
    await Article.update({
        title: req.body.title,
        artist: req.body.artist,
        image_url: req.body.image_url,
        lyric: req.body.lyric,
    }, {
        where: {
            id: req.params.articleId
        }
    });
    res.redirect(`/article/${req.params.articleId}`);
};
//const article = await Article.findByPk(req.params.articleId);
//     if (!article.isOwnedBy(user)){
//         res.redirect('/');
//         return;
//     }
module.exports.deleteArticle = async function(req, res){
    await Article.destroy({
        where: {
            id: req.params.articleId
        }
    });
    res.redirect('/')
};
//const article = await Article.findByPk(req.params.articleId);
//     if (!user.is('admin') && !article.isOwnedBy(user)){
//         res.redirect('/');
//         return;
//     }