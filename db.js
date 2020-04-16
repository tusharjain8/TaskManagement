const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/data.db'
})

const Todos = db.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: "incomplete"
    },
    description: {
        type: Sequelize.STRING(100),
    },

    priority: {
        type: Sequelize.STRING(20),
        defaultValue: 'Medium',
    },

    duedate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
})

module.exports = {
    db,
    Todos
}