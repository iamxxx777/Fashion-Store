const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_PUBLIC,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder: folder
        }, (err, result) => {
            if(err) throw new Error("Image upload failed")
            resolve({
                url: result.secure_url,
                cloudId: result.public_id
            })
        })
    })
}

exports.destroy = (public_id) => {
    return new Promise(resolve => {
        cloudinary.uploader.destroy(public_id, (err, result) => {
            if(err) throw new Error('Failed to delete image')
            resolve(result)
        })
    })
}