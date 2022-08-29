import CourseUser from '../course/CourseUser'
import AllCourse from "../course/AllCourse";
import EditCourse from "../course/EditCourse";
import NewCourse from "../course/NewCourse";
import CourseParticipants from "./CourseParticipants";

export default [
  { path: '/all-courses', name:'AllCourses', component: AllCourse },
  { path: '/edit-course/:id', name:'EditCourse', component: EditCourse },
  { path: '/new-course', name:'NewCourse', component: NewCourse },
  { path: '/course-participants', name:'CourseParticipants', component: CourseParticipants },
  { path: '/course-user', name:'CourseUser', component: CourseUser },
]
