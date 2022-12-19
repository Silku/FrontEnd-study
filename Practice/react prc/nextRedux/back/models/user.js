
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { //model이름 User 대문자가 자동 변환되서 mySQL에서는 복수형 users로 됨
        // id는 mysql에서 자동생성됨
        email : {
            //STRING, INTEGER, FLOAT, TEXT, BOOLEAN, DATETIME
            type:DataTypes.STRING(30), //30글자까지 
            allowNull : true , //null허용여부, ture: 선택, false : 이메일 필수
            unique : true, //고유값
        },
        nickname:{
            type:DataTypes.STRING(30), 
            allowNull : false,
        },
        password : {
            type:DataTypes.STRING(80), 
            allowNull : false,
        },
    },{
        charset:'utf8',
        colleate:'utf8_general_ci' //한글저장
    })    
    User.associate = (db) =>{
        //hasMany(여러개 가질수있다.)
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, {through : 'Like', as : 'Liked'});
        db.User.belongsToMany(db.User, {through : 'Follow', as : 'Followers', foreignKey : 'FollowingId'});
        db.User.belongsToMany(db.User, {through : 'Follow', as : 'Followings', foreignKey : 'FollowerId'});
    };
    return User;
}