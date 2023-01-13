// const { DataTypes } = require("sequelize");
// const { sequelize } = require(".");

const DataTypes = require('sequelize');
const { Model } = DataTypes;

//class 문법 => 최신문법임(typeScript 쓸때 좋음)
// module.exports = class Comment extends Model {
//     static init(sequelize) {
//     return super.init({
//         // id가 기본적으로 들어있다.
//         content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         },
//         // UserId: 1
//         // PostId: 3
//     }, {
//         modelName: 'Comment',
//         tableName: 'comments',
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci', // 이모티콘 저장
//         sequelize,
//     });
//     }
//     static associate(db) {
//     db.Comment.belongsTo(db.User);
//     db.Comment.belongsTo(db.Post);
//     }
// };


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