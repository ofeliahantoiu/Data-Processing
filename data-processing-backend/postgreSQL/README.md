How to connect to the database using DataGrip ?
1. Click on the plus button on the top left side
2. Select Datasource and select postreSQL 
3. A popup opened where you can put in your credentials. (You only need to state your Username and password based on your .ENV file)
4. Click connect

addition: Call Joey for tech support if it doesnt work

How to import the database into postreSQL?

1. Right click "postreSQL@localhost"
2. New -> Query Console
3. Copy the code from "database-create.sql" into the console, press ctrl + a and enter
4. On the top right side you can choose a "schema", this is how you switch to the netflix or user database
5. Switch to netflix database and copy the code from netflix.sql into the console, press ctrl + a and enter
6. You should now see on the left side a netflix database which has 16 tables (if not press the refresh button next to the plus button)
7. Change the schema to "User" database and repeat step 5 + 6 for the user.sql file
8. Change the schema back to netflix and import the dummy-data.sql file

Now you can see in your VSC console the following text:

{ country_id: 2, country_name: 'Canada' }
[1] { country_id: 1, country_name: 'United States' }
