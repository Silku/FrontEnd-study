

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
        // 아래 주석은 sequelize에서 자동으로 생성하는 형식 =>  
        // belongsTo 는 단수형, belongsToMany는 복수형 등등..
        db.Post.belongsTo(db.User) //post.addUser , post.getUser , post.setUser
        db.Post.belongsToMany(db.Hashtag, {through : 'PostHashtag'});
        db.Post.hasMany(db.Comment); //post.addComments, post.getComments
        db.Post.hasMany(db.Image); //post.addImages , post.getImages
        db.Post.belongsToMany(db.User, {through : 'Like' ,as : 'Likers'});  //post.addLikers, post.removeLikers
        db.Post.belongsTo(db.Post, {as :'SharedPost'}); 
    };
    return Post;
}