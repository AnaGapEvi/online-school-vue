import Register from "../user/UserRegister";
import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgotPassword";
import UserDashboard from "./UserDashboard";
import UserInformation from "./UserInformation";
import AnswerAssignment from "./AnswerAssignment";
import AllUsers from "./AllUsers";
import CheckedAssignments from "./CheckedAssignments";
import UnCheckedAssignment from "./UnCheckedAssignment";

export default [
  { path: '/register', name:'Register', component: Register },
  { path: '/reset-password', name:'ResetPassword', component: ResetPassword },
  { path: '/forgot-password', name:'ForgotPassword', component: ForgotPassword },
  { path: '/user-dashboard', name:'UserDashboard', component: UserDashboard },
  { path: '/user-information', name:'UserInformation', component: UserInformation },
  { path: '/answer-task/:id', name:'AnswerAssignment', component: AnswerAssignment },
  { path: '/all-users', name:'AllUsers', component: AllUsers },
  { path: '/checked-assignments', name:'CheckedAssignments', component: CheckedAssignments },
  { path: '/unchecked-assignments', name:'UnCheckedAssignment', component: UnCheckedAssignment },
]
