import AllAnnouncement from "./AllAnnouncement";
import NewAnnouncement from "./NewAnnouncement ";
import EditAnnouncement from "./EditAnnouncement";

export default [
  { path: '/edit-announcement/:id', name:'EditAnnouncement', component: EditAnnouncement },
  { path: '/new-announcement', name:'NewAnnouncement', component: NewAnnouncement },
  { path: '/all-announcement', name:'AllAnnouncement', component: AllAnnouncement },
]
