const sequelize = require('../utils/connection');
const userCreate = require('./createData/user.Create');
require('../models')

const testMigrate = async () => {

    try {
        await sequelize.sync({ force: true })
        console.log('DB reset ✅');
        await userCreate()
        process.exit()
    } catch (error) {
        console.error(error);
    }
}

testMigrate()