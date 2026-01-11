
const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

// la sequelize yo config haru lag ani database connect gardey vaneko hae 
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
 
  // port : 7013,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing model files 


db.createBlogs = require("./createModel.js")(sequelize, DataTypes);
db.registers = require("./registerModel.js")(sequelize, DataTypes);
/*jatipani hamile column haru banainxa tyo sabai hamile yaha import garnuparxa .. hamile yo banauna chai 
blogModel.js jastai files haru baunaxau ani teslai yaha lyayera import garxau...yo chai database ma kasto
kasto table xan bhannne ho*/
/* abo hamile model bhitrako index.js lai hamro main file app.js ma import garne ... require("./model/index.js )
garera*/





sequelize
  .authenticate()
  .then(async () => {
    console.log("CONNECTED!!");
   // check if admin exists or not
 seedAdmin(db.users)
  })
  .catch((err) => {
    console.log("Error" + err);
  });




db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;