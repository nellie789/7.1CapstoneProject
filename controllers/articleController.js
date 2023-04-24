const {Article} = require('../models');

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
        author_id: 1,
        published_on: new Date()
    });
    res.redirect('/')
};

module.exports.displayArticle = async function(req, res){
    const article = await Article.findByPk(req.params.articleId, {
        include: ['author']
    });
    res.render('articles/view', {article});
};

module.exports.displayAll = async function(req, res){
    const articles = await Article.findAll({
        include: ['author']
    });
    res.render('articles/viewAll', {articles});
};