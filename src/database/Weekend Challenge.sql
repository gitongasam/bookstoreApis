
CREATE DATABASE LibraryManagement
USE LibraryManagement

SELECT @@SERVERNAME

--Tables
CREATE TABLE Books(
	BookID INT PRIMARY KEY,
	Title VARCHAR(50),
	Author VARCHAR(50),
	PublicationYear INT,
	Status VARCHAR(50)
);

ALTER TABLE Books
ADD ContactNumber VARCHAR(255);

ALTER TABLE Books
DROP COLUMN c_password;

ALTER TABLE Members
DROP COLUMN c_password;

INSERT INTO Books (BookID, Title, Author, PublicationYear, Status, ContactNumber)
VALUES
(9, 'Book 1', 'Author 1', 2023, 'Available', '123-456-7890'),
(10, 'Book 2', 'Author 2', 2023, 'Available', '987-654-3210'),
(11, 'Book 3', 'Author 3', 2023, 'Available', '123-233-5678'),
(12, 'Book 4', 'Author 4', 2023, 'Available', '555-123-4567'),
(13, 'Book 5', 'Author 5', 2023, 'Available', '987-654-3210'),
(14, 'Book 6', 'Author 6', 2023, 'Available', '123-456-7890'),
(15, 'Book 7', 'Author 7', 2023, 'Available', '555-123-4567'),
(16, 'Book 8', 'Author 8', 2023, 'Available', '987-654-3210');

ALTER TABLE Books
ADD Password VARCHAR(255);

INSERT INTO Books (BookID, Title, Author, PublicationYear, Status, ContactNumber, Password)
VALUES
(17, 'Book 17', 'Author 17', 2023, 'Available', '111-222-3333', 'password1'),
(18, 'Book 18', 'Author 18', 2023, 'Available', '444-555-6666', 'password2'),
(19, 'Book 19', 'Author 19', 2023, 'Available', '777-888-9999', 'password3'),
(20, 'Book 20', 'Author 20', 2023, 'Available', '000-111-2222', 'password4'),
(21, 'Book 21', 'Author 21', 2023, 'Available', '333-444-5555', 'password5'),
(22, 'Book 22', 'Author 22', 2023, 'Available', '666-777-8888', 'password6'),
(23, 'Book 23', 'Author 23', 2023, 'Available', '999-000-1111', 'password7'),
(24, 'Book 24', 'Author 24', 2023, 'Available', '222-333-4444', 'password8');



CREATE TABLE Members(
	MemberID INT PRIMARY KEY,
	Name VARCHAR(255),
	Address VARCHAR(50),
	ContactNumber INT,	


);

ALTER TABLE Members
ADD Password VARCHAR(255);

ALTER TABLE Members
ADD c_password VARCHAR(255);

ALTER TABLE Members
ADD email VARCHAR(255);

INSERT INTO Members (MemberID, Name, Address, ContactNumber, Password)
VALUES
(11, 'John Doe', '123 Main Street', 555-111-1111, 'password1'),
(12, 'Jane Smith', '456 Elm Street', 555-222-2222, 'password2'),
(13, 'David Johnson', '789 Oak Street', 555-333-3333, 'password3'),
(14, 'Emily Davis', '321 Pine Street', 555-444-4444, 'password4'),
(15, 'Michael Brown', '654 Maple Street', 555-555-5555, 'password5'),
(16, 'Sarah Wilson', '987 Cedar Street', 555-666-6666, 'password6'),
(17, 'Robert Taylor', '654 Birch Street', 555-777-7777, 'password7'),
(18, 'Jennifer Miller', '321 Walnut Street', 555-888-8888, 'password8');


CREATE TABLE Loans(
	LoanID INT PRIMARY KEY,
	BookID INT,
	MemberID INT,
	LoanDate DATE,
	ReturnDate DATE,
	FOREIGN KEY (BookID) REFERENCES Books(BookID),
	FOREIGN KEY (MemberID) REFERENCES Members(MemberID)

);

