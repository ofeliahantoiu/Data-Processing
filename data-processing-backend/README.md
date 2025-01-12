# DataProcessing-BackEnd

## Backend Setup

### Requierments:

 - Docker Downloaded
 - On the project-setup branch and pulled latest
 
### Steps

1. Open VSCode in the project-setup branch
2. Clone the repository into your selected folder
3. Create a .env file in the root folder
4. Add the following information to it 

```
#Do NOT inlude inequality signs

POSTGRES_USER=admin
POSTGRES_PASSWORD=password
POSTGRES_HOST=localhost
POSTGRES_DB=netflix
POSTGRES_PORT=5432
JWT_SECRET=secret
MAILING_SERVICE_ADDRESS = nhlstenden.work@gmail.com
MAILING_SERVICE_APP_PASSWORD = ieykdgjbgcitkdpr
EMAIL_API_KEY = 580b14682491403ba15bc31a29301966
PORT = 3000
``` 
5. Open a termial in VSCode

6. Run the following code to download all the necessary packages

```
npm run i
```
7. Build the project (necessary for the creation of a dist folder from which our server runs from)
```
npm run build
```

8. From here on out, the server can be run with either
```
npm start
``` 

or 

```
npm run dev
```

9. if there are any problems with dependencies, manually uninstall them and install them again with the following commands:

```npm uninstall <packagename>```

```npm install <packagename>```

### Backend necessary information.

1. All of the neccessary requests can be found in the exported postman file. In order to use this file, import it into your own postman enviroment and change the enviroment variables to your personal ones in order to make its work. Fake email addresses are not going to work, password can be an actual password with one capital, one lower case letter, one number and one special character, and at least 6 characters long OR it can be just left as "password" which was left in to make testing easier.

2. The API for email validation is using a free tier service which only allows 100 requests maximum. after this expiers the email validation will throw errors. If you would like to continue testing on the backend, go to /src/utils/validators.ts and  comment out everything between lines 11-24. 

3. The backend is using a real emailing service in order to sign up, verify, reset password or to invite someone. For this real emails are necessary to use and links need to be clicked in order to verify or to invite someone. Gmail allows around 300 emails per day which should be plenty.

4. Some backend interractions needs to follow specific flows of action. For example:
- To create an account to use the restricted part of the backend.(routes that need authentication) 
    - put your actuall email as a gloabl variable in postman -> call Register JSON->verify email(click on link in inbox)->after this account can make requests in other parts of the postman enviroment.
- To invite users and get -2 euro discount in the database
    - Have an already verified account with a __subscription_id__ of __1__ OR __2__ OR __3__ -> invite a second email address by calling the Invite Sending request located in the profile folder -> open email address and click on the invitation link -> use the second email to call the Register JSON call in postman (make sure __subscription_id__ is __1__ OR __2__ OR __3__) -> access db and in table __account_subscription__ you should see column account_id and __price__ these should be 2 euros smaller then the prices awalable in table __subscription__

5. Some of the usecase scenarios could not be done logically without a frontend for it such as password reset(it would requier redirects). When __Forgot Password__ is called it also sends an email with a link. extract the JWT token from this request and use it in the patch request __New Password submit__ in order to reset a password.

6. All test can be found in the postman enviroment. Since setting up different scenarios is not possible here, the comment above the test should explain what it is for or the description string in the first line of the test.

7. Backend is taking advantage of headers in the usecase. It is capable of responding in both JSON and XML. This can be done by changing the default Accept header to application/xml (it will default to json). Some seperate requests were made in postman to showcase this but we did not duplicate all of them.
Accepted langauges header is also used to infer the langauge the user uses when creating a profile. This can also be changed manually, if nothing is sent it will default to "en" (english)

8. Image upload functionality also works, all images can be found uploaded into to /dist/images/. In order to differentiate images with the same name, a unix timestamp is attached to the image name showing when an image was created. If an image is not submitted it will default to "default.jpeg"


 
## Testing
The Testfiles can be found under src/\_\_test\_\_/controller.user.test.ts

For the TestFile to function properly, one existent account in the database is needed (it also has to be verified). You can achieve this by following the steps described in 4th point under the backend necessary information part.

Navigate to the controller.user.test.ts file and at top of the page there will be a testEmail variable: 

```
const testEmail = 'insert email here';
```

Here insert your existing verified accounts email adress.


Once that is done the only thing that is neccessery to be done is to open the terminal in the project folder and run the command: 

```
npm test
```
