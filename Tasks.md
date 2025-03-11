# Student Registration App

# Features:

- **Signup & Login** (Home page, `/`)
- **Dashboards**
- **Registration**

<!-- ## Frontend: -->

# Signup & Login:
### STUDENTS:
#### Signup
- Input for name, email, and password.
- Students need to have student roles when logging in. Else they won't be given access to either dashboard.
- "Create Account" button that sends a request to the backend & inserts the student info into the database (students table).
- Route to login page (if student has an account).

#### Login
- Input for student email and password.
- "Login" button that takes you to the student dashboard.
- Route to signup page (if student has not signed up).

### ADMINS:
#### Login
- Admins should have a seperate login that when logged in, takes them to the Admins Dashboard.
- This route will be a login only route where we will have a preset Admin login.

# Dashboards
### STUDENTS:
- Student dashboard should display all courses.
- Each course should be clickable and be able to display all the info for that course.
- Students should be able to filter and registered for courses.

#### Student Profile
- Student dashboard page should have a profile route. This will display all info for the students.
- Students should be able to adjust their personal info.

### ADMINS:
- Admin dashboard should display all courses.
- Admins should be able to check each course & adjust details
- Admins should be able to CRUD for students.
- Admins should also be able to add / remove students from courses.