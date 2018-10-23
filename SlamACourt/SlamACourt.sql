--ALTER TABLE UserTennisCourt DROP CONSTRAINT [FK_User];
--ALTER TABLE UserTennisCourt DROP CONSTRAINT [FK_TennisCourt];
--ALTER TABLE UserPartner DROP CONSTRAINT [FK_User];
--ALTER TABLE UserPartner DROP CONSTRAINT [FK_Partner];

--delete from User;
--delete from UserPartner;
--delete from TennisCourt;
--delete from UserTennisCourt;

--drop table if exists User;
--drop table if exists UserPartner;
--drop table if exists TennisCourt;
--drop table if exists UserTennisCourt;

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

--UserPartner Data

CREATE TABLE UserPartner (
Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
UserId INTEGER NOT NULL,
PartnerId INTEGER NOT NULL
);

INSERT INTO UserPartner (UserId, PartnerId)
VALUES
(1, 2);

INSERT INTO UserPartner (UserId, PartnerId)
VALUES
(1, 3);

INSERT INTO UserPartner (UserId, PartnerId)
VALUES
(1, 4);

--TennisCourt Data

CREATE TABLE TennisCourt (
Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
Surface VARCHAR(30) NOT NULL,
Name VARCHAR(30) NOT NULL
);

INSERT INTO TennisCourt (Surface, Name)
VALUES
('Hard', 'John Mcenroe');

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
('Grass', 'Roger Federer');

INSERT INTO TennisCourt (Surface, Name)
VALUES
('Grass', 'Venus Williams');

INSERT INTO TennisCourt (Surface, Name)
VALUES
('Grass', 'Pete Sampras');

--UserTennisCourt Data

CREATE TABLE UserTennisCourt (
Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
UserId INTEGER NOT NULL,
TennisCourtId INT NOT NULL,
StartTime DATETIME,
EndTime DATETIME
);

INSERT INTO UserTennisCourt (UserId, TennisCourtId, StartTime, EndTime)
VALUES
(1, 2, '2018-11-12 09:00:00', '2018-11-12 10:00:00');

INSERT INTO UserTennisCourt (UserId, TennisCourtId, StartTime, EndTime)
VALUES
(1, 5, '2018-11-13 13:00:00', '2018-11-13 15:00:00');

INSERT INTO UserTennisCourt (UserId, TennisCourtId, StartTime, EndTime)
VALUES
(1, 7, '2018-11-13 16:00:00', '2018-11-14 17:00:00');
