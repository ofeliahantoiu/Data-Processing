import supertest from 'supertest';
import app from '../../app';
import jwtTokenGenerator from '../../utils/jwt.generator';
import { db } from '../../db';

const testEmail = 'insert email here!!!';

const token = jwtTokenGenerator('24h', 'email', testEmail, 'purpose', 'authentication'); // Provide valid string arguments here

const authHeader = {
    Authorization: `Bearer ${token}`
};

describe('Rountes: /user ', () => {

    describe("DELETE /current Delete Profiles", () => {

        //Delete All existing profiles and create one to standardize test cases
        beforeAll(async () => {
            await db.none('DELETE FROM profile WHERE account_id = (SELECT account_id FROM account WHERE email = $1)', [testEmail]);

            await supertest(app)
                .post('/user/current/profiles')
                .set(authHeader)
                .field('profileName', 'joe');
        });

        describe("Successful Profile Deletions", () => {
            //Create a new profile before each so there is always something to delete
            beforeEach(async () => {
                await supertest(app)
                    .post('/user/current/profiles')
                    .set(authHeader)
                    .field('profileName', 'joe');
            });

            test('Valid Data Input, Successful Deletion, returns 200', async () => {
                const randomProfile = await db.one('SELECT * FROM profile WHERE account_id = (SELECT account_id FROM account WHERE email = $1) ORDER BY profile_id DESC LIMIT 1', [testEmail]);
                const response = await supertest(app)
                    .delete(`/user/current/profiles/${randomProfile.profile_id}`)
                    .set(authHeader)
                expect(response.status).toBe(200)
                expect(response.body.message).toBe('Profile deleted successfully')
            });
        });

        describe("Unsuccessful Profile Deletions", () => {

            test('Profile ID is Not A Number, string, expects 400 and error message', async () => {
                const response = await supertest(app)
                    .delete(`/user/current/profiles/NotANumber`)
                    .set(authHeader)
                expect(response.status).toBe(400)
                expect(response.body.error).toBe('Profile ID must be a number')
            });

            test('Invalid Input values, negative number, expect 400 and error message', async () => {
                const response = await supertest(app)
                    .delete(`/user/current/profiles/-213`)
                    .set(authHeader)
                expect(response.status).toBe(400)
                expect(response.body.error).toBe('Invalid input values')
            });

            test('Invalide authorization header token, expects 401 and error message', async () => {
                const response = await supertest(app)
                    .delete(`/user/current/profiles/1`)
                    .set({ Authorization: 'Malformed token' })
                expect(response.status).toBe(401)
                expect(response.body.error).toBe('Malformed or Invalid JWT token')
            });

            test('Invalide authorization header token, invalid email emmbedded in the token, expects 401 and error message', async () => {
                const response = await supertest(app)
                    .delete(`/user/current/profiles/1`)
                    .set({ Authorization: jwtTokenGenerator('24h', 'email', "test@gmail.com", 'purpose', 'authentication') })
                console.log(response.header)
                expect(response.status).toBe(401)
                expect(response.body.error).toBe('User not found in the database')
            });

            test('Invalide authorization header token, Invalid purpose token embedding, expects 401 and error message', async () => {
                const response = await supertest(app)
                    .delete(`/user/current/profiles/1`)
                    .set({ Authorization: jwtTokenGenerator('24h', 'email', "test@gmail.com", 'purpose', 'no authentication') })
                console.log(response.header)
                expect(response.status).toBe(401)
                expect(response.body.error).toBe('Not Authorized')
            });

            test('Profile Not found, wrong profile number, expects 400 and error message', async () => {
                const response = await supertest(app)
                    .delete(`/user/current/profiles/999999999`)
                    .set(authHeader)
                expect(response.status).toBe(404)
                expect(response.body.error).toBe('Profile not found')
            });

            test('Incorrect request method, PUT request, expects status code and error message', async () => {
                const response = await supertest(app)
                    .put(`/user/current/profiles/1`)
                    .set(authHeader)
                expect(response.status).toBe(404)
                expect(response.body.error).toBe('Invalid route')
            });

            describe('Profile ID and authorization header token missmatch', () => {
                let otherAccountProfile: any = null;

                //Insert a new account & profile directly into db to test the case
                beforeAll(async () => {
                    await db.none(`INSERT INTO Account (email, password, first_name, last_name, active_subscription, blocked, verified, street, zip_code, country_id, log_in_attempt_count, invited, user_type) 
                    VALUES ($<email>, $<password>, $<first_name>, $<last_name>, 
                    $<active_subscription>, $<blocked>, $<verified>, $<street>, $<zip_code>,
                    $<country_id>, $<log_in_attempt_count>, $<invited>, $<user_type>)`, {
                        email: "test@gmail.com",
                        password: "hashedPassword",
                        first_name: "firstName",
                        last_name: "lastName",
                        active_subscription: false,
                        blocked: false,
                        verified: false,
                        street: "street",
                        zip_code: "zipCode",
                        country_id: 5,
                        log_in_attempt_count: 0,
                        invited: false,
                        user_type: 'User'
                    });

                    const createdProfile = await db.one(`INSERT INTO Profile (account_id, profile_name, age, language, profile_image, preferences) 
                    VALUES ((SELECT account_id FROM account WHERE email = $<email>), $<profile_name>, $<age>, $<language>, $<profile_image>, $<preferences>) RETURNING *`, {
                        email: "test@gmail.com",
                        profile_name: "testProfile",
                        age: 25,
                        language: "en",
                        profile_image: "profilePicture",
                        preferences: {
                            movie: [],
                            series: [],
                            min_age: [],
                            viewing_class: []
                        }
                    });
                    otherAccountProfile = createdProfile;
                });

                //Delete the account after testing to not affect other tests
                afterAll(async () => {
                    await db.none('DELETE FROM account WHERE email = $<email>',
                        { email: "test@gmail.com" });
                });

                test('Unauthorized profile deletion: Profile ID does not match the account credentials, expects 401 and error message', async () => {
                    const response = await supertest(app)
                        .delete(`/user/current/profiles/${otherAccountProfile.profile_id}`)
                        .set(authHeader)
                    expect(response.status).toBe(401)
                    expect(response.body.error).toBe('Unauthorized')
                });
            });
        });
    });

    describe("POST /current/profiles  Profile Creation", () => {

        //Delete All existing profiles and create one to not standardize test cases
        beforeAll(async () => {
            await db.none('DELETE FROM profile WHERE account_id = (SELECT account_id FROM account WHERE email = $1)', [testEmail]);

            await supertest(app)
                .post('/user/current/profiles')
                .set(authHeader)
                .field('profileName', 'joe');
        });

        describe("Successful Profile Creations", () => {

            //delete the user profiles after each test so it doesnt affect the next test
            afterEach(async () => {
                const randomProfile = await db.one('SELECT * FROM profile WHERE account_id = (SELECT account_id FROM account WHERE email = $1) ORDER BY profile_id DESC LIMIT 1', [testEmail]);
                await supertest(app).delete(`/user/current/profiles/${randomProfile.profile_id}`).set(authHeader);
            });

            test('Partial data submission: ProfileName only, should return 201', async () => {
                const response = await supertest(app)
                    .post('/user/current/profiles')
                    .set(authHeader)
                    .field('profileName', 'joe')
                expect(response.status).toBe(201);
                expect(response.body.profile.profile_name).toEqual('joe');
                expect(response.body.profile.age).toEqual(0);
                expect(response.body.profile.language).toEqual('en');
                expect(response.body.profile.preferences.movie).toEqual([]);
                expect(response.body.profile.preferences.series).toEqual([]);
                expect(response.body.profile.preferences.min_age).toEqual([]);
                expect(response.body.profile.preferences.viewing_class).toEqual([]);
            });

            test('Full Data submission: ProfileName, Image and Age should return 201', async () => {
                const response = await supertest(app)
                    .post('/user/current/profiles')
                    .set(authHeader)
                    .field('profileName', 'joe')
                    .field('age', '25')
                    .field('language', 'en')
                    .attach('profilePicture', 'src/images/default.jpeg', 'default.jpeg')
                expect(response.status).toBe(201);
                expect(response.body.profile.age).toEqual(25);
                expect(response.body.profile.language).toEqual('en');
                expect(response.body.profile.profile_name).toEqual('joe');
                expect(response.body.profile.preferences.movie).toEqual([]);
                expect(response.body.profile.preferences.series).toEqual([]);
                expect(response.body.profile.preferences.min_age).toEqual([]);
                expect(response.body.profile.preferences.viewing_class).toEqual([]);
            });

            test('Partial data submission: Language header set to "Be" should return 201', async () => {
                const response = await supertest(app)
                    .post('/user/current/profiles')
                    .set(authHeader)
                    .set({ 'accept-language': 'Be' })
                    .field('profileName', 'joe')
                    .field('age', '25')
                    .attach('profilePicture', 'src/images/default.jpeg', 'default.jpeg')
                expect(response.status).toBe(201);
                expect(response.body.profile.age).toEqual(25);
                expect(response.body.profile.language).toEqual('Be');
                expect(response.body.profile.profile_name).toEqual('joe');
                expect(response.body.profile.preferences.movie).toEqual([]);
                expect(response.body.profile.preferences.series).toEqual([]);
                expect(response.body.profile.preferences.min_age).toEqual([]);
                expect(response.body.profile.preferences.viewing_class).toEqual([]);
            });

            test('Full Data submission with invalid age, less than 0: Should set age to 0 and return 201', async () => {
                const response = await supertest(app)
                    .post('/user/current/profiles')
                    .set(authHeader)
                    .field('profileName', 'joe')
                    .field('age', '-6')
                    .field('language', 'en')
                    .attach('profilePicture', 'src/images/default.jpeg', 'default.jpeg')
                expect(response.status).toBe(201);
                expect(response.body.profile.age).toEqual(0);
            });

            test('Full Data submission with invalid age, more than 150: Should set age to 0 and return 201', async () => {
                const response = await supertest(app)
                    .post('/user/current/profiles')
                    .set(authHeader)
                    .field('profileName', 'joe')
                    .field('age', '151')
                    .field('language', 'en')
                    .attach('profilePicture', 'src/images/default.jpeg', 'default.jpeg')
                expect(response.status).toBe(201);
                expect(response.body.profile.age).toEqual(0);
            });
        });

        //delete the user profiles after each test so it doesnt affect the next test
        describe("Unsuccessful Profile Creations", () => {

            test('No data submission: should return 400', async () => {
                const response = await supertest(app)
                    .post('/user/current/profiles')
                    .set(authHeader)
                expect(response.status).toBe(400);
            });

            test('Too long accept-language header, 7+ characters, should return 400', async () => {
                const response = await supertest(app)
                    .post('/user/current/profiles')
                    .set(authHeader)
                    .set({ 'accept-language': 'Belgium' })
                    .field('profileName', 'joe')
                    .field('age', '25')
                    .attach('profilePicture', 'src/images/default.jpeg', 'default.jpeg')
                expect(response.status).toBe(400);
                expect(response.body.error).toEqual('Invalid input values');
            });

            test('Invalid accept-langauge header variable type, numbers, should return 400', async () => {
                const response = await supertest(app)
                    .post('/user/current/profiles')
                    .set(authHeader)
                    .set({ 'accept-language': 0 })
                    .field('profileName', 'joe')
                    .field('age', '25')
                    .attach('profilePicture', 'src/images/default.jpeg', 'default.jpeg')
                expect(response.status).toBe(400);
                expect(response.body.error).toEqual('Invalid input values');
            });

            test('Invalid accept-langauge has special characters, should return 400', async () => {
                const response = await supertest(app)
                    .post('/user/current/profiles')
                    .set(authHeader)
                    .set({ 'accept-language': "@@" })
                    .field('profileName', 'joe')
                    .field('age', '25')
                    .attach('profilePicture', 'src/images/default.jpeg', 'default.jpeg')
                expect(response.status).toBe(400);
                expect(response.body.error).toEqual('Invalid input values');
            });

            test('Empty name field, should return 400', async () => {
                const response = await supertest(app)
                    .post('/user/current/profiles')
                    .set(authHeader)
                    .set({ 'accept-language': 'asd' })
                    .field('profileName', '')
                    .field('age', '25')
                    .attach('profilePicture', 'src/images/default.jpeg', 'default.jpeg')
                expect(response.status).toBe(400);
                expect(response.body.error).toEqual('Invalid input values');
            });

            describe('Maximum number of profiles', () => {

                beforeAll(async () => {
                    //delete all profiles associated with the user before the test
                    await db.none('DELETE FROM profile WHERE account_id = (SELECT account_id FROM account WHERE email = $1)', [testEmail]);
                });

                afterAll(async () => {
                    //Delete the user profiles after the test
                    await db.none('DELETE FROM profile WHERE account_id = (SELECT account_id FROM account WHERE email = $1)', [testEmail]);

                    //Create one profile to not affect the other tests
                    await supertest(app)
                        .post('/user/current/profiles')
                        .set(authHeader)
                        .field('profileName', 'joe')
                });

                test('Create 4 profiles, then try to create a 5th, should return 400', async () => {
                    for (let i = 0; i < 4; i++) {
                        await supertest(app)
                            .post('/user/current/profiles')
                            .set(authHeader)
                            .field('profileName', `joe`)
                    }
                    const response = await supertest(app)
                        .post('/user/current/profiles')
                        .set(authHeader)
                        .field('profileName', 'joe')
                    expect(response.status).toBe(400);
                    expect(response.body.error).toEqual('Maximum number of profiles have been created');
                });

                test('Invalid information submitted, Authentication token missing, should return 400 and error message', async () => {
                    const response = await supertest(app)
                        .post('/user/current/profiles')
                    expect(response.status).toBe(401);
                    expect(response.body.error).toBe('Token not found');
                });

                test('Invalid information submitted, Authentication token edited, should return 400 and error message', async () => {
                    const response = await supertest(app)
                        .post('/user/current/profiles')
                        .set({ Authorization: 'Bearer some token' })
                    expect(response.status).toBe(401);
                    expect(response.body.error).toBe('Malformed or Invalid JWT token');
                });

                test('Invalid information submitted, wrong purpose token, should return 400 and error message', async () => {
                    const response = await supertest(app)
                        .post('/user/current/profiles')
                        .set({ Authorization: jwtTokenGenerator('24h', 'email', testEmail, 'purpose', 'not authentication') })
                    expect(response.status).toBe(401);
                    expect(response.body.error).toBe('Not Authorized');
                });

                test('Invalid information submitted, wrong hhtp method, should return 400 and error message', async () => {
                    const response = await supertest(app)
                        .get('/user/current/profiles')
                        .set({ Authorization: jwtTokenGenerator('24h', 'email', testEmail, 'purpose', 'authentication') })
                    expect(response.status).toBe(404);
                    expect(response.body.error).toBe('Invalid route');
                });
            });
        });
    });

    describe("GET /current/profiles/:profileId   Profile Retrieval", () => {

        describe("Successful Profile Retrieval", () => {

            let fetchedProfile: any = null;

            //Find a profile with the correct account_id and profile_id and return it
            beforeEach(async () => {
                const randomProfile = await db.one('SELECT * FROM profile WHERE account_id = (SELECT account_id FROM account WHERE email = $<email>) ORDER BY profile_id DESC LIMIT 1', { email: testEmail });
                fetchedProfile = randomProfile;
            });


            test('Valid information provided, successful profile retrieval, should return 200 and profile object', async () => {
                const response = await supertest(app)
                    .get(`/user/current/profiles/${fetchedProfile.profile_id}`)
                    .set(authHeader)
                expect(response.status).toBe(200);
                expect(response.body.profile.profile_name).toBe('joe');
                expect(response.body.profile.age).toBe(0);
                expect(response.body.profile.language).toBe('en');
                expect(response.body.profile.preferences.movie).toEqual([]);
                expect(response.body.profile.preferences.series).toEqual([]);
                expect(response.body.profile.preferences.min_age).toEqual([]);
                expect(response.body.profile.preferences.viewing_class).toEqual([]);
            });
        });

        describe("Unsuccessful Profile Retrieval", () => {

            test('Invalid ID provided, negative number, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .get(`/user/current/profiles/-1`)
                    .set(authHeader)
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Invalid input values');
            });

            test('Invalid ID provided, ID number does not exist, should return 404 and error message', async () => {
                const response = await supertest(app)
                    .get(`/user/current/profiles/999999999`)
                    .set(authHeader)
                expect(response.status).toBe(404);
                expect(response.body.error).toBe('Profile not found');
            });

            describe('Profile ID and authorization header token missmatch', () => {
                let otherAccountProfile: any = null;

                //Insert a new account & profile directly into db to test the case
                beforeAll(async () => {
                    await db.none(`INSERT INTO Account (email, password, first_name, last_name, active_subscription, blocked, verified, street, zip_code, country_id, log_in_attempt_count, invited, user_type) 
                    VALUES ($<email>, $<password>, $<first_name>, $<last_name>, 
                    $<active_subscription>, $<blocked>, $<verified>, $<street>, $<zip_code>,
                    $<country_id>, $<log_in_attempt_count>, $<invited>, $<user_type>)`, {
                        email: "test@gmail.com",
                        password: "hashedPassword",
                        first_name: "firstName",
                        last_name: "lastName",
                        active_subscription: false,
                        blocked: false,
                        verified: false,
                        street: "street",
                        zip_code: "zipCode",
                        country_id: 5,
                        log_in_attempt_count: 0,
                        invited: false,
                        user_type: 'User'
                    });

                    const createdProfile = await db.one(`INSERT INTO Profile (account_id, profile_name, age, language, profile_image, preferences) 
                    VALUES ((SELECT account_id FROM account WHERE email = $<email>), $<profile_name>, $<age>, $<language>, $<profile_image>, $<preferences>) RETURNING *`, {
                        email: "test@gmail.com",
                        profile_name: "testProfile",
                        age: 25,
                        language: "en",
                        profile_image: "profilePicture",
                        preferences: {
                            movie: [],
                            series: [],
                            min_age: [],
                            viewing_class: []
                        }
                    });
                    otherAccountProfile = createdProfile;
                });

                afterAll(async () => {
                    await db.none('DELETE FROM account WHERE email = $<email>',
                        { email: "test@gmail.com" });
                });

                test('Invalid ID provided, user account does not match the profile account requested', async () => {
                    const response = await supertest(app)
                        .get(`/user/current/profiles/${otherAccountProfile.profile_id}`)
                        .set(authHeader)
                    expect(response.status).toBe(401);
                    expect(response.body.error).toBe('Unauthorized');
                });
            });
        });
    });

    describe("PATCH /current/profiles/:profileId   Profile Update", () => {

        describe("Successful Profile Update", () => {

            let testProfile: any = null;

            beforeEach(async () => {
                //Create a new profile before each so there is always something to change
                const randomProfile = await supertest(app)
                    .post('/user/current/profiles')
                    .set(authHeader)
                    .field('profileName', 'joe');
                testProfile = randomProfile;
            });

            afterEach(async () => {
                //delete the user profiles after each test so it doesnt affect the next test
                const randomProfile = await db.one('SELECT * FROM profile WHERE account_id = (SELECT account_id FROM account WHERE email = $<email>) ORDER BY profile_id DESC LIMIT 1', { email: testEmail });
                await supertest(app).delete(`/user/current/profiles/${randomProfile.profile_id}`).set(authHeader);
            });


            test('Valid information submitted, name changed, successful response with status 200', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/${testProfile.body.profile.profile_id}`)
                    .set(authHeader)
                    .field('profileName', 'newName')
                console.log(response.error)
                expect(response.status).toBe(200);
                expect(response.body.message.profile_name).toBe('newName');
            });

            test('Valid infromation submitted, age changed, successful response with status 200', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/${testProfile.body.profile.profile_id}`)
                    .set(authHeader)
                    .field('age', '25')
                console.log(response.body)
                console.log(response.error)
                expect(response.status).toBe(200);
                expect(response.body.message.age).toBe(25);
            });

            test('Valid information submitted, profile picture changed, successful response with status 200', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/${testProfile.body.profile.profile_id}`)
                    .set(authHeader)
                    .attach('profilePicture', 'src/images/default.jpeg', 'testimagename.jpeg')
                expect(response.status).toBe(200);
                expect(response.body.message.profile_image.replace(/[0-9]/g, '')).toBe('testimagename.jpeg');
            });

            test('Valid information submitted, language changed, successful response with status 200', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/${testProfile.body.profile.profile_id}`)
                    .set(authHeader)
                    .set({ 'accept-language': 'hu' })
                expect(response.status).toBe(200);
                expect(response.body.message.language).toBe('hu');
            });
        });

        describe("Unsuccessful Profile Update", () => {

            let testProfile: any = null;

            beforeAll(async () => {
                //Create a new profile before each so there is always something to call
                await supertest(app)
                    .post('/user/current/profiles')
                    .set(authHeader)
                    .field('profileName', 'joe');

                const randomProfile = await db.one('SELECT * FROM profile WHERE account_id = (SELECT account_id FROM account WHERE email = $<email>) ORDER BY profile_id DESC LIMIT 1', { email: testEmail });
                testProfile = randomProfile;
            });

            afterAll(async () => {
                //delete the user profiles after all test so it doesnt affect the next test
                await supertest(app).delete(`/user/current/profiles/${testProfile.profile_id}`).set(authHeader);
            });

            test('Invalid information submitted, name, number submitted, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/${testProfile.profile_id}`)
                    .set(authHeader)
                    .field('profileName', 123)
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Invalid input values');
            });

            test('Invalid information submitted, language, more than 6 characters, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/${testProfile.profile_id}`)
                    .set(authHeader)
                    .set({ 'accept-language': 'Hungary' })
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Invalid input values');
            });

            test('Invalid information submitted, language, number, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/${testProfile.profile_id}`)
                    .set(authHeader)
                    .set({ 'accept-language': 123 })
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Invalid input values');
            });

            test('Invalid information submitted, language, special character, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/${testProfile.profile_id}`)
                    .set(authHeader)
                    .set({ 'accept-language': '$$$' })
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Invalid input values');
            });

            test('Invalid information submitted, profileID, NaN, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/NotANumber`)
                    .set(authHeader)
                    .field('profileName', 'joe')
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Invalid input values');
            });

            test('Invalid information submitted, profileID, negative number, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/-25`)
                    .set(authHeader)
                    .field('profileName', 'joe')
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Invalid input values');
            });

            test('Invalid information submitted, profileID, None existent account, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/9999`)
                    .set(authHeader)
                    .field('profileName', 'joe')
                expect(response.status).toBe(404);
                expect(response.body.error).toBe('Profile not found');
            });

            test('Invalid information submitted, Authentication token missing, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/99999999`)
                    .field('profileName', 'joe')
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Token not found');
            });

            test('Invalid information submitted, Authentication token edited, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/99999999`)
                    .set({ Authorization: 'Bearer some token' })
                    .field('profileName', 'joe')
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Malformed or Invalid JWT token');
            });

            test('Invalid information submitted, wrong purpose token, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/`)
                    .set({ Authorization: jwtTokenGenerator('24h', 'email', testEmail, 'purpose', 'not authentication') })
                    .field('profileName', 'joe')
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Not Authorized');
            });

            test('Invalid information submitted, someone elses token, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/profiles/99999999`)
                    .set({ Authorization: jwtTokenGenerator('24h', 'email', 'test@gmail.com', 'purpose', 'not authentication') })
                    .field('profileName', 'joe')
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Not Authorized');
            });

            describe('Profile ID and authorization header token missmatch', () => {
                let otherAccountProfile: any = null;

                //Insert a new account & profile directly into db to test the case
                beforeAll(async () => {
                    await db.none(`INSERT INTO Account (email, password, first_name, last_name, active_subscription, blocked, verified, street, zip_code, country_id, log_in_attempt_count, invited, user_type) 
                    VALUES ($<email>, $<password>, $<first_name>, $<last_name>, 
                    $<active_subscription>, $<blocked>, $<verified>, $<street>, $<zip_code>,
                    $<country_id>, $<log_in_attempt_count>, $<invited>, $<user_type>)`, {
                        email: "test@gmail.com",
                        password: "hashedPassword",
                        first_name: "firstName",
                        last_name: "lastName",
                        active_subscription: false,
                        blocked: false,
                        verified: false,
                        street: "street",
                        zip_code: "zipCode",
                        country_id: 5,
                        log_in_attempt_count: 0,
                        invited: false,
                        user_type: 'User'
                    });

                    const createdProfile = await db.one(`INSERT INTO Profile (account_id, profile_name, age, language, profile_image, preferences) 
                    VALUES ((SELECT account_id FROM account WHERE email = $<email>), $<profile_name>, $<age>, $<language>, $<profile_image>, $<preferences>) RETURNING *`, {
                        email: "test@gmail.com",
                        profile_name: "testProfile",
                        age: 25,
                        language: "en",
                        profile_image: "profilePicture",
                        preferences: {
                            movie: [],
                            series: [],
                            min_age: [],
                            viewing_class: []
                        }
                    });
                    otherAccountProfile = createdProfile;
                });

                //Delete the account after testing to not affect other tests
                afterAll(async () => {
                    await db.none('DELETE FROM account WHERE email = $<email>',
                        { email: "test@gmail.com" });
                });

                test('Unauthorized profile deletion: Profile ID does not match the account credentials, expects 401 and error message', async () => {
                    const response = await supertest(app)
                        .patch(`/user/current/profiles/${otherAccountProfile.profile_id}`)
                        .set(authHeader)
                        .field('profileName', 'joe')
                    expect(response.status).toBe(404)
                    expect(response.body.error).toBe('Profile not found')
                });
            });
        });
    });

    describe("DELETE /current/profiles/:profileId   Account Delete", () => {

        describe("Successful Account Deletion", () => {

            let testAccount: any = null;
            let testAccountToken: any = jwtTokenGenerator('24h', 'email', "test@gmail.com", 'purpose', 'authentication');
            let testAccountAuthHeader: any = { Authorization: `Bearer ${testAccountToken}` }

            //Insert a new account & profile directly into db to test the case
            beforeAll(async () => {
                const createdAccount = await db.one(`INSERT INTO Account (email, password, first_name, last_name, active_subscription, blocked, verified, street, zip_code, country_id, log_in_attempt_count, invited, user_type) 
                    VALUES ($<email>, $<password>, $<first_name>, $<last_name>, 
                    $<active_subscription>, $<blocked>, $<verified>, $<street>, $<zip_code>,
                    $<country_id>, $<log_in_attempt_count>, $<invited>, $<user_type>) RETURNING *`, {
                    email: "test@gmail.com",
                    password: "hashedPassword",
                    first_name: "firstName",
                    last_name: "lastName",
                    active_subscription: false,
                    blocked: false,
                    verified: true,
                    street: "street",
                    zip_code: "zipCode",
                    country_id: 5,
                    log_in_attempt_count: 0,
                    invited: false,
                    user_type: 'User'
                });

                testAccount = createdAccount;
            });

            test('Valid inputs, successful account deletion, returns 200 and message', async () => {
                const response = await supertest(app)
                    .delete(`/user/current`)
                    .set(testAccountAuthHeader)
                console.log(response.error)
                expect(response.status).toBe(200);
                expect(response.body.message).toBe('Account deleted successfully');
            });
        });

        describe("Unsuccessful Account Deletion", () => {

            let testAccount: any = null;
            let testAccountToken: any = jwtTokenGenerator('24h', 'email', "test@gmail.com", 'purpose', 'authentication');
            let testAccountAuthHeader: any = { Authorization: `Bearer ${testAccountToken}` }

            //Insert a new account & profile directly into db to test the case
            beforeAll(async () => {
                const createdAccount = await db.one(`INSERT INTO Account (email, password, first_name, last_name, active_subscription, blocked, verified, street, zip_code, country_id, log_in_attempt_count, invited, user_type) 
                    VALUES ($<email>, $<password>, $<first_name>, $<last_name>, 
                    $<active_subscription>, $<blocked>, $<verified>, $<street>, $<zip_code>,
                    $<country_id>, $<log_in_attempt_count>, $<invited>, $<user_type>) RETURNING *`, {
                    email: "test@gmail.com",
                    password: "hashedPassword",
                    first_name: "firstName",
                    last_name: "lastName",
                    active_subscription: false,
                    blocked: false,
                    verified: true,
                    street: "street",
                    zip_code: "zipCode",
                    country_id: 5,
                    log_in_attempt_count: 0,
                    invited: false,
                    user_type: 'User'
                });

                testAccount = createdAccount;
            });

            afterAll(async () => {
                await db.none('DELETE FROM account WHERE email = $<email>',
                    { email: "test@gmail.com" });
            });

            test('Invalid information submitted, Authentication token missing, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .delete(`/user/current`)
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Token not found');
            });

            test('Invalid information submitted, Authentication token edited, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .delete(`/user/current`)
                    .set({ Authorization: 'Bearer some token' })
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Malformed or Invalid JWT token');
            });

            test('Invalid information submitted, wrong purpose token, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .delete(`/user/current`)
                    .set({ Authorization: jwtTokenGenerator('24h', 'email', testEmail, 'purpose', 'not authentication') })
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Not Authorized');
            });

            test('Invalid information submitted, wrong hhtp method, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .get(`/user/current`)
                    .set({ Authorization: jwtTokenGenerator('24h', 'email', testEmail, 'purpose', 'authentication') })
                expect(response.status).toBe(404);
                expect(response.body.error).toBe('Invalid route');
            });
        });
    });

    describe("PATCH /current/new-billing-date  Update Billing Date", () => {

        describe("Successful Billing Date Update", () => {

            let testAccount: any = null;
            let testAccountToken: any = jwtTokenGenerator('24h', 'email', "test@gmail.com", 'purpose', 'authentication');
            let testAccountAuthHeader: any = { Authorization: `Bearer ${testAccountToken}` }


            beforeAll(async () => {

                //Insert a new account & profile directly into db to test the case

                const createdAccount = await db.one(`INSERT INTO Account (email, password, first_name, last_name, active_subscription, blocked, verified, street, zip_code, country_id, log_in_attempt_count, invited, user_type) 
                        VALUES ($<email>, $<password>, $<first_name>, $<last_name>, 
                        $<active_subscription>, $<blocked>, $<verified>, $<street>, $<zip_code>,
                        $<country_id>, $<log_in_attempt_count>, $<invited>, $<user_type>)
                        RETURNING *`, {
                    email: "test@gmail.com",
                    password: "hashedPassword",
                    first_name: "firstName",
                    last_name: "lastName",
                    active_subscription: false,
                    blocked: false,
                    verified: true,
                    street: "street",
                    zip_code: "zipCode",
                    country_id: 5,
                    log_in_attempt_count: 1,
                    invited: false,
                    user_type: 'User'
                });
                testAccount = createdAccount;

                console.log(testAccount)

                //Insert a new account_subscription directly into db to test the case
                const createdAccountSubscription = await db.one(`INSERT INTO account_subscription (account_id, subscription_id, payment_method, price, billing_date) 
                        VALUES ($<account_id>, $<subscription_id>, $<payment_method>, $<price>, $<billing_date>)
                        RETURNING *`, {
                    account_id: testAccount.account_id,
                    subscription_id: 1,
                    price: 10,
                    billing_date: new Date(Date.now() - 604800000).toISOString(),
                    payment_method: 'Visa'
                });

                console.log(createdAccountSubscription)

            });

            afterAll(async () => {
                await db.none('DELETE FROM account WHERE email = $<email>',
                    { email: "test@gmail.com" });
            });

            test('Valid request, successful billing date update', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/new-billing-date`)
                    .set(testAccountAuthHeader)
                expect(response.status).toBe(200);
                const newBillingDate = new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString();
                expect(response.body.message.billing_date.split('T')[0]).toBe(newBillingDate.split('T')[0]);
            });
        });

        describe("Unsuccessful Billing Date Update", () => {

            let testAccount: any = null;
            let testAccountToken: any = jwtTokenGenerator('24h', 'email', "test@gmail.com", 'purpose', 'authentication');
            let testAccountAuthHeader: any = { Authorization: `Bearer ${testAccountToken}` }

            //Insert a new account & profile directly into db to test the case
            beforeAll(async () => {
                const createdAccount = await db.one(`INSERT INTO Account (email, password, first_name, last_name, active_subscription, blocked, verified, street, zip_code, country_id, log_in_attempt_count, invited, user_type) 
                    VALUES ($<email>, $<password>, $<first_name>, $<last_name>, 
                    $<active_subscription>, $<blocked>, $<verified>, $<street>, $<zip_code>,
                    $<country_id>, $<log_in_attempt_count>, $<invited>, $<user_type>) RETURNING *`, {
                    email: "test@gmail.com",
                    password: "hashedPassword",
                    first_name: "firstName",
                    last_name: "lastName",
                    active_subscription: false,
                    blocked: false,
                    verified: true,
                    street: "street",
                    zip_code: "zipCode",
                    country_id: 5,
                    log_in_attempt_count: 0,
                    invited: false,
                    user_type: 'User'
                });

                testAccount = createdAccount;

                const createdAccountSubscription = await db.one(`INSERT INTO account_subscription (account_id, subscription_id, payment_method, price, billing_date) 
                VALUES ($<account_id>, $<subscription_id>, $<payment_method>, $<price>, $<billing_date>)
                RETURNING *`, {
                    account_id: testAccount.account_id,
                    subscription_id: 1,
                    price: 10,
                    billing_date: new Date(Date.now() - 604800000).toISOString(),
                    payment_method: 'Visa'
                });
            });

            afterAll(async () => {
                await db.none('DELETE FROM account WHERE email = $<email>',
                    { email: "test@gmail.com" });
            });

            test('Invalid information submitted, Authentication token missing, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/new-billing-date`)
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Token not found');
            });

            test('Invalid information submitted, Authentication token edited, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/new-billing-date`)
                    .set({ Authorization: 'Bearer some token' })
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Malformed or Invalid JWT token');
            });

            test('Invalid information submitted, wrong purpose token, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/new-billing-date`)
                    .set({ Authorization: jwtTokenGenerator('24h', 'email', testEmail, 'purpose', 'not authentication') })
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Not Authorized');
            });

            test('Invalid information submitted, someone elses token, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/new-billing-date`)
                    .set({ Authorization: jwtTokenGenerator('24h', 'email', 'someotheremail@gmail.com', 'purpose', 'authentication') })
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('User not found in the database');
            });

            test('Invalid information submitted, wrong rest method, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .get(`/user/current/new-billing-date`)
                    .set(testAccountAuthHeader)
                expect(response.status).toBe(404);
                expect(response.body.error).toBe('Invalid route');
            });
        });
    });

    describe("PATCH /current/subscription   Update Payment Method", () => {

        describe("Successful Payment Method Update", () => {

            test('Valid information submitted, succesful payment method update, visa, response 200 and message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: 'Visa',
                        subscription_id: '1'
                    });
                expect(response.status).toBe(200);
                expect(response.body.message).toBe('Payment method updated successfully');

            });
            test('Valid information submitted, succesful payment method update, PayPal, response 200 and message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: 'PayPal',
                        subscription_id: '1'
                    });
                expect(response.status).toBe(200);
                expect(response.body.message).toBe('Payment method updated successfully');
            });
            test('Valid information submitted, succesful payment method update, MasterCard, response 200 and message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: 'MasterCard',
                        subscription_id: '1'
                    });
                expect(response.status).toBe(200);
                expect(response.body.message).toBe('Payment method updated successfully');
            });
            test('Valid information submitted, succesful payment method update, Apple Pay, response 200 and message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: 'Apple Pay',
                        subscription_id: '1'
                    });
                expect(response.status).toBe(200);
                expect(response.body.message).toBe('Payment method updated successfully');
            });
            test('Valid information submitted, succesful payment method update, Google Pay, response 200 and message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: 'Google Pay',
                        subscription_id: '1'
                    });
                expect(response.status).toBe(200);
                expect(response.body.message).toBe('Payment method updated successfully');
            });
            test('Valid information submitted, succesful payment method update, iDEAL, response 200 and message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: 'iDEAL',
                        subscription_id: '1'
                    });
                expect(response.status).toBe(200);
                expect(response.body.message).toBe('Payment method updated successfully');
            });
        });

        describe("Unsuccessful Payment Method Update", () => {

            test('Invalid information submitted. missing body, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Possible payment methods not provided');
            });

            test('Invalid information submitted, missing subscription id, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: 'Visa'
                    });
                console.log(response.error)
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Subscription ID must be a number');
            });

            test('Invalid information submitted, missing payment method, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        subscription_id: '1'
                    });
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Possible payment methods not provided');
            });

            test('Invalid information submitted, invalid payment method, numbers, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: 123,
                        subscription_id: '1'
                    });
                console.log(response.error)
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Payment method must be a string');
            });

            test('Invalid information submitted, invalid payment method,  negative numbers, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: -123,
                        subscription_id: '1'
                    });
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Payment method must be a string');
            });

            test('Invalid information submitted, invalid payment method, special characters, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: '@@',
                        subscription_id: '1'
                    });
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Invalid input values');
            });

            test('Invalid information submitted, invalid payment method, falsy value, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: '',
                        subscription_id: '1'
                    });
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Possible payment methods not provided');
            });

            test('Invalid information submitted, invalid subscription id, out of range more than 3, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: 'Visa',
                        subscription_id: '4'
                    });
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Invalid input values');
            });

            test('Invalid information submitted, invalid subscription id, out of range less than 0, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: 'Visa',
                        subscription_id: '-1'
                    });
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Invalid input values');
            });

            test('Invalid information submitted, invalid subscription id, NaN, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: 'Visa',
                        subscription_id: 'NotANumber'
                    });
                console.log(response.error)
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Subscription ID must be a number');
            });

            test('Invalid information submitted, invalid subscription id, falsy value, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set(authHeader)
                    .send({
                        payment_method: 'Visa',
                        subscription_id: ''
                    });
                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Subscription ID is required');
            });

            test('Invalid information submitted, Authentication token missing, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Token not found');
            });

            test('Invalid information submitted, Authentication token edited, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set({ Authorization: 'Bearer some token' })
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Malformed or Invalid JWT token');
            });

            test('Invalid information submitted, wrong purpose token, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .patch(`/user/current/subscription`)
                    .set({ Authorization: jwtTokenGenerator('24h', 'email', testEmail, 'purpose', 'not authentication') })
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Not Authorized');
            });

            test('Invalid information submitted, wrong hhtp method, should return 400 and error message', async () => {
                const response = await supertest(app)
                    .get(`/user/current/subscription`)
                    .set({ Authorization: jwtTokenGenerator('24h', 'email', testEmail, 'purpose', 'authentication') })
                expect(response.status).toBe(404);
                expect(response.body.error).toBe('Invalid route');
            });


        });
    });
});