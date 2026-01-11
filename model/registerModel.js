module.exports = (sequelize, DataTypes) => {
  const register = sequelize.define("register", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,   // ✅ Correct validation
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING, // ✅ use STRING for hashed password
      allowNull: false,
    },
  });

  return register;
};
