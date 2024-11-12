const { connectAz } = require('../config');
const multer = require('multer');
const { generateBlobSASQueryParameters, StorageSharedKeyCredential } = require('@azure/storage-blob');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb ) => {
        const allowedTypes = ['video/mp4', 'video/mpeg', 'video/avi'];
        if (allowedTypes.includes(file.mimetype)) {
            return cb(null, true); 
        } else {
            return cb(new Error('Solo se permiten archivos de video'), false); 
        }
    }
}).single('file'); 

const uploadVideo = async (fileBuffer, fileName) => {
    try {
        const blobServiceClient = await connectAz();
        const containerClient = blobServiceClient.getContainerClient('ecografias-1');
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);

        // Subir el archivo al contenedor
        await blockBlobClient.uploadData(fileBuffer, {
            blobHTTPHeaders: { blobContentType: "video/mp4" },
        });

        console.log("Video uploaded to Azure Blob Storage successfully.");

        // Generar SAS Token para el acceso al archivo
        const accountName = process.env.AZ_ACC_NAME;
        const accountKey = process.env.AZ_ACC_KEY;
        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

        // Generar el SAS Token con permisos de lectura (r)
        const sasToken = generateBlobSASQueryParameters(
            {
                containerName: 'ecografias-1',  // Nombre del contenedor
                blobName: fileName,             // Nombre del archivo
                permissions: 'r',               // Permisos (lectura)
                expiresOn: new Date(new Date().valueOf() + 3600 * 1000),  // Expira en 1 hora
            },
            sharedKeyCredential
        ).toString();

        // Generar la URL accesible con el SAS Token
        const videoUrlWithSas = `${blockBlobClient.url}?${sasToken}`;
        
        return videoUrlWithSas;  // Devolver URL con el SAS Token
    } catch (error) {
        console.error("Failed to upload video:", error.message);
        throw new Error("Error uploading video to Azure Blob Storage");
    }
};

module.exports = {upload,uploadVideo};