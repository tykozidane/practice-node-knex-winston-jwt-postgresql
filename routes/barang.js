const router = require("express").Router();
// const { default: knex } = require('knex')
const client = require("../connection");
const { verifyToken } = require("./verifyToken");
const knexConfig = require("../db/knexfile");
const knex = require("knex")(knexConfig["development"]);

//Route to Get Data Barang
router.get("/data", verifyToken, (req, res) => {
  // console.log("tes")
  // res.send("jalan kok")
  // client.query('Select * from barang', (err, result) => {
  //     if(!err){
  //         res.send(result.rows)
  //     }
  // })
  knex("barang")
    .then((barang) => {
      // logger.info({ Method: req.method, Httpstatus: req.statusCode, headers: req.headers });

      return res.status(200).json(barang);
    })
    .catch((err) => {
      // console.error(err);
      // logger.error("Method: " + req.method + ", Error: " + err);
      return res.status(500).json({ success: false, message: err, status: res.statusCode });
    });
});

//Route to get By Id Data Barang
router.get("/data/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  knex("barang")
    .where("id", id)
    .first()
    .then((barang) => {
      if (!barang)return res.status(200).json({ success: false, message: "Data tidak ditemukan." });
      return res.status(200).json(barang);
    })
    .catch((err) => {
      // res.body.json("Empty");
      console.error(err);
      return res.status(500).json({ success: false, message: err });
    });
});

//Route to get Data Barang By User Id
router.get("/data/user/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  knex("barang")
    .where("user_id", id)
    .then((barang) => {
      // return res.status(200).json({massage: "kosong"});
      if (!barang.length) return res.status(200).json({ success: false, message: "Data tidak ditemukan." });
      return res.status(200).json(barang);
    })
    .catch((err) => {
      console.error(err);
      // res.body = "empty";
      return res.status(500).json({ success: false, message: err });
    });
});

//Route to Post New Data Barang
router.post("/upload", verifyToken, (req, res) => {
  const barangbaru = req.body;
  barangbaru["user_id"] = req.user.id;
  //   if (!nama_barang) res.json({ success: false, message: "Nama Barang tidak boleh kosong" });
  // client.query((`insert into barang(foto_barang, nama_barang, harga_beli, harga_jual, stok) values('${foto_barang}', '${nama_barang}', '${harga_beli}', '${harga_jual}', '${stok}') `), (err, result) => {
  //     if(err){
  //        res.send(err.message)
  //     } else {
  //          res.send("Insert Successfully")
  //     }
  // })
  knex("barang")
    .insert(barangbaru)
    .then(() => {
      res.status(200).json(barangbaru);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ success: false, message: err });
    });
});

//Route to Update Data Barang
router.put("/update/:id", verifyToken, (req, res) => {
  const { foto_barang, nama_barang, harga_beli, harga_jual, stok } = req.body;
  const id = req.params.id;
  //   client.query(
  //     `update barang set foto_barang = '${foto_barang}', nama_barang = '${nama_barang}', harga_beli = '${harga_beli}', harga_jual = '${harga_jual}', stok = '${stok}' where id = '${id}'`,
  //     (err, result) => {
  //       if (!err) {
  //         res.send("Update Successfully");
  //       } else {
  //         res.send(err.message);
  //       }
  //     }
  //   );
  knex("barang")
    .where("id", id)
    .update({
      foto_barang: foto_barang,
      nama_barang: nama_barang,
      harga_beli: harga_beli,
      harga_jual: harga_jual,
      stok: stok,
    })
    .then(() => {
      knex("barang")
        .where("id", id)
        .then((barang) => {
          return res.status(200).json(barang);
        });
    });
});

//Route to delete Data Barang
router.delete("/delete/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  //   client.query(`delete from barang where id = '${id}'`, (err, result) => {
  //     if (!err) {
  //       res.send("Delete Succeddfully");
  //     } else {
  //       res.send(err.message);
  //     }
  //   });
  knex("barang")
    .where("id", id)
    .del()
    .then(() => {
      return res.status(200).json({ success: true, message: "Data telah berhasil di hapus" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ success: false, message: err });
    });
});

module.exports = router;
