import SearchByTeacherName from "./SearchByTeacherName";
import SearchTaskBySubject from "./SearchTaskBySubject";
import SearchTaskByNumber from "./SearchTaskByNumber";
import Vue from "vue";

export default [
  {path: '/search-task-by-teacher-name', name: SearchByTeacherName, components: SearchByTeacherName},
  {path: '/search-task-by-subject', name: SearchTaskBySubject, components: SearchTaskBySubject},
  {path: '/search-task-by-number', name: SearchTaskByNumber, components: SearchTaskByNumber}
]

// Vue.component('SearchByNumber', SearchTaskByNumber)
// Vue.component('SearchBySubject', SearchTaskBySubject)
// Vue.component('SearchByTaskName', SearchByTeacherName)
