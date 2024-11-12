const moongose = require('mongoose');
const { BlobServiceClient } = require("@azure/storage-blob"); 

const connectDB = async() => {
    try{
        moongose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Database Connected')
    } catch(error){
        console.error(error.message);
        throw new Error('error al conectar en la database')
    }
};

let blobServiceClient; // Cache client instance

const connectAz = async () => {
    if (!blobServiceClient) { // Initialize only if not already initialized
        try {
            blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZ_CONN);
            console.log("Connected to Azure Blob Storage");
        } catch (error) {
            console.error("Failed to connect to Azure Blob Storage:", error.message);
            throw new Error("Error connecting to Azure Blob Storage");
        }
    }
    return blobServiceClient; // Return the cached client instance
};

module.exports = {connectAz, connectDB};