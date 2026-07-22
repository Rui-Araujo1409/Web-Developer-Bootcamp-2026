const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const express = require("express");
const multer = require("multer");

//configurar o cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

//tem que ser storage pois Multer aguarda a chave storage 
// (ou então fazer const upload = multer({storage: armazenamento})) na rota do parte
//na parte em que se importa os módulos
const storage = new CloudinaryStorage({ 
    cloudinary,
    params: {
        folder: "YelpCampo",
        allowedFormats: ["jpeg", "png", "jpg"]
    }

});

module.exports = {
    cloudinary,
    storage
}