--Data
INSERT INTO Books(BookID, Title, Author, PublicationYear, Status)
VALUES
(5, 'Kigogo', 'Asumpta', 2022, 'Loaned'),
(6, 'Hope', 'Theo', 2020, 'Loaned'),
(7, 'Hope', 'Theo', 2020, 'Loaned'),
(8, 'Hope', 'Theo', 2020, 'Loaned');
INSERT INTO Members(MemberID, Name, Address, ContactNumber)
VALUES
(3, 'Michael S', '456 N Street', '987654'),
(4, 'Matthew M', '789 O Street', '987654'),
(5, 'Andrew P', '321 P Street', '987654'),
(6, 'Christopher R', '654 Q Street', '987654'),
(7, 'David T', '987 R Street', '987654'),
(8, 'Brian V', '654 S Street', '987654'),
(9, 'Kevin W', '321 T Street', '987654'),
(10, 'Steven Z', '789 U Street', '987654')

INSERT INTO Loans(LoanID, BookID, MemberID, LoanDate, ReturnDate)
VALUES
(1, 1, 1, '2023-06-01', '2023-06-15'),
(2, 2, 1, '2023-12-11', '2013-08-18'),
(3, 1, 1, '2023-06-01', '2023-06-15'),
(4, 2, 1, '2023-12-11', ''),
(5, 1, 1, '2023-06-01', '2023-06-15'),
(6, 2, 1, '2023-12-11', ''),
(7, 1, 1, '2023-06-01', '2023-06-15'),
(8, 2, 1, '2023-12-11', ''),
(9, 1, 1, '2023-06-01', '2023-06-15'),
(10, 2, 2, '2023-12-11', '2013-08-18'),
(11, 1, 2, '2023-06-01', '2023-06-15'),
(12, 2, 2, '2023-12-11', ''),
(13, 1, 2, '2023-06-01', '2023-06-15'),
(14, 2, 2, '2023-12-11', ''),
(15, 1, 2, '2023-06-01', '2023-06-15'),
(16, 2, 2, '2023-12-11', '');


SELECT * FROM Loans
SELECT * FROM Members


--Tasks

--CTEs query to retrieve members who have borrowed at least 3 books
WITH NumMembersBorrowedBooks AS (
  SELECT MemberID, COUNT(*) AS NumBooks
  FROM Loans
  GROUP BY MemberID
  HAVING COUNT(*) >= 3
)
SELECT Members.Name, NumBooks
FROM Members
JOIN NumMembersBorrowedBooks ON Members.MemberID = NumMembersBorrowedBooks.MemberID;



--Trigger that automatically updates the "Status" column in the "Books" table whenever a book is loaned or returned.
CREATE TRIGGER BookStatus ON Loans
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    UPDATE Books
    SET Status = CASE
        WHEN BookID IN (SELECT BookID FROM inserted) THEN 'Loaned'
        WHEN BookID IN (SELECT BookID FROM deleted) AND BookID NOT IN (SELECT BookID FROM Loans) THEN 'Available'
        ELSE Status
    END
    WHERE BookID IN (SELECT BookID FROM inserted) OR BookID IN (SELECT BookID FROM deleted)
END


INSERT INTO Loans (LoanID, BookID, MemberID, LoanDate, ReturnDate)
VALUES (17, 1, 2, '2023-06-12', '2023-06-26');


UPDATE Loans
SET ReturnDate = '2023-06-20'
WHERE LoanID = 1;

SELECT * FROM Loans
SELECT * FROM Books

DELETE FROM Loans
WHERE LoanID = 2;

SELECT * FROM Loans
SELECT * FROM Books


--user-defined function that calculates the overdue days for a given loan
CREATE FUNCTION CalculateOverdueDays (@LoanID INT)
RETURNS INT
AS
BEGIN
    DECLARE @OverdueDays INT;
    
    SELECT @OverdueDays = DATEDIFF(DAY, LoanDate, GETDATE())
    FROM Loans
    WHERE LoanID = @LoanID;
    IF @OverdueDays < 0
        SET @OverdueDays = 0;
    
    RETURN @OverdueDays;
