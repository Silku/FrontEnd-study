// const { DataTypes } = require("sequelize");
// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        // id는 mysql에서 자동생성됨
        content:{
            type:DataTypes.TEXT,
            allowNull : false,
        },
    },{
        charset:'utf8mb4', //mb4는 이모티콘까지 지원
        colleate:'utf8mb4_general_ci' 
    })    
    Comment.associate = (db) =>{
        db.Comment.belongsTo(db.User)
        db.Comment.belongsTo(db.Post)
    };
    return Comment;
}