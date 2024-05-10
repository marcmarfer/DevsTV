const mysql = require('mysql');
const connection = require('../database');

exports.saveBookmarkedVideo = (req, res) => {
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
