-- this script tests the 'get_watch_count_movie' stored procedure

-- Dummy Data for Country, Accounts and Profiles
INSERT INTO Country (country_name) VALUES ('USA'), ('Germany');

INSERT INTO Account (email, password, first_name, last_name, active_subscription, country_id, user_type)
VALUES
    ('user1@example.com', 'password1', 'John', 'Doe', true, 1, 'User'),
    ('user2@example.com', 'password2', 'Alice', 'Smith', true, 2, 'User');

INSERT INTO Profile (account_id, profile_name, age, language)
VALUES
    (1, 'User1_Profile', 25, 'en'),
    (2, 'User2_Profile', 30, 'de');

-- Dummy Data for Genre and Movie
INSERT INTO Genre (title)
VALUES
    ('Action'), ('Drama'), ('Comedy');

INSERT INTO Movie (title, duration, genre_id) VALUES
    ('Movie 1', '02:30:00', 1),
    ('Movie 2', '01:45:00', 2),
    ('Movie 3', '01:55:00', 3);

-- Data for Watch_history, Movie_watch_history
INSERT INTO Watch_history (profile_id, watch_date, event_type, finished) VALUES
    (1, '2022-01-01 10:00:00', 'Start', true),
    (1, '2022-01-01 12:30:00', 'End', true),
    (2, '2022-01-01 09:45:00', 'Start', true),
    (2, '2022-01-01 11:30:00', 'End', true);

INSERT INTO Movie_watch_history (movie_id, watch_history_id, pause_time, language_settings) VALUES
    (1, 1, '00:15:00', 'en'),
    (2, 2, '00:10:00', 'es'),
    (3, 3, '00:20:00', 'en'),
    (1, 1, '00:30:00', 'en'),
    (1, 1, '00:10:00', 'en');

-- execution of function
SELECT * FROM get_watch_count_movie(1);