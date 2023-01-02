

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        // id는 mysql에서 자동생성됨
        src:{
            type:DataTypes.STRING(200),
            allowNull : true,
        },
    },{
        charset:'utf8', 
        colleate:'utf8_general_ci' 
    })    
    Image.associate = (db) =>{};
    return Image;
}