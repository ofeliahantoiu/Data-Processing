-- this script tests the 'get_watch_count_series' stored procedure

-- Dummy Data for Accounts and Profiles
INSERT INTO Country (country_name) VALUES ('USA'), ('Germany');

INSERT INTO Account (email, password, first_name, last_name, active_subscription, country_id, user_type)
VALUES
    ('user1@example.com', 'password1', 'John', 'Doe', true, 1, 'User'),
    ('user2@example.com', 'password2', 'Alice', 'Smith', true, 2, 'User');

INSERT INTO Profile (account_id, profile_name, age, language)
VALUES
    (1, 'User1_Profile', 25, 'en'),
    (2, 'User2_Profile', 30, 'de');

-- Dummy Data for Genres
INSERT INTO Genre (title) VALUES
    ('Action'),
    ('Drama'),
    ('Comedy');

-- Dummy Data for Series, Season and Episode
INSERT INTO Series (title, genre_id) VALUES
    ('Series 1', 1),
    ('Series 2', 2);

INSERT INTO Season (series_id, title) VALUES
    (1, 'Season 1'),
    (1, 'Season 2'),
    (2, 'Season 1');

INSERT INTO Episode (title, duration, season_id) VALUES
    ('Episode 1', '00:25:00', 4),
    ('Episode 2', '00:30:00', 4),
    ('Episode 3', '00:22:00', 4),
    ('Episode 4', '00:28:00', 4),
    ('Episode 5', '00:20:00', 5),
    ('Episode 6', '00:35:00', 5);

-- Data for Watch_history, Series_watch_history
INSERT INTO Watch_history (profile_id, watch_date, event_type, finished) VALUES
    (1, '2022-01-01 14:00:00', 'Start', true),
    (1, '2022-01-01 15:30:00', 'End', true),
    (1, '2022-01-01 13:45:00', 'Start', true),
    (1, '2022-01-01 16:30:00', 'End', true);

INSERT INTO Series_watch_history (series_id, season_id, episode_id, watch_history_id, pause_time, language_settings) VALUES
    (1, 4, 1, 1, '00:05:00', 'fr'),
    (1, 4, 2, 1, '00:08:00', 'fr'),
    (1, 4, 3, 2, '00:07:00', 'de'),
    (1, 4, 4, 2, '00:10:00', 'de'),
    (1, 4, 5, 3, '00:06:00', 'fr'),
    (1, 4, 6, 3, '00:12:00', 'fr');

INSERT INTO Series_watch_history (series_id, season_id, episode_id, watch_history_id, pause_time, language_settings) VALUES
    (1, 4, 1, 1, '00:05:00', 'fr'),
    (1, 4, 2, 1, '00:08:00', 'fr');

-- execution of function
SELECT * FROM get_watch_count_series(1);
