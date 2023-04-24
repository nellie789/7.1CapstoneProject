'use strict';
const moment = require('moment');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.User, {
        as: 'author',
        foreignKey: 'author_id'
      })
    }
  };
  Article.init({
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    lyric: DataTypes.STRING,
    image_url: DataTypes.STRING,
    author_id: DataTypes.INTEGER,
    published_on: DataTypes.DATE,
    friendlyPublishedDate: {
      type: DataTypes.VIRTUAL,
      get(){
        return moment(this.published_on).format('MMMM Do, YYYY')
      }
    }
  }, {
    sequelize,
    modelName: 'Article',
    timestamps: false,
    tableName: 'write_articles'
  });
  return Article;
};