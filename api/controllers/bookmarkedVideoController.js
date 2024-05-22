const connection = require('../db');

const saveBookmarkedVideo = (req, res) => {
    const { id_user, id_video } = req.body;
    const sql = 'INSERT INTO bookmarked_videos (id_user, id_video) VALUES (?, ?)';
    connection.query(sql, [id_user, id_video], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Hubo un error al marcar el video como guardado' });
        }
        res.json({ message: 'Video marcado como guardado exitosamente' });
    });
};

const deleteBookmarkedVideo = (req, res) => {
    const { id_user, id_video } = req.body;
    const sql = 'DELETE FROM bookmarked_videos WHERE id_user = ? AND id_video = ?';
    connection.query(sql, [id_user, id_video], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Hubo un error al desmarcar el video como guardado' });
        }
        res.json({ message: 'Video desmarcado como guardado exitosamente' });
    });
}

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
    const sql = `
        SELECT v.*
        FROM bookmarked_videos bv
        JOIN videos v ON bv.id_video = v.id_video
        WHERE bv.id_user = ?
    `;
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
    getBookmarkedVideosByUserId,
    deleteBookmarkedVideo
};

