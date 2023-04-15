
const User = require('../models/user')

const initialUsers = [{
    username: 'Shana',
    name: 'Shakugan no Shana',
    password: 'shana123'
},
{
    username: 'Iroha',
    name: 'Iroha Isshiki',
    password: 'iroha123'
},
{
    username: 'Anya',
    name: 'Anya Forger',
    password: 'anya123'
}]


const userWithoutUsername = {
    name: 'Anya Forger',
    password: 'anya123'
}

const userWithoutPassword = {
    username: 'Anya',
    name: 'Anya Forger',
}

const userWithoutUsernameAndPassword = {
    name: 'Anya Forger',
}

const userWithUsername2Charac = {
    username: 'An',
    name: 'Anya Forger',
    password: 'anya123'
}

const userWithPassword2Charac = {
    username: 'Anya',
    name: 'Anya Forger',
    password: 'an'
}

const userWithUsernameAndPassword2Charac = {
    username: 'An',
    name: 'Anya Forger',
    password: 'an'
}

const duplicateUser = {
    username: 'Iroha',
    name: 'Iroha Isshiki',
    password: 'iroha123'
}



module.exports = {
    initialUsers, userWithoutUsername, userWithoutPassword, userWithoutUsernameAndPassword, userWithUsername2Charac, userWithPassword2Charac, userWithUsernameAndPassword2Charac, duplicateUser
}