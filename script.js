require('dotenv').config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const url = cloudinary.url('logo-temp_pnufcc', {
    transformation: [
        { fetch_format: 'auto' },
        { quality: 'auto' },
        { width: 1200 }
    ]
}
);

(async function () {
    const results = await cloudinary.uploader.upload('C:/Users/nato_/Documents/Fac_Senac/Chama/roberto-almeida.png');
    console.log(results);

    const url = cloudinary.url(results.public_id, {
        transformation: [
            { fetch_format: 'auto' },
            { quality: 'auto' },
            { width: 1200 }
        ]
    });
    console.log(url);
})();