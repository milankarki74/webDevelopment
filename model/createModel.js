module.exports = (sequelize, DataTypes) => {
    const createBlogs = sequelize.define("data", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subTitle: {
        type: DataTypes.STRING,
        allowNull : false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull:false,
      },
        image: {
        type: DataTypes.STRING,
        allowNull:false,
      }
     
     
    
    });
    return createBlogs;
  };