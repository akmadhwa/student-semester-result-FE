## Student Semester Result FE

This is the front end repo for Student semester result project. The front end will consume api from this [repo](https://github.com/akmadhwa/student-semester-result-management-system-api).

### Stack use

- NextJs
- Chakra UI for front end
- nookies - for cookies management
- axios - a promised base HTTP client

### How to deploy

1. Clone this repository to your machine
2. `cd` to your repo
3. Run `npm install` to install the dependencies
4. Copy the `.env.local.example` and rename it to `.env.local`. Change the base url if necessary especially if you not running laravel app using `php artisan serve`.
5. Run `npm run dev` to start the development server.
6. Go to `localhost:3000/login` to login. Login with the credentials as i stated in this [repo](https://github.com/akmadhwa/student-semester-result-management-system-api)

CheckList

- Student
  - [x] Login
  - [x] View student information
  - [x] View subjects and marks based on semester.
- Admin
  - [x] Show student’s result.
  - [x] Add/edit/delete semester.
  - [x] Add/edit/delete marks.
  - [ ] Add/edit/delete subject.
  - [ ] Add/edit/delete student.
  - [ ] Generate students report in pdf.
