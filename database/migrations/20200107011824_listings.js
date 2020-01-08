exports.up = function(knex) {
  return knex.schema.createTable("listings", tbl => {
    tbl.increments();

    tbl.integer("bath_num", 24).notNullable();

    tbl.integer("bed_num", 24).notNullable();

    tbl.integer("zip", 24).notNullable();

    tbl.varchar("address", 255).notNullable();

    tbl.varchar("city", 255).notNullable();

    tbl.varchar("street", 255).notNullable();

    tbl.integer("price", 255).notNullable();

    tbl.integer("sq_ft", 255).notNullable();

    tbl.varchar("email", 255).notNullable();

    tbl
      .integer("user_id", 255)
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE") // CASCADE, RESTRICT, DO NOTHING, SET NULL,
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("listings");
};
