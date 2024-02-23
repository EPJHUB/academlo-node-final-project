const User = require("../../models/User")

const userCreate = async () => {

    await User.create({
        firstName: 'Fernando',
        lastName: 'Hernandez',
        email: 'fernando@gmail.com',
        password: 'fernando1234',
        phone: '+123456'
    }) 
}

module.exports = userCreate