# BS4
Swahilipot Hub Foundation Booking System 

## Description 
Swahilipot hub is a room booking system that allows users to book,reserve,manage and track room availability.
It streamlines booking operations with features like authentication, scheduling and booking management.

## Objectives
To develop an efficient system that allows users to book rooms easily and quickly.
To prevent double booking by managing real time room availability.
To automate the reservation process and reduce manual paperwork.
To provide user authentication for secure access to the system.
To generate booking records for tracking and reporting purposes.

## System Architecture
### Model
Handles database operations 
Manages business logic
validates booking availability
interacts with MySQL database

### View
Responsible for user interface
Displays user forms,dashboards and listings

### Controller
Handles HTTP requests
Processes form submission
Communicates between model and view
Manages authentication and authorization

## System workflow
Guest visits homepage
User registers and logs in
User selects a room
User selects date and available time slot
Booking request is submitted
Controller validates request through model
booking saved with "pending" status
Admin approves or rejects
User views booking status in dashboard

## Key features
User registration and login
Room availability checking
Room booking system and cancellation
Admin dashboard 
Booking reports 
Responsive design

## User roles
### Admin
Manage rooms
Approve or reject bookings
View reports

### Normal User
Register/login
Book rooms
View booking history
Cancel booking

## Technologies used
Frontend: React,CSS
Backend:Javascript
Database: My SQL
IDE: VS Code

## Database design
User table: Id,Name,Password,Role
Room table: Id,Room_name,Capacity,Status
Booking table: Id,User_Id,Date,Time,status

## Future Improvements
Add email notifications
Add mobile app version
Add payment integration
add calender integration
Improved UI/UX

## Challanges faced
Handling double booking logic
Database relationship management
Authentication implementation
Debugging server error

