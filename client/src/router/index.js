import { createRouter, createWebHistory } from 'vue-router'
import MainView from "../views/Main.vue"
import SignUp from '../pages/SignUp.vue'
import SignIn from '../pages/SignIn.vue'
import PageNotFound from '../pages/PageNotFound.vue'
import HomeView from '../pages/Homepage.vue'
import TutorList from '../pages/TutorsList.vue'
import TutorDescription from '../pages/TutorsDescription.vue'
import CoursesPage from '../pages/Courses.vue'
import Settings from '../pages/Settings.vue'
import HelpPage from '../pages/HelpPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'IMSA_Tutoring',
      component: MainView,
      children: [
        {
          path: '/signup',
          name: 'SignUp',
          component: SignUp
        },
        {
          path: '/signin',
          name: 'SignIn',
          component: SignIn
        },
        {
          path: '/:pathMatch(.*)*',
          name: '404',
          component: PageNotFound
        },
        {
          path: '/',
          name: 'main',
          component: HomeView
        },
        {
          path: '/tutors/:course',
          name: 'tutorList',
          component: TutorList
        },
        {
          path: '/booktutor/:tutorName',
          name: 'booktutor',
          component: TutorDescription
        },
        {
          path: '/courses',
          name: 'courses',
          component: CoursesPage 
        },
        {
          path: '/settings',
          name: 'settings',
          component: Settings
        },
        {
          path: '/help',
          name: 'help',
          component: HelpPage
        },
      ]
    }
  ]
})

export default router