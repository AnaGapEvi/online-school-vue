import AllSubjects from "./AllSubjects";
import EditSubject from "./EditSubject";
import NewSubject from "./newSubject";

export default [
  { path: '/all-subjects', name:'AllSubjects', component: AllSubjects },
  { path: '/edit-subject/:id', name:'EditSubject', component: EditSubject },
  { path: '/new-subject', name:'NewAssignment', component: NewSubject },
]
