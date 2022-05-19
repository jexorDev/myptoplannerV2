import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard';
import Planner from '@/views/Planner';
import Start from '@/views/Start';
import Settings from '@/views/Settings';
import PlanAdd from "@/views/PlanAdd";
//import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/planner',
    name: 'Planner',
    component: Planner
  },
  {
    path: '/start',
    name: 'Start',
    component: Start
  },
    {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/add-plan',
    name: 'Add Plan',
    component: PlanAdd
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((from, to, next) => {
//   if (to.path !== "/start") {
//     if (!store.state.plans || store.state.plans.length === 0) {
//       next({ path: "/start" });
//     } else {
//       next();
//     }

//   }

//   next();

// });

export default router
