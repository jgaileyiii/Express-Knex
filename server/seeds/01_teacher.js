const teachers = require('../teachers')


exports.seed = function(knex, Promise) {
  return knex('teacher').del()
    .then(function () {
      return knex('teacher').insert(teachers);
    });
};
