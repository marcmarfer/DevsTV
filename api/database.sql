CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE videos (
    id_video INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(255),
    title VARCHAR(255),
    youtube_url VARCHAR(255),
    thumbnail_url VARCHAR(255),
    category VARCHAR(100)
);

CREATE TABLE bookmarked_videos (
    id_user INT,
    id_video INT,
    saved_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rating INT,
    PRIMARY KEY (id_user, id_video),
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_video) REFERENCES videos(id_video)
);

INSERT INTO users (name, email, password) VALUES
('User1', 'user1@example.com', 'password1'),
('User2', 'user2@example.com', 'password2');

INSERT INTO videos (title, reference, youtube_url, thumbnail_url, category) VALUES
('Video1', 'REF01', 'https://www.youtube.com/watch?v=u_OBuuR1f-Q&list=LL', 'https://cadenaser.com/resizer/Y2SyvGDiaElqtiN1-npSl7yH8ng=/1200x900/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/EULQ4EZPKRIE7OUVZHW3H2FYD4.jpg', 'Web Development'),
('Video2', 'REF02', 'https://www.youtube.com/watch?v=u_OBuuR1f-Q&list=LL', 'https://cadenaser.com/resizer/Y2SyvGDiaElqtiN1-npSl7yH8ng=/1200x900/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/EULQ4EZPKRIE7OUVZHW3H2FYD4.jpg', 'Cloud Computing'),
('Video3', 'REF03', 'https://www.youtube.com/watch?v=u_OBuuR1f-Q&list=LL', 'https://cadenaser.com/resizer/Y2SyvGDiaElqtiN1-npSl7yH8ng=/1200x900/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/EULQ4EZPKRIE7OUVZHW3H2FYD4.jpg', 'Mobile Development'),
('Video4', 'REF04', 'https://www.youtube.com/watch?v=u_OBuuR1f-Q&list=LL', 'https://cadenaser.com/resizer/Y2SyvGDiaElqtiN1-npSl7yH8ng=/1200x900/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/EULQ4EZPKRIE7OUVZHW3H2FYD4.jpg', 'Cloud Computing'),
('Video5', 'REF05', 'https://www.youtube.com/watch?v=u_OBuuR1f-Q&list=LL', 'https://cadenaser.com/resizer/Y2SyvGDiaElqtiN1-npSl7yH8ng=/1200x900/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/EULQ4EZPKRIE7OUVZHW3H2FYD4.jpg', 'Mobile Development'),
('Video6', 'REF06', 'https://www.youtube.com/watch?v=u_OBuuR1f-Q&list=LL', 'https://cadenaser.com/resizer/Y2SyvGDiaElqtiN1-npSl7yH8ng=/1200x900/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/EULQ4EZPKRIE7OUVZHW3H2FYD4.jpg', 'Game Development'),
('Video7', 'REF07', 'https://www.youtube.com/watch?v=u_OBuuR1f-Q&list=LL', 'https://cadenaser.com/resizer/Y2SyvGDiaElqtiN1-npSl7yH8ng=/1200x900/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/EULQ4EZPKRIE7OUVZHW3H2FYD4.jpg', 'Game Development'),
('Video8', 'REF08', 'https://www.youtube.com/watch?v=u_OBuuR1f-Q&list=LL', 'https://cadenaser.com/resizer/Y2SyvGDiaElqtiN1-npSl7yH8ng=/1200x900/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/EULQ4EZPKRIE7OUVZHW3H2FYD4.jpg', 'Artificial Intelligence');

INSERT INTO bookmarked_videos (id_user, id_video, rating) VALUES
(1, 1, 5),
(1, 2, 4),
(2, 1, 3);
