

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        // id는 mysql에서 자동생성됨
        content:{
            type:DataTypes.TEXT,
            allowNull : false,
        },
    },{
        charset:'utf8mb4', //mb4는 이모티콘까지 지원
        colleate:'utf8mb4_general_ci' 
    })    
    Post.associate = (db) =>{
        // belongsTo 속해있다.
        db.Post.belongsTo(db.User)
        db.Post.belongsToMany(db.Hashtag, {through : 'PostHashtag'});
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, {through : 'Like' ,as : 'Likers'}); 
        db.Post.belongsTo(db.Post, {as :'SharedPost'});
    };
    return Post;
}