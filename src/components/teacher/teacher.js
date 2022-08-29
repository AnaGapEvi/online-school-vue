import TeacherDashboard from "./TeacherDashboard";
import AssignmentInformation from "./AssignmentInformation";
import AllTeachers from "./AllTeachers";
import AddTeacher from "./AddTeacher";
import UpdateTeacher from "./UpdateTeacher";
import TeacherTotalAssignment from "./TeacherTotalAssignment";
import StudentTeacherCourse from "./StudentTeacherCourse";
import RegUsers from "./RegUsers";
import TaskAnswer from "./TaskAnswer";

export default [
  { path: '/teacher-dashboard', name:'TeacherDashboard', component: TeacherDashboard },
  { path: '/assignment-information', name:'AssignmentInformation', component: AssignmentInformation },
  { path: '/all-teachers', name:'AllTeachers', component: AllTeachers },
  {path: '/add-teacher', name: 'AddTeacher', component: AddTeacher},
  {path: '/total-assignment', name: 'TeacherTotalAssignment', component: TeacherTotalAssignment},
  {path: '/student-teacher-course', name: 'StudentTeacherCourse', component: StudentTeacherCourse},
  {path: '/edit-teacher/:id', name: 'UpdateTeacher', component: UpdateTeacher},
  {path: '/reg-users', name: 'RegUsers', component: RegUsers},
  {path: '/task/:id', name: 'TaskAnswer', component: TaskAnswer}
]
