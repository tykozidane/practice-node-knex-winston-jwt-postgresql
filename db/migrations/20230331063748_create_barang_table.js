/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('barang', function (table) {
        table.increments('id');
        table.string('foto_barang', 255);
        table.string('nama_barang', 255);
        table.integer('harga_beli');
        table.integer('harga_jual');
        table.integer('stok');
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.integer('user_id');
      });
  };
  
exports.down = function(knex) {
    return knex.schema
      .dropTable('barang');
  };