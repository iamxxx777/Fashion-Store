const cloudinary = require('cloudinary');

const cloudinaryV = cloudinary.v2;

cloudinaryV.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_PUBLIC,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinaryV.uploader.upload(file, (result) => {
            resolve({
                url: result.secure_url,
                cloudId: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}