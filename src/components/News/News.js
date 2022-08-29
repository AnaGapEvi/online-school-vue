import News from "./News";
import NewNews from "./NewNews";
import EditNews from "./EditNews"
import OneNews from "./OneNews"
import AllNews from "./AllNews"


export default [
  { path: '/news', name:'News', component: News },
  { path: '/create-news', name:'NewNews', component: NewNews },
  { path: '/edit-news/:id', name:'EditNews', component: EditNews },
  { path: '/news/:id', name:'OneNews', component: OneNews },
  { path: '/all-news', name:'AllNews', component: AllNews },
]
