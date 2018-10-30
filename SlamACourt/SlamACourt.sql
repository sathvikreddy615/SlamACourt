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

--BookedTennisCourt Data

CREATE TABLE BookedTennisCourt (
Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
UserId INTEGER NOT NULL,
TennisCourtId INT NOT NULL,
StartTime DATETIME,
EndTime DATETIME
);

INSERT INTO BookedTennisCourt (UserId, TennisCourtId, StartTime, EndTime)
VALUES
(1, 1, '2018-11-02 09:00:00', '2018-11-02 10:00:00');

INSERT INTO BookedTennisCourt (UserId, TennisCourtId, StartTime, EndTime)
VALUES
(1, 5, '2018-11-01 09:00:00', '2018-11-01 10:00:00');

INSERT INTO BookedTennisCourt (UserId, TennisCourtId, StartTime, EndTime)
VALUES
(1, 7, '2018-11-01 11:00:00', '2018-11-01 12:00:00');

INSERT INTO BookedTennisCourt (UserId, TennisCourtId, StartTime, EndTime)
VALUES
(1, 1, '2018-11-02 14:00:00', '2018-11-02 15:00:00');

INSERT INTO BookedTennisCourt (UserId, TennisCourtId, StartTime, EndTime)
VALUES
(1, 1, '2018-11-02 12:00:00', '2018-11-02 13:00:00')