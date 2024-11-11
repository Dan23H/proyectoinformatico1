const errorHandler = (err,req,res) => {
    console.error(err.stack);
    return res.status(500).json({message: 'Error del servidor.'})
}

module.exports = errorHandler;