const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
    },
    status: Sequelize.BOOLEAN
})

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

module.exports = {
    db,
    Page,
    User
}
