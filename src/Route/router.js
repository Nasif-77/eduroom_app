import { createBrowserRouter } from "react-router-dom";
import LandingPage from '../Pages/Landing Page/LandingPage';
import LoginStudent from '../Pages/Login/LoginStudent';
import LoginTutor from '../Pages/Login/LoginTutor';
import SignupStudent from '../Pages/Signup/SignupStudent';
// import SignupTutor from '../Pages/Signup/SignupTutor';
//Student
import HomeStudent from '../Pages/Home-Student/HomeStudent';
import HomeTutor from '../Pages/Home-Tutor/HomeTutor';
import Tasks from '../Components/Aside-Content-Student/Tasks/Tasks';
import Home from '../Components/Aside-Content-Student/Home/Home';
import Attendence from '../Components/Aside-Content-Student/Attendence/Attendence';
import Announcements from '../Components/Aside-Content-Student/Announcements/Announcements';
import Assignments from '../Components/Aside-Content-Student/Assignments/Assignments';
import Notes from '../Components/Aside-Content-Student/Notes/Notes';
import Events from '../Components/Aside-Content-Student/Events/Events';
import Profile from '../Components/Aside-Content-Student/Profile/Profile';
import Photos from '../Components/Aside-Content-Student/Photos/Photos';
//Tutor
import Homet from '../Components/Aside-Content-Tutor/Home/Homet';
import AttendenceT from '../Components/Aside-Content-Tutor/Attendence/Attendencet';
import StudentsT from '../Components/Aside-Content-Tutor/Students/Studentst';
import AssignmentsT from '../Components/Aside-Content-Tutor/Assignments/Assignmentst';
import AnnouncementsT from '../Components/Aside-Content-Tutor/Announcements/Announcementst';
import NotesT from '../Components/Aside-Content-Tutor/Notes/Notest';
import ProfileT from '../Components/Aside-Content-Tutor/Profile/Profilet';
import EventsT from '../Components/Aside-Content-Tutor/Events/Eventst';
import PhotosT from '../Components/Aside-Content-Tutor/Photos/Photost';


export const browserRouter = createBrowserRouter([
    { path: '/', element: <LandingPage /> },
    { path: 'student/login', element: <LoginStudent /> },
    { path: 'tutor/login', element: <LoginTutor /> },
    { path: 'student/signup', element: <SignupStudent /> },
    
    {
      path: 'student/home', element: <HomeStudent />, children: [
        { path: 'home', element: <Home/> },
        { path: 'tasks', element: <Tasks /> },
        { path: 'attendence', element: <Attendence /> },
        { path: 'assignments', element: <Assignments /> },
        { path: 'announcements', element: <Announcements /> },
        { path: 'notes', element: <Notes /> },
        { path: 'events', element: <Events /> },
        { path: 'photos', element: <Photos/> },
        { path: 'profile', element: <Profile /> },
      ]
    },
    { path: 'tutor/home', element: <HomeTutor /> ,children:[
      {path:"home",element:<Homet/> },
      {path:"attendence",element:<AttendenceT/> },
      {path:"students",element:<StudentsT/> },
      {path:"assignments",element:<AssignmentsT/> },
      {path:"announcements",element: <AnnouncementsT/>},
      {path:"notes",element: <NotesT/>},
      {path:"profile",element: <ProfileT/>},
      {path:"events",element: <EventsT/>},
      {path:"photos",element: <PhotosT/>}
    ] },
  ])

