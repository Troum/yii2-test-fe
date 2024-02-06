/**
 * router/index.js
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router/auto'
import {setupLayouts} from 'virtual:generated-layouts'
import {useAppStore} from "@/store/app";
import _ from "lodash"

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  extendRoutes: setupLayouts,
})

router.beforeEach(async (to: any, from: any, next: any): Promise<void> => {
  const user = useAppStore();

  if (to.path.includes('dashboard') && _.isEmpty(user.getUser)) {
    return next({path: "/login"});
  }
  if (to.path.includes('dashboard') && !_.isEmpty(user.getUser) && !user.getUser.role.includes('admin')) {
    return next({path: "/dashboard", params: {permission: 'denied'}});
  }
  return next()
})
export default router