END;

DECLARE @LoanID INT = 1; 

SELECT dbo.CalculateOverdueDays(@LoanID) AS OverdueDays;


--Trigger that prevents a member from borrowing more than three books at a time.

CREATE TRIGGER PreventExcessiveBorrowing
ON Loans
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @MemberID INT;
    SELECT @MemberID = MemberID FROM inserted;
    
    DECLARE @NumBooks INT;
    SELECT @NumBooks = COUNT(*) FROM Loans WHERE MemberID = @MemberID;
    
    IF @NumBooks >= 3
    BEGIN
        RAISERROR('The member is already borrowing three books and cannot borrow more.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;
    
    INSERT INTO Loans (LoanID, BookID, MemberID, LoanDate, ReturnDate)
    SELECT LoanID, BookID, MemberID, LoanDate, ReturnDate FROM inserted;
    
    UPDATE Books
    SET Status = 'Loaned'
    WHERE BookID IN (SELECT BookID FROM inserted);
    
    SELECT * FROM Loans WHERE MemberID = @MemberID;
    SELECT * FROM Books WHERE BookID IN (SELECT BookID FROM inserted);
END;

INSERT INTO Loans (LoanID, BookID, MemberID, LoanDate, ReturnDate)
VALUES (18, 3, 1, '2023-06-12', '2023-06-26');

DROP TRIGGER PreventExcessiveBorrowing


ALTER PROCEDURE addMembers
    @MemberID INT,
    @Name VARCHAR(255),
    @Address VARCHAR(50),
    @ContactNumber VARCHAR(20),
    @Password VARCHAR(255),
	@email VARCHAR(255)
AS
BEGIN
    INSERT INTO Members (MemberID, Name, Address, ContactNumber, Password, email)
    VALUES (@MemberID, @Name, @Address, @ContactNumber, @Password, @email)

    SELECT * FROM dbo.Members
END

ALTER TABLE Members ALTER COLUMN ContactNumber VARCHAR(20)


CREATE PROCEDURE getMembersByID
    @MemberID INT
AS
BEGIN
    SELECT * FROM Members WHERE MemberID = @MemberID;
END



EXEC PROCEDURE dbo.addMembers

SELECT * FROM Members
SELECT * FROM Books
SELECT * FROM Loans



CREATE PROCEDURE selectAll
AS
BEGIN
	SELECT * FROM Books
END

EXEC selectAll

USE LibraryManagement;

SELECT *
INTO MergedTable
FROM Books;

INSERT INTO MergedTable
SELECT *
FROM Members;

INSERT INTO NewTable
SELECT *
FROM Loans;

SELECT * FROM Books


CREATE TABLE MergedTable (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    BookID INT,
    Title VARCHAR(50),
    Author VARCHAR(50),
    PublicationYear INT,
    Status VARCHAR(50),
    ContactNumberBooks VARCHAR(255),
    Password VARCHAR(255),
    MemberID INT,
    Name VARCHAR(255),
    Address VARCHAR(50),
    ContactNumberMembers VARCHAR(20),
    PasswordMembers VARCHAR(255),
    email VARCHAR(255),
    LoanID INT,
    LoanDate DATE,
    ReturnDate DATE
);

INSERT INTO MergedTable (BookID, Title, Author, PublicationYear, Status, ContactNumberBooks, Password)
SELECT BookID, Title, Author, PublicationYear, Status, ContactNumber, Password
FROM Books;

INSERT INTO MergedTable (MemberID, Name, Address, ContactNumberMembers, PasswordMembers, email)
SELECT MemberID, Name, Address, ContactNumber, Password, email
FROM Members;

INSERT INTO MergedTable (LoanID, BookID, MemberID, LoanDate, ReturnDate)
SELECT LoanID, BookID, MemberID, LoanDate, ReturnDate
FROM Loans;

SELECT * FROM MergedTable