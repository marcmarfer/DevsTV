const connection = require('../db');

const saveBookmarkedVideo = (req, res) => {
    const { userId, videoId, rating } = req.body;
    const sql = 'INSERT INTO bookmarked_videos (id_user, id_video, rating) VALUES (?, ?, ?)';
    connection.query(sql, [userId, videoId, rating], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Hubo un error al marcar el video como guardado' });
        }
        res.json({ message: 'Video marcado como guardado exitosamente' });
    });
};

const getBookmarkedVideos = (req, res) => {
    const sql = 'SELECT * FROM bookmarked_videos';
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Hubo un error al obtener los videos guardados' });
        }
        res.json(result);
    });
}

const getBookmarkedVideosByUserId = (req, res) => {
    const { userId } = req.params;
    const sql = 'SELECT * FROM bookmarked_videos WHERE id_user = ?';
    connection.query(sql, [userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Hubo un error al obtener los videos guardados' });
        }
        res.json(result);
    });
}

module.exports = {
    saveBookmarkedVideo,
    getBookmarkedVideos,
    getBookmarkedVideosByUserId
};

