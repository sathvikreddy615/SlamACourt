# SlamACourt

# SlamACourt
SlamACourt is a full stack responive, scheduling application that utilizes C#, ASP.NET, React.js and Material UI. A user can register an account, view court availability and timings, book a tennis court and manage all future court reservations. Utilized SQL, SQL Server and Dapper as the backend database management systems. This is the backend capstone project that I build at Nashville Software School to showcase the skills that I learned.

### Get Started

Clone the application to your machine via:

`git clone https://github.com/sathvikreddy615/SlamACourt.git`

### Client Side

To open up the client side code, you will need to navigate to the root of the `Slam-A-Court` directory and run the following command:

`code .`

Once you have the code editor open, you can run the app locally in your browser using: 

`npm start`

### Server Side

To open up the server side code in Visual Studio 2017 iDE, you will need to navigate to the root of the 'SlamACourt' directory.

Open up the file titled *SlamACourt.sln*

This will give you access to the WebAPI, where the models and controllers are stored. Make sure the API is running in VS 2017 before making requests. 

### Database

If you have not done so already, please download SQL Server Managment Studio: https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-2017

When you open up SQL Server, you will be given a local server name like so `Server=DESKTOP-EFP2076\\SQLEXPRESS'. Copy and paste the server name and add it to your *appsettings.json* file.

Create a new a database called *SlamACourtAPI*. Open up a *New Query* and copy and paste the SlamACourt.sql file. When you click Execute, make sure the SQL runs with out any errors.

## Running the application locally

To run locally, you will need to access the API via `https://localhost5001/api/` or `http://localhost5000/api/`

Make sure you have followed the above client side steps to get the actual app running!

If you would like to just see the raw data in Postman, then make sure you have the application download: 

https://www.getpostman.com/

If you would like to **GET** all from a table:

Paramaters: `/{tablename}`

Example: `/user`

If you would like to **GET** by Id or primary key:

Parameters: `/{tablename}/{id}`

Example: `/user/3`

If you would like to **GET** data from a table, but filter for a criteria other than primary id:

Parameters: `/{tablename}?{datatype}={string}`

Example: `/user?email='Brian Baker'`


