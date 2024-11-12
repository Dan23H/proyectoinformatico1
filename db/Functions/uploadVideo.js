const { connectAz } = require('../config');

const uploadVideo = async (containerName, blobName, filePath) => {
    try {
        const blobServiceClient = await connectAz(); // Reuse the cached connection
        const containerClient = blobServiceClient.getContainerClient(containerName);
        await containerClient.createIfNotExists();
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath);
        console.log(`File '${filePath}' uploaded to blob '${blobName}' in container '${containerName}'`);
    } catch (error) {
        console.error("Error uploading video:", error.message);
        throw error;
    }
};

module.exports = { uploadVideo };

//multer para el archivo