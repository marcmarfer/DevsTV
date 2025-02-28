const connection = require('../db');

const saveVideo = (req, res) => {
    const { title, reference, youtube_url, thumbnail_url, category } = req.body;
    const sql = 'INSERT INTO videos (title, reference, youtube_url, thumbnail_url, category) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [title, reference, youtube_url, thumbnail_url, category], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Hubo un error al guardar el video' });
        }
        res.json({ message: 'Video guardado exitosamente', id: result.insertId });
    });
};


const getVideos = (req, res) => {
    const sql = 'SELECT * FROM videos';
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Hubo un error al obtener los videos' });
        }
        res.json(result);
    });
};

module.exports = {
    saveVideo,
    getVideos
};