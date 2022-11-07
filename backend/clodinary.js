const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

exports.uploads = (file, folder) => {
return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) => {
        resolve({
            url: result.url,
            id: result.public_id
        })
    }, {
    resource_type: "auto",
    folder: folder
    }
    )
})
}