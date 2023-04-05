/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("barang")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("barang").insert([
        { id: 1, foto_barang: "", nama_barang: "Monitor", harga_beli: 2000000, harga_jual: 3000000, stok: 10, userid: 1 },
        { id: 2, foto_barang: "", nama_barang: "Mouse", harga_beli: 200000, harga_jual: 300000, stok: 20, userid: 1 },
        { id: 3, foto_barang: "", nama_barang: "Keyboard", harga_beli: 350000, harga_jual: 450000, stok: 20, userid: 1 },
        { id: 4, foto_barang: "", nama_barang: "headset", harga_beli: 250000, harga_jual: 350000, stok: 15, userid: 1 },
        { id: 5, foto_barang: "", nama_barang: "VGA", harga_beli: 7000000, harga_jual: 8500000, stok: 5, userid: 1 },

      ]);
    });
};
