import EditAssignment from "./EditAssignment";
import Verified from "./Verified";
import UnVerified from "./UnVerified";
import ReportAssignment from "./ReportAssignment";
import AllAssignment from "./AllAssignment";

export default [
  { path: '/edit-assignment/:id', name:'EditAssignment', component: EditAssignment },
  { path: '/verified-assignment', name:'Verified', component: Verified },
  { path: '/unverified-assignment', name:'UnVerified', component: UnVerified },
  { path: '/reports-assignments', name:'ReportAssignment', component: ReportAssignment },
  { path: '/all-assignments', name:'AllAssignment', component: AllAssignment },

]
