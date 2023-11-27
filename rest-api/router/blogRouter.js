const express = require("express");
const router = express.Router();
const BlogModel = require("../model/blog/BlogEntriesModel");
const ResponseClass = require("../model/ResponseClass");

 let publicFolder = "./public/files/";
 let multer = require('multer');
 let path = require("path");
let fs = require("fs");

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, publicFolder);
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      let nameFile =
      `${file.fieldname.replace(/\//g, '')}-${Date.now()}${path.extname(file.originalname)}`;
      req.body.image = publicFolder + nameFile;
      cb(null, nameFile);
    }
  })

const upload = multer({ storage: storage })

function deleteImage(pathImg) {
    if (pathImg != null) {
      fs.unlinkSync(pathImg);
      console.log("File deleted.");
    }
  }

router.post("/", upload.single('fileBlog'), function (req, res, next) {
    let response = new ResponseClass();

    if (req.file != null) {
      BlogModel.add(req.body, function (erro, retur) {
        if (erro) {
          response.erro = true;
          response.msg = "An error has occurred";
          console.log("erro", erro);
          deleteImage(req.body.image);
        } else {
          if (retur.affectedRows > 0) {
            response.msg = "Post completed Successfully.";
          } else {
            response.erro = true;
            response.msg = "Unale to register";
            deleteImage(req.body.image);
          }
        }
        console.log("resp: ", response);
        res.json(response);
      });
    } else {
      response.erro = true;
      response.msg = "No image was sent.";
      console.log("erro", erro);
    }
  });

  router.put("/", upload.single('fileBlog'), function (req, res, next) {
    let response = new ResponseClass();

      BlogModel.update(req.body, function (erro, retur) {
        if (erro) {
          response.erro = true;
          response.msg = "An error has occurred";
          console.log("erro", erro);
          deleteImage(req.body.image);
        } else {
          if (retur.affectedRows > 0) {
            response.msg = "Post updated Successfully";
          } else {
            response.erro = true;
            response.msg = "Unale to update";
            deleteImage(req.body.image);
          }
        }
        console.log("resp: ", response);
        res.json(response);
      });

  });

router.get("/", function (req, res, next) {
  BlogModel.getAll(function (erro, retur) {
    let response = new ResponseClass();
    if (erro) {
      response.erro = true;
      response.msg = "An error has occurred";
      console.log("erro", erro);
    } else {
      response.data = retur;
    }

    res.json(response);
  });
});

router.get("/:id?", function (req, res, next) {
  BlogModel.getId(req.params.id, function (erro, retur) {
    let response = new ResponseClass();
    if (erro) {
      response.erro = true;
      response.msg = "An error has occurred";
      console.log("erro", erro);
    } else {
      response.data = retur;
    }

    res.json(response);
  });
});

router.get("allPostUser/:id?", function (req, res, next) {
  BlogModel.getAllId(req.params.id, function (erro, retur) {
    let response = new ResponseClass();
    if (erro) {
      response.erro = true;
      response.msg = "An error has occurred";
      console.log("erro", erro);
    } else {
      response.data = retur;
    }

    res.json(response);
  });
});


router.delete("/:id", function (req, res, next) {
  BlogModel.delete(req.params.id, function (erro, retur) {
    let response = new ResponseClass();
    if (erro) {
      response.erro = true;
      response.msg = "An error has occurred";
      console.log("erro", erro);
    } else {
      if (retur.affectedRows > 0) {
        response.msg = "Post successfully deleted";
      } else {
        response.erro = true;
        response.msg = "Unale to deleted";
        deleteImage(req.body.image);
      }
    }
    console.log("resp: ", response);
    res.json(response);
  });
});

module.exports = router;
