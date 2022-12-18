const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', {
        // id는 mysql에서 자동생성됨
        content:{
            type:DataTypes.STRING(20),
            allowNull : true,
        },
    },{
        charset:'utf8mb4', //mb4는 이모티콘까지 지원
        colleate:'utf8mb4_general_ci' 
    })    
    Hashtag.associate = (db) =>{
        db.Hashtag.belongsToMany(db.Post);
    };
    return Hashtag;
}