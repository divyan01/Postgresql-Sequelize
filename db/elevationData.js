const Sequelize = require('sequelize');
const db = new Sequelize('projectnoah', 'postgres', 'qwerty', {
    host: 'localhost',
    dialect: 'postgres'
});

const ElevationData = db.define('ElevationData', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Lattitude: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    Longitude: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    Resolution: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    ImageName: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false
    },
    SaferLattitude: {
        type: Sequelize.DataTypes.FLOAT
    },
    SaferLongitude: {
        type: Sequelize.DataTypes.FLOAT
    },
})

db.sync().then(() => console.log("Database Ready"))

function getData(callback){
    arr=[]
    ElevationData.all().then(data => {
        data.forEach(element => {
            // console.log(element.toJSON()); 
            arr.push(element.toJSON())           
        });        
        // return arr;        
        //dont forget it to convert it to tojson before sending
        callback(null,{data:arr});
    })
   
    //data contains all the data as an array object
}

function InsertData(obj,callback) {
    ElevationData.create(obj).then(data => {
        callback(null, data.toJSON())
        // console.log(data.toJSON());
    });
}

// getData((err,obj)=>{
//     console.log(obj);    
// });


module.exports = {
    getData,
    InsertData
}
