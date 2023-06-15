--Weekend Chalenge
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

CREATE TABLE Members(
	MemberID INT PRIMARY KEY,
	Name VARCHAR(255),
	Address VARCHAR(50),
	ContactNumber INT,	

);

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
SELECT * FROM Books
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
