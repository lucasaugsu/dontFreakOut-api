exports.up = function (knex) {
    return knex.schema.createTable('users', function (t) {
        t.increments('id').notNullable()
        
        t.string('name').notNullable()
        t.string('username').nullable()
        t.string('email').notNullable()
        t.string('phone').nullable()
        t.string('password').notNullable()
        t.date('birthday').nullable()
        
        t.datetime('created_at').notNullable().defaultTo(knex.raw('NOW()'))
        t.datetime('updated_at').notNullable().defaultTo(knex.raw('NOW()'))
    });
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('users')
    ])
};