import EditNotification from "./EditNotification";
import NewNotification from "./NewNotification";
import AllNotification from "./AllNotification";

export default [
  {path: '/teacher/new-notification', name: 'NewNotification', component: NewNotification },
  {path: '/teacher/all-notifications', name: 'AllNotifications', component: AllNotification },
  {path: '/teacher/edit-notification/:id', name: 'EditNotification', component: EditNotification }

]
