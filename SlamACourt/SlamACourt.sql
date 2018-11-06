--ALTER TABLE BookedTennisCourt DROP CONSTRAINT [FK_User];
--ALTER TABLE BookedTennisCourt DROP CONSTRAINT [FK_TennisCourt];

--delete from User;
--delete from TennisCourt;
--delete from BookedTennisCourt;

--drop table if exists User;
--drop table if exists TennisCourt;
--drop table if exists BookedTennisCourt;

--User Data

CREATE TABLE [User] (
Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
Name VARCHAR(30) NOT NULL,
Email VARCHAR(30) NOT NULL,
Password VARCHAR(30) NOT NULL
);

INSERT INTO [User] (Name, Email, Password)
VALUES
('Sathvik Reddy', 'sathvikreddy94@yahoo.com', 'tennis123');

INSERT INTO [User] (Name, Email, Password)
VALUES
('Jordan Finley', 'jfinley@gmail.com', 'tennis123');

INSERT INTO [User] (Name, Email, Password)
VALUES
('Rohit Venkat', 'rvenkat@gmail.com', 'tennis123');

INSERT INTO [User] (Name, Email, Password)
VALUES
('Michael King', 'mking@gmail.com', 'tennis123');

--TennisCourt Data

CREATE TABLE TennisCourt (
Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
Surface VARCHAR(30) NOT NULL,
Name VARCHAR(30) NOT NULL
);

INSERT INTO TennisCourt (Surface, Name)
VALUES
('Hard', 'Roger Federer');

INSERT INTO TennisCourt (Surface, Name)
VALUES
('Hard', 'Serena Williams');

INSERT INTO TennisCourt (Surface, Name)
VALUES
('Hard', 'Andy Roddick');

INSERT INTO TennisCourt (Surface, Name)
VALUES
('Clay', 'Rafael Nadal');

INSERT INTO TennisCourt (Surface, Name)
VALUES
('Clay', 'Novak Djokovic');

INSERT INTO TennisCourt (Surface, Name)
VALUES
('Clay', 'Andre Agassi');

INSERT INTO TennisCourt (Surface, Name)
VALUES
('Grass', 'Pete Sampras');

INSERT INTO TennisCourt (Surface, Name)
VALUES
('Grass', 'Venus Williams');

INSERT INTO TennisCourt (Surface, Name)
VALUES
('Grass', 'John Mcenroe');

--BookedTennisCourt Data

CREATE TABLE BookedTennisCourt (
Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
UserId INTEGER NOT NULL,
TennisCourtId INT NOT NULL,
StartTime DATETIME,
EndTime DATETIME,
Partners VARCHAR(100) NOT NULL
);