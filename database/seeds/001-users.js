
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'test_user1', password: 'password'},
        {username: 'test_user2', password: 'password'},
        {username: 'test_user3', password: 'password'}
      ]);
    });
};
