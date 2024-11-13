const notFound = (req,res, next) => {
    return res.status(404).json({message: 'Ruta no encontrada.'})
}

module.exports = notFound;