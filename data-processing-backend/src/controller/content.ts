import e, { Request, Response } from 'express';
import { db } from '../db';
import responder from '../utils/responder';
import { User } from '../types/user';
import { isValidTimeInterval, validateNumbers, languageValidator } from '../utils/validators';
import { ITask } from 'pg-promise';


export const postStartWatchMovie = async (req: Request & { user?: User }, res: Response): Promise<void> => {

    const movieId: number = req.body.movieId!;
    const profileId: string = req.params.profileId!;

    // TODO: Check if startTime is not longer than movie duration and  if the movieObject is finished, then start the movie from beggining  if its within 3 minitues of movie length then set the finished to true

    if (!req.body.movieId || !req.params.profileId) {
        responder(res, 400, 'error', 'ID parameters are required');
        return;
    }

    if (isNaN(Number(movieId)) || isNaN(Number(profileId))) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    if (!validateNumbers([(Number(movieId)), (Number(profileId))])) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    // Check if profile exists and if it matches the user
    try {
        const profileObject = await db.oneOrNone('SELECT * FROM Profile WHERE profile_id = ${profileId} AND account_id = ${accountId}', {
            profileId: profileId,
            accountId: req.user!.account_id
        });

        if (profileObject === null) {
            responder(res, 401, 'error', 'Unauthorized');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    // Check if movie exists
    try {
        const movieObject = await db.oneOrNone('SELECT * FROM Movie WHERE movie_id = ${movieId}', {
            movieId: movieId
        });

        if (movieObject === null) {
            responder(res, 404, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    // Check if the latest movie watch history has event_type "End" in watch_history
    try {
        const watchHistoryObject = await db.oneOrNone('SELECT * FROM watch_history WHERE profile_id = $<profileId> ORDER BY watch_date DESC LIMIT 1', {
            profileId: profileId
        });

        if (watchHistoryObject !== null && watchHistoryObject.event_type === 'Start') {
            responder(res, 400, 'error', 'Previous movie watch history has not ended yet');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
    }

    try {
        await db.tx(async (t: ITask<any>) => {
            // Fetch previous watch history
            const previousWatchHistoryObject = await t.oneOrNone(
                `SELECT * FROM watch_history 
                WHERE profile_id = $<profileId> AND event_type = $<eventType> 
                ORDER BY watch_date DESC 
                LIMIT 1`, 
                {
                    profileId,
                    eventType: 'End',
                }
            );
    
            // Fetch language settings for the profile
            const languageSettings = await t.oneOrNone(
                `SELECT language 
                FROM profile 
                WHERE profile_id = $<profileId>`, 
                { profileId }
            );
    
            // Check if previous watch history exists or if the movie was finished last time
            if (!previousWatchHistoryObject || previousWatchHistoryObject.finished === true) {
                // If it doesn't exist, start the movie from the beginning
                const watchHistoryObject = await t.one(
                    `INSERT INTO watch_history (profile_id, event_type, finished) 
                    VALUES ($<profileId>, $<eventType>, $<finished>) 
                    RETURNING watch_history_id`, 
                    {
                        profileId,
                        eventType: 'Start',
                        finished: false,
                    }
                );
    
                await t.none(
                    `INSERT INTO movie_watch_history (movie_id, pause_time, language_settings, watch_history_id) 
                    VALUES ($<movieId>, $<pauseTime>, $<languageSettings>, $<watchHistoryId>)`, 
                    {
                        movieId,
                        pauseTime: '00:00:00',
                        languageSettings: languageSettings?.language, // Optional chaining for safety
                        watchHistoryId: watchHistoryObject.watch_history_id,
                    }
                );
            } else {
                // If it exists, resume the movie from the last movie history entry
                const startTime = await t.one(
                    `SELECT pause_time 
                    FROM movie_watch_history 
                    WHERE watch_history_id = $<watchHistoryId>`, 
                    {
                        watchHistoryId: previousWatchHistoryObject.watch_history_id,
                    }
                );
    
                const watchHistoryObject = await t.one(
                    `INSERT INTO watch_history (profile_id, event_type, finished) 
                    VALUES ($<profileId>, $<eventType>, $<finished>) 
                    RETURNING watch_history_id`, 
                    {
                        profileId,
                        eventType: 'Start',
                        finished: false,
                    }
                );
    
                await t.none(
                    `INSERT INTO movie_watch_history (movie_id, pause_time, language_settings, watch_history_id) 
                    VALUES ($<movieId>, $<pauseTime>, $<languageSettings>, $<watchHistoryId>)`, 
                    {
                        movieId,
                        pauseTime: startTime.pause_time,
                        languageSettings: languageSettings?.language, // Optional chaining for safety
                        watchHistoryId: watchHistoryObject.watch_history_id,
                    }
                );
            }
        });
    
        responder(res, 201, 'message', 'Movie watch history created');
        return;
    } catch (err) {
        console.error('Transaction error:', err); // Log error for debugging
        responder(res, 500, 'error', 'Internal server error');
        return;
    };
};
export const postEndWatchMovie = async (req: Request & { user?: User }, res: Response): Promise<void> => {

    const movieId: string = req.body.movieId!;
    const profileId: string = req.params.profileId!;
    const endTime: string = req.body.endTime!;

    if (!req.body.movieId || !req.params.profileId) {
        responder(res, 400, 'error', 'ID parameters are required');
        return;
    }

    if (isNaN(Number(movieId)) || isNaN(Number(profileId))) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    if (!validateNumbers([(Number(movieId)), (Number(profileId))])) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    if (!isValidTimeInterval(endTime)) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    // Check if profile exists and if it matches the user
    try {
        const profileObject = await db.oneOrNone('SELECT * FROM Profile WHERE profile_id = ${profileId} AND account_id = ${accountId}', {
            profileId: profileId,
            accountId: req.user!.account_id
        });

        if (profileObject === null) {
            responder(res, 401, 'error', 'Unauthorized');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    // Check if movie exists
    try {
        const movieObject = await db.oneOrNone('SELECT * FROM Movie WHERE movie_id = ${movieId}', {
            movieId: movieId
        });

        if (movieObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    // Check if the latest movie watch history has event_type "Start" in watch_history
    try {
        const watchHistoryObject = await db.oneOrNone('SELECT * FROM watch_history WHERE profile_id = $<profileId> ORDER BY watch_date DESC LIMIT 1', {
            profileId: profileId
        });

        try {
            const movieWatchHistoryObject = await db.oneOrNone('SELECT * FROM movie_watch_history WHERE watch_history_id = $<watchHistoryId>', {
                watchHistoryId: watchHistoryObject.watch_history_id
            });

            if (watchHistoryObject !== null && watchHistoryObject.event_type === 'End') {
                responder(res, 400, 'error', 'Previous movie watch history has already ended');
                return;
            };

            //Check if the movie watch history matches the movie so you wont be able to start a new movie and end a different movie
            if (watchHistoryObject !== null && movieWatchHistoryObject.movie_id !== Number(movieId)) {
                responder(res, 400, 'error', 'Previous movie watch history does not match the movie');
                return;
            };

        } catch (err) {
            responder(res, 500, 'error', 'Internal server error');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    };

    //Check if endTime is not longer than movie duration
    try {
        const movieDuration = await db.one('SELECT duration FROM movie WHERE movie_id = ${movieId}', {
            movieId: movieId
        });

        if (endTime > movieDuration.duration) {
            responder(res, 400, 'error', 'End time is longer than movie duration');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Create new movie watch entry
    try {
        await db.tx(async (t: ITask<any>) => {
            const movieObject = await t.one('SELECT *, TO_CHAR(duration, \'HH24:MI:SS\') AS formatted_duration FROM movie WHERE movie_id = $1', [movieId]);

            // Access the formatted duration from the result
            const formattedDuration = movieObject.formatted_duration;

            const finished: boolean = endTime === movieObject.formatted_duration ? true : false;

            const languageSettings = await t.oneOrNone('SELECT language FROM profile WHERE profile_id = ${profileId}', {
                profileId: profileId
            });

            const watchHisoryObject = await t.one('INSERT INTO watch_history (profile_id, event_type, finished) VALUES ($<profileId>, $<eventType>, $<finished>) RETURNING watch_history_id', {
                profileId: profileId,
                eventType: 'End',
                finished: finished
            });

            await t.none('INSERT INTO movie_watch_history (movie_id,  pause_time, language_settings, watch_history_id) VALUES ($<movieId>, $<pauseTime>, $<languageSettings>, $<watchHistoryId>)', {
                movieId: movieId,
                pauseTime: endTime,
                languageSettings: languageSettings.language,
                watchHistoryId: watchHisoryObject.watch_history_id,
            });
        });
        responder(res, 201, 'success', 'Movie watch history created');
        return;
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }
};

export const getWatchMovie = async (req: Request & { user?: User }, res: Response): Promise<void> => {

    const movieId: string = req.params.movieId!;

    //Make sure parameters are sumbitted
    if (!req.params.movieId) {
        responder(res, 400, 'error', 'ID parameters are required');
        return;
    }

    //Make sure parameters are numbers
    if (isNaN(Number(movieId))) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    //Make sure parameters are valid numbers
    if (!validateNumbers([(Number(movieId))])) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    //Check if movie exists
    try {
        const movieObject = await db.oneOrNone('SELECT * FROM Movie WHERE movie_id = ${movieId}', {
            movieId: movieId
        });

        if (movieObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    try {

        const movieObject = await db.oneOrNone('SELECT * FROM Movie WHERE movie_id = ${movieId}', {
            movieId: movieId
        });

        responder(res, 200, 'success', movieObject);
        return;

    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }
};

export const getWatchMovieSubtitle = async (req: Request & { user?: User }, res: Response): Promise<void> => {

    const movieId: string = req.params.movieId!;
    const subtitleLanguage: string = req.query.language! ? req.query.language!.toString() : 'English'; //if user does not specify language then default to English


    //Check if language is valid
    if (!languageValidator(subtitleLanguage)) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    //Make sure parameters are sumbitted
    if (!req.params.movieId) {
        responder(res, 400, 'error', 'ID parameters are required');
        return;
    }

    //Make sure parameters are numbers
    if (isNaN(Number(movieId))) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    //Make sure parameters are valid numbers
    if (!validateNumbers([(Number(movieId))])) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    //Check if movie exists
    try {
        const movieObject = await db.oneOrNone('SELECT * FROM Movie WHERE movie_id = ${movieId}', {
            movieId: movieId
        });

        if (movieObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    try {

        const movieObject = await db.oneOrNone('SELECT * FROM Movie WHERE movie_id = ${movieId}', {
            movieId: movieId
        });

        try {
            const subtitleObject = await db.one(
                `SELECT s.subtitle_location
                     FROM available_languages AS al
                     JOIN subtitle AS s ON s.subtitle_id = al.subtitle_id
                     JOIN languages AS l ON l.language_id = al.language_id
                     WHERE l.language_name = $<languageName> AND al.movie_id = $<movieId>
                     `, {
                languageName: subtitleLanguage,
                movieId: movieId
            })

            responder(res, 200, 'movieObject', movieObject, 'subtitleLocation', subtitleObject.subtitle_location);
            return;

        } catch (err) {
            responder(res, 500, 'error', 'Internal server error');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    };
};

export const postStartWatchSeries = async (req: Request & { user?: User }, res: Response): Promise<void> => {

    interface episodeInfoObject {
        series_id: number,
        series_title: string,
        season_title: string,
        episode_id: number,
        episode_title: string,
        duration: string,
    };

    const profileId: string = req.params.profileId!;
    const seriesId: number = Number(req.body.seriesId!);
    const seasonId: number = Number(req.body.seasonId!);
    const episodeId: number = Number(req.body.episodeId!);

    let episodeInfoObject: episodeInfoObject | null = null;
    let previousWatchHistoryObject: any;

    //Make sure parameters are sumbitted
    if (!req.params.profileId || !req.body.seriesId || !req.body.seasonId || !req.body.episodeId) {
        responder(res, 400, 'error', 'ID parameters are required');
        return;
    };

    //Make sure profileId is a number
    if (isNaN(Number(profileId))) {
        responder(res, 400, 'error', 'Invalid Request');
    };

    //Make sure valid Numbers
    if (!validateNumbers([Number(profileId), seriesId, seasonId, episodeId])) {
        responder(res, 400, 'error', 'Invalid Request');
    };

    //Check if profile exists and if it matches the user
    try {
        const profileObject = await db.oneOrNone('SELECT * FROM Profile WHERE profile_id = ${profileId} AND account_id = ${accountId}', {
            profileId: profileId,
            accountId: req.user!.account_id
        });

        if (profileObject === null) {
            responder(res, 401, 'error', 'Unauthorized');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Check if series exists
    try {
        const seriesObject = await db.oneOrNone('SELECT * FROM Series WHERE series_id = ${seriesId}', {
            seriesId: seriesId
        });

        if (seriesObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Check if season exists
    try {
        const seasonObject = await db.oneOrNone('SELECT * FROM Season WHERE season_id = ${seasonId}', {
            seasonId: seasonId
        });

        if (seasonObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Check if episode exists
    try {
        const episodeObject = await db.oneOrNone('SELECT * FROM Episode WHERE episode_id = ${episodeId}', {
            episodeId: episodeId
        });

        if (episodeObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Check if the latest series watch history has event_type "End" in watch_history
    try {
        const watchHistoryObject = await db.oneOrNone('SELECT * FROM watch_history WHERE profile_id = $<profileId> ORDER BY watch_date DESC LIMIT 1', {
            profileId: profileId
        });

        if (watchHistoryObject !== null && watchHistoryObject.event_type === 'Start') {
            responder(res, 400, 'error', 'Previous contents watch history has not ended yet');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
    }

    //Create new series watch entry
    //TODO check if the there is watch history entry associated with this series and if yes store it in a external variable (and make sure its not the last episode of the last season)
    try {
        const watchHistoryObject = await db.oneOrNone(
            `SELECT *
             FROM watch_history AS wh
             JOIN series_watch_history AS swh ON swh.watch_history_id = wh.watch_history_id
             WHERE wh.profile_id = $<profileId> AND swh.series_id = $<seriesId> AND swh.season_id = $<seasonId> AND swh.episode_id = $<episodeId>
             ORDER BY wh.watch_date DESC LIMIT 1
             `, {
            profileId: profileId,
            seriesId: seriesId,
            seasonId: seasonId,
            episodeId: episodeId
        });

        //If there is a watch history entry then extract the inforomation from the episode/season/series, make a table of them it and save it into a variable outside of the try catch block
        if (watchHistoryObject !== null) {
            previousWatchHistoryObject = watchHistoryObject;
            try {
                const seriesWatchHistoryObject: episodeInfoObject = await db.one(
                    `SELECT ser.series_id AS series_id, ser.title AS series_title, sea.season_id AS season_id, sea.title AS season_title, episode_id, ep.title AS episode_title, duration
                    FROM series AS ser
                    JOIN season AS sea ON sea.series_id = ser.series_id
                    JOIN episode AS ep ON ep.season_id = sea.season_id
                    WHERE ser.series_id = $<seriesId> AND sea.season_id = $<seasonId> AND ep.episode_id = $<episodeId>
                        `, {
                    seriesId: watchHistoryObject.series_id,
                    seasonId: watchHistoryObject.season_id,
                    episodeId: watchHistoryObject.episode_id
                })
                episodeInfoObject = seriesWatchHistoryObject;
            } catch (err) {
                responder(res, 500, 'error', 'Internal server error');
                return;
            }
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    /*Create new series watch entry
    if there is no watch history entry then create a new one, if there is then continue it from pause time. 
    if the episode is finised then start the next episode, 
    if the season is finished then start the next season, 
    if its the last episode of the last season then start from the beggining
    */

    try {
        await db.tx(async (t: ITask<any>) => {
            const languageSettings = await t.oneOrNone('SELECT language FROM profile WHERE profile_id = ${profileId}', {
                profileId: profileId
            });

            //Check if previous watch history does not exist so you can start the series from beggining
            if (previousWatchHistoryObject === null) {
                //If doesnt exist then start the series from beggining

                const watchHisoryObject = await t.one('INSERT INTO watch_history (profile_id, event_type, finished) VALUES ($<profileId>, $<eventType>, $<finished>) RETURNING watch_history_id', {
                    profileId: profileId,
                    eventType: 'Start',
                    finished: false
                })

                await t.none('INSERT INTO series_watch_history (series_id, season_id, episode_id, pause_time, watch_history_id, language_settings) VALUES ($<seriesId>, $<seasonId>, $<episodeId>, $<pauseTime>, $<watchHistoryId>, $<languageSettings>)', {
                    seriesId: seriesId,
                    seasonId: seasonId,
                    episodeId: episodeId,
                    pauseTime: '00:00:00',
                    watchHistoryId: watchHisoryObject.watch_history_id,
                    languageSettings: languageSettings.language
                });
            }
            // if previous watch history exists then first check if its finished. If its not then continue from the pause time
            if (previousWatchHistoryObject && previousWatchHistoryObject.finished === false) {

                const watchHisoryObject = await t.one('INSERT INTO watch_history (profile_id, event_type, finished) VALUES ($<profileId>, $<eventType>, $<finished>) RETURNING watch_history_id', {
                    profileId: profileId,
                    eventType: 'Start',
                    finished: false
                })

                await t.none('INSERT INTO series_watch_history (series_id, season_id, episode_id, pause_time, watch_history_id, language_settings) VALUES ($<seriesId>, $<seasonId>, $<episodeId>, $<pauseTime>, $<watchHistoryId>, $<languageSettings>)', {
                    seriesId: seriesId,
                    seasonId: seasonId,
                    episodeId: episodeId,
                    pauseTime: previousWatchHistoryObject.pause_time,
                    watchHistoryId: watchHisoryObject.watch_history_id,
                    languageSettings: languageSettings.language
                });
            }

            const watchHistorySeasonNumber = episodeInfoObject!.season_title.split(' ')[1];
            console.log(watchHistorySeasonNumber);
            const watchHistoryEpisodeNumber = episodeInfoObject!.episode_title.split(' ')[1];
            console.log(watchHistoryEpisodeNumber)

            // if previous watch history exists and its finished then check if its the last episode of the season or if its the last episode of the last season. If its not then start the next episode
            if (previousWatchHistoryObject && previousWatchHistoryObject.finished === true) {
                if ((Number(watchHistoryEpisodeNumber) % 4 === 0) && (Number(watchHistorySeasonNumber) % 4 === 0)) {
                    //start first episode of the first season

                    //Fetch the first episode of series
                    const firstEpisodeObject = await t.one(`
                     SELECT * 
                     FROM series AS ser
                     JOIN season AS sea ON sea.series_id = ser.series_id
                     JOIN episode AS ep ON ep.season_id = sea.season_id
                     WHERE ser.series_id = $<seriesId> AND sea.title = $<seasonTitle> AND ep.title = $<episodeTitle>
                     `, {
                        seriesId: seriesId,
                        seasonTitle: 'Season 1',
                        episodeTitle: 'Episode 1'
                    });

                    //start first episode of the next season
                    const watchHisoryObject = await t.one('INSERT INTO watch_history (profile_id, event_type, finished) VALUES ($<profileId>, $<eventType>, $<finished>) RETURNING watch_history_id', {
                        profileId: profileId,
                        eventType: 'Start',
                        finished: false
                    });

                    await t.none('INSERT INTO series_watch_history (series_id, season_id, episode_id, pause_time, watch_history_id, language_settings) VALUES ($<seriesId>, $<seasonId>, $<episodeId>, $<pauseTime>, $<watchHistoryId>, $<languageSettings>)', {
                        seriesId: seriesId,
                        seasonId: firstEpisodeObject.sea.season_id,
                        episodeId: firstEpisodeObject.ep.episode_id,
                        pauseTime: '00:00:00',
                        watchHistoryId: watchHisoryObject.watch_history_id,
                        languageSettings: languageSettings.language
                    });
                };

                if ((Number(watchHistoryEpisodeNumber) % 4 === 0)) {
                    //start first episode of the next season
                    const watchHisoryObject = await t.one('INSERT INTO watch_history (profile_id, event_type, finished) VALUES ($<profileId>, $<eventType>, $<finished>) RETURNING watch_history_id', {
                        profileId: profileId,
                        eventType: 'Start',
                        finished: false
                    });

                    await t.none('INSERT INTO series_watch_history (series_id, season_id, episode_id, pause_time, watch_history_id, language_settings) VALUES ($<seriesId>, $<seasonId>, $<episodeId>, $<pauseTime>, $<watchHistoryId>, $<languageSettings>)', {
                        seriesId: seriesId,
                        seasonId: seasonId + 1,
                        episodeId: episodeId + 1,
                        pauseTime: '00:00:00',
                        watchHistoryId: watchHisoryObject.watch_history_id,
                        languageSettings: languageSettings.language
                    });
                };

                if (watchHistoryEpisodeNumber !== '4') {
                    const watchHisoryObject = await t.one('INSERT INTO watch_history (profile_id, event_type, finished) VALUES ($<profileId>, $<eventType>, $<finished>) RETURNING watch_history_id', {
                        profileId: profileId,
                        eventType: 'Start',
                        finished: false
                    });

                    await t.none('INSERT INTO series_watch_history (series_id, season_id, episode_id, pause_time, watch_history_id, language_settings) VALUES ($<seriesId>, $<seasonId>, $<episodeId>, $<pauseTime>, $<watchHistoryId>, $<languageSettings>)', {
                        seriesId: seriesId,
                        seasonId: seasonId,
                        episodeId: episodeId + 1,
                        pauseTime: '00:00:00',
                        watchHistoryId: watchHisoryObject.watch_history_id,
                        languageSettings: languageSettings.language
                    });
                };
            };
        });
        responder(res, 201, 'success', 'Series watch history created');
        return;
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    };
};

export const postEndWatchSeries = async (req: Request & { user?: User }, res: Response): Promise<void> => {

    const profileId: string = req.params.profileId!;
    const seriesId: number = Number(req.body.seriesId!);
    const seasonId: number = Number(req.body.seasonId!);
    const episodeId: number = Number(req.body.episodeId!);
    const endTime: string = req.body.endTime!;

    //Make sure parameters are sumbitted
    if (!req.params.profileId || !req.body.seriesId || !req.body.seasonId || !req.body.episodeId) {
        responder(res, 400, 'error', 'ID parameters are required');
        return;
    };

    //Make sure profileId is a number
    if (isNaN(Number(profileId))) {
        responder(res, 400, 'error', 'Invalid Request');
    };

    //Make sure valid Numbers
    if (!validateNumbers([Number(profileId), seriesId, seasonId, episodeId])) {
        responder(res, 400, 'error', 'Invalid Request');
    };

    if (!isValidTimeInterval(endTime)) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    //Check if profile exists and if it matches the user
    try {
        const profileObject = await db.oneOrNone('SELECT * FROM Profile WHERE profile_id = ${profileId} AND account_id = ${accountId}', {
            profileId: profileId,
            accountId: req.user!.account_id
        });

        if (profileObject === null) {
            responder(res, 401, 'error', 'Unauthorized');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Check if series exists
    try {
        const seriesObject = await db.oneOrNone('SELECT * FROM Series WHERE series_id = ${seriesId}', {
            seriesId: seriesId
        });

        if (seriesObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Check if season exists
    try {
        const seasonObject = await db.oneOrNone('SELECT * FROM Season WHERE season_id = ${seasonId}', {
            seasonId: seasonId
        });

        if (seasonObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Check if episode exists
    try {
        const episodeObject = await db.oneOrNone('SELECT * FROM Episode WHERE episode_id = ${episodeId}', {
            episodeId: episodeId
        });

        if (episodeObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Check if the latest series watch history has event_type "Start" in watch_history
    try {
        const watchHistoryObject = await db.oneOrNone('SELECT * FROM watch_history WHERE profile_id = $<profileId> ORDER BY watch_date DESC LIMIT 1', {
            profileId: profileId
        });

        try {
            const seriesWatchHistoryObject = await db.oneOrNone('SELECT * FROM series_watch_history WHERE watch_history_id = $<watchHistoryId>', {
                watchHistoryId: watchHistoryObject.watch_history_id
            });

            if (watchHistoryObject !== null && watchHistoryObject.event_type === 'End') {
                responder(res, 400, 'error', 'Previous contents watch history has already ended');
                return;
            };

            //Check if the series watch history matches the series so you wont be able to start a new series and end a different series
            if (watchHistoryObject !== null && (seriesWatchHistoryObject.series_id !== seriesId || seriesWatchHistoryObject.season_id !== seasonId || seriesWatchHistoryObject.episode_id !== episodeId)) {
                responder(res, 400, 'error', 'Previous series watch history does not match the series');
                return;
            };

        } catch (err) {
            responder(res, 500, 'error', 'Internal server error');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Check if endTime is not longer than episode duration
    try {
        const episodeDuration = await db.one('SELECT duration FROM episode WHERE episode_id = ${episodeId}', {
            episodeId: episodeId
        });

        if (endTime > episodeDuration.duration) {
            responder(res, 400, 'error', 'End time is longer than episode duration');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Create new series watch entry
    try {
        await db.tx(async (t: ITask<any>) => {
            const seriesObject = await t.one('SELECT *, TO_CHAR(duration, \'HH24:MI:SS\') AS formatted_duration FROM episode WHERE episode_id = $<episodeId>', {
                episodeId: episodeId
            });

            // Access the formatted duration from the result
            const formattedDuration = seriesObject.formatted_duration;

            const finished: boolean = endTime === formattedDuration ? true : false;

            const languageSettings = await t.oneOrNone('SELECT language FROM profile WHERE profile_id = ${profileId}', {
                profileId: profileId
            });

            const watchHisoryObject = await t.one('INSERT INTO watch_history (profile_id, event_type, finished) VALUES ($<profileId>, $<eventType>, $<finished>) RETURNING watch_history_id', {
                profileId: profileId,
                eventType: 'End',
                finished: finished
            });

            await t.none('INSERT INTO series_watch_history (series_id, season_id, episode_id, pause_time, watch_history_id, language_settings) VALUES ($<seriesId>, $<seasonId>, $<episodeId>, $<pauseTime>, $<watchHistoryId>, $<languageSettings>)', {
                seriesId: seriesId,
                seasonId: seasonId,
                episodeId: episodeId,
                pauseTime: endTime,
                watchHistoryId: watchHisoryObject.watch_history_id,
                languageSettings: languageSettings.language
            });
        });
        responder(res, 201, 'success', 'Series watch history created');
        return;
    } catch (err) {
        console.log(err)
        responder(res, 500, 'error', 'Internal server error');
        return;
    };
};

export const getWatchSeries = async (req: Request & { user?: User }, res: Response): Promise<void> => {

    interface episodeInfoObject {
        series_id: number,
        series_title: string,
        season_title: string,
        episode_id: number,
        episode_title: string,
        duration: string,
    };

    const seriesId: string = req.params.seriesId!;
    const seasonId: string = req.params.seasonId!;
    const episodeId: string = req.params.episodeId!;

    //Make sure parameters are sumbitted
    if (!req.params.seriesId || !req.params.seasonId || !req.params.episodeId) {
        responder(res, 400, 'error', 'ID parameters are required');
        return;
    };

    //Make sure parameters are numbers
    if (isNaN(Number(seriesId)) || isNaN(Number(seasonId)) || isNaN(Number(episodeId))) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    };

    //Make sure parameters are valid numbers
    if (!validateNumbers([Number(seriesId), Number(seasonId), Number(episodeId)])) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    };

    //Check if series exists

    try {
        const seriesObject = await db.oneOrNone('SELECT * FROM Series WHERE series_id = ${seriesId}', {
            seriesId: seriesId
        });

        if (seriesObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Check if season exists

    try {
        const seasonObject = await db.oneOrNone('SELECT * FROM Season WHERE season_id = ${seasonId}', {
            seasonId: seasonId
        });

        if (seasonObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Check if episode exists

    try {
        const episodeObject = await db.oneOrNone('SELECT * FROM Episode WHERE episode_id = ${episodeId}', {
            episodeId: episodeId
        });

        if (episodeObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //return content
    try {
    const seriesWatchHistoryObject: episodeInfoObject = await db.one(
        `SELECT ser.series_id AS series_id, ser.title AS series_title, sea.season_id AS season_id, sea.title AS season_title, episode_id, ep.title AS episode_title, duration
        FROM series AS ser
        JOIN season AS sea ON sea.series_id = ser.series_id
        JOIN episode AS ep ON ep.season_id = sea.season_id
        WHERE ser.series_id = $<seriesId> AND sea.season_id = $<seasonId> AND ep.episode_id = $<episodeId>
            `, {
        seriesId: seriesId,
        seasonId: seasonId,
        episodeId: episodeId
    })

    responder(res, 200, 'success', seriesWatchHistoryObject);
    return;

    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }


};

export const getWatchSeriesSubtitle = async (req: Request & { user?: User }, res: Response): Promise<void> => {

    interface episodeInfoObject {
        series_id: number,
        series_title: string,
        season_title: string,
        episode_id: number,
        episode_title: string,
        duration: string,
    };

    const seriesId: string = req.params.seriesId!;
    const seasonId: string = req.params.seasonId!;
    const episodeId: string = req.params.episodeId!;
    const subtitleLanguage: string = req.query.language! ? req.query.language!.toString() : 'English'; //if user does not specify language then default to English

    //Check if language is valid
    if (!languageValidator(subtitleLanguage)) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    //Make sure parameters are sumbitted
    if (!req.params.seriesId || !req.params.seasonId || !req.params.episodeId) {
        responder(res, 400, 'error', 'ID parameters are required');
        return;
    };

    //Make sure parameters are numbers
    if (isNaN(Number(seriesId)) || isNaN(Number(seasonId)) || isNaN(Number(episodeId))) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    };

    //Make sure parameters are valid numbers
    if (!validateNumbers([Number(seriesId), Number(seasonId), Number(episodeId)])) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    };

    //Check if series exists

    try {
        const seriesObject = await db.oneOrNone('SELECT * FROM Series WHERE series_id = ${seriesId}', {
            seriesId: seriesId
        });

        if (seriesObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Check if season exists
    try {
        const seasonObject = await db.oneOrNone('SELECT * FROM Season WHERE season_id = ${seasonId}', {
            seasonId: seasonId
        });

        if (seasonObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return
    }

    //Check if episode exists
    try {
        const episodeObject = await db.oneOrNone('SELECT * FROM Episode WHERE episode_id = ${episodeId}', {
            episodeId: episodeId
        });

        if (episodeObject === null) {
            responder(res, 400, 'error', 'Content not found');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
    }

    //return content
    try {
        const seriesWatchHistoryObject: episodeInfoObject = await db.one(
            `SELECT ser.series_id AS series_id, ser.title AS series_title, sea.season_id AS season_id, sea.title AS season_title, episode_id, ep.title AS episode_title, duration
            FROM series AS ser
            JOIN season AS sea ON sea.series_id = ser.series_id
            JOIN episode AS ep ON ep.season_id = sea.season_id
            WHERE ser.series_id = $<seriesId> AND sea.season_id = $<seasonId> AND ep.episode_id = $<episodeId>
                `, {
            seriesId: seriesId,
            seasonId: seasonId,
            episodeId: episodeId
        });
        
        try {
            const subtitleObject = await db.one(
                `SELECT s.subtitle_location
                     FROM available_languages AS al
                     JOIN subtitle AS s ON s.subtitle_id = al.subtitle_id
                     JOIN languages AS l ON l.language_id = al.language_id
                     WHERE l.language_name = $<languageName> AND al.series_id = $<seriesId>
                     `, {
                languageName: subtitleLanguage,
                seriesId: seriesId,
                seasonId: seasonId,
                episodeId: episodeId
            })

            responder(res, 200, 'seriesWatchHistoryObject', seriesWatchHistoryObject, 'subtitleLocation', subtitleObject.subtitle_location);
            return;

        } catch (err) {
            responder(res, 500, 'error', 'Internal server error');
            return;
        }
       
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

};

export const getProfileWatchHistory = async (req: Request & { user?: User }, res: Response): Promise<void> => {
    const profileId: string = req.params.profileId!;

    //Make sure parameters are sumbitted
    if (!req.params.profileId) {
        responder(res, 400, 'error', 'ID parameters are required');
        return;
    }

    //Make sure parameters are numbers
    if (isNaN(Number(profileId))) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    //Make sure parameters are valid numbers
    if (!validateNumbers([(Number(profileId))])) {
        responder(res, 400, 'error', 'Invalid Request');
        return;
    }

    //Check if profile exists and if it matches the user
    try {
        const profileObject = await db.oneOrNone('SELECT * FROM Profile WHERE profile_id = $<profileId> AND account_id = $<accountId>', {
            profileId: profileId,
            accountId: req.user!.account_id
        });

        if (profileObject === null) {
            responder(res, 401, 'error', 'Unauthorized');
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }

    //Fetch all watch history entries for the profile and fetch the content associated with it
    try {
        const watchHistoryObject = await db.manyOrNone(`
            SELECT * 
            FROM watch_history
            WHERE profile_id = $<profileId> 
            AND event_type = $<eventType> 
            ORDER BY watch_date DESC`, {
            profileId: profileId,
            eventType: 'End'
        });

    let watchHistoryArray: any[] = [];

    await db.tx(async (t: ITask<any>) => {
        for (let i = 0; i < watchHistoryObject.length; i++) {
            const watchHistory = watchHistoryObject[i];

            const movieWatchHistoryObject = await t.oneOrNone(`
            SELECT * 
            FROM movie_watch_history AS mwh
            JOIN movie AS m ON m.movie_id = mwh.movie_id
            WHERE watch_history_id = $<watchHistoryId>`, {
                watchHistoryId: watchHistory.watch_history_id
            });

            const seriesWatchHistoryObject = await t.oneOrNone(`
            SELECT * 
            FROM series_watch_history AS swh
            JOIN series AS ser ON ser.series_id = swh.series_id
            JOIN season AS sea ON sea.season_id = swh.season_id
            JOIN episode AS ep ON ep.episode_id = swh.episode_id
            WHERE watch_history_id = $<watchHistoryId>`, {
                watchHistoryId: watchHistory.watch_history_id
            });

            if (movieWatchHistoryObject !== null) {
                watchHistoryArray.push(movieWatchHistoryObject);
            }

            if (seriesWatchHistoryObject !== null) {
                watchHistoryArray.push(seriesWatchHistoryObject);
            }
        }
    });

        responder(res, 200, 'success', watchHistoryArray);
        return;
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error');
        return;
    }
};

export const getProfilePersonalOffer = async (req: Request & { user?: User }, res: Response): Promise<void> => {
};
