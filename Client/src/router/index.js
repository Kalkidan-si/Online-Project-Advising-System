import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";
import LoginPage from "@/views/Auth/LoginPage.vue";
import RegisterPage from "@/views/Auth/RegisterPage.vue";
import AdminHome from "@/views/Admin/AdminHome.vue";
import AdminRegistrationRequest from "@/views/Admin/AdminRegistrationRequest.vue";
import Create from "@/views/Project/Create.vue";
import UnApprovedStudentHome from "@/views/User/UnApprovedStudentHome.vue";
import AddCoordinator from "@/views/Admin/AddCoordinator.vue";
import AddAdvisor from "@/views/Admin/AddAdvisor.vue";
import CoordinatorHome from "@/views/Coordinator/CoordinatorHome.vue";
import CoordinatorAllProject from "@/views/Coordinator/CoordinatorAllProject.vue";
import CoordinatorOngoingProject from "@/views/Coordinator/CoordinatorOngoingProject.vue";
import AdvisorHome from "@/views/Advisor/AdvisorHome.vue";
import ApprovedProjects from "@/views/Advisor/ApprovedProjects.vue";
import CommentPage from "@/views/Advisor/CommentPage.vue";

import StudentProjects from "@/views/Student/StudentProjects.vue"; // Import the new component
import StudentCommentPage from "@/views/Student/StudentCommentPage.vue";

import UserProjectPage from "@/views/User/UserProjectPage.vue";
import UserProjectDetailPage from "@/views/User/UserProjectDetailPage.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: { welcome: true },
    },
    {
      path: "/createProject",
      name: "createProject",
      component: Create,
      meta: { auth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
      meta: { guest: true },
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterPage,
      meta: { guest: true },
    },
    {
      path: "/projects",
      name: "UserProject",
      component: UserProjectPage,
    },
    {
      path: "/projects/:id",
      name: "UserProjectDetail",
      component: UserProjectDetailPage,
    },
    {
      path: "/admin",
      name: "AdminHome",
      component: AdminHome,
      meta: { admin: true },
    },
    {
      path: "/admin/register-request",
      name: "AdminRegistrationRequest",
      component: AdminRegistrationRequest,
      meta: { admin: true },
    },
    {
      path: "/admin/register-coordinator",
      name: "AddCoordinator",
      component: AddCoordinator,
      meta: { admin: true },
    },
    {
      path: "/admin/register-Advisor",
      name: "AddAdvisor",
      component: AddAdvisor,
      meta: { admin: true },
    },
    {
      path: "/unApprovedStudent",
      name: "UnApprovedStudent",
      component: UnApprovedStudentHome,
      meta: { UnApprovedStudent: true },
    },
    {
      path: "/coordinator",
      name: "CoordinatorHome",
      component: CoordinatorHome,
      meta: { coordinator: true },
    },
    {
      path: "/advisor",
      name: "AdvisorHome",
      component: AdvisorHome,
      meta: { advisor: true },
    },
    {
      path: "/advisorProjects",
      name: "ApprovedProjects",
      component: ApprovedProjects,
      meta: { advisor: true },
    },
    {
      path: "/projects/:projectId/comment",
      name: "CommentPage",
      component: CommentPage,
      props: true,
    },
    {
      path: "/coordinator/projects",
      name: "CoordinatorAllProject",
      component: CoordinatorAllProject,
      meta: { coordinator: true },
    },
    {
      path: "/coordinator/ongoing-projects",
      name: "CoordinatorOngoingProject",
      component: CoordinatorOngoingProject,
      meta: { coordinator: true },
    },
    {
      path: "/studentProjects",
      name: "studentProjects",
      component: StudentProjects,
      meta: { auth: true },
    },
    {
      path: "/projects/:projectId/commentStudent",
      name: "CommentPageStudent",
      component: StudentCommentPage,
      props: true,
    },
  ],
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if (authStore.user?.role === "admin" && to.meta.guest) {
    return { name: "AdminHome" };
  }
  if (authStore.user?.role === "admin" && to.meta.auth) {
    return { name: "AdminHome" };
  }
  if (authStore.user?.role === "admin" && to.meta.welcome) {
    return { name: "AdminHome" };
  }
  if (
    authStore.user?.role === "student" &&
    !authStore.user?.approved &&
    to.meta.welcome
  ) {
    return { name: "UnApprovedStudent" };
  }
  if (
    authStore.user?.role === "student" &&
    !authStore.user?.approved &&
    to.meta.guest
  ) {
    return { name: "UnApprovedStudent" };
  }

  if (authStore.user?.role === "coordinator" && to.meta.guest) {
    return { name: "CoordinatorHome" };
  }
  if (authStore.user?.role === "coordinator" && to.meta.auth) {
    return { name: "CoordinatorHome" };
  }
  if (authStore.user?.role === "coordinator" && to.meta.welcome) {
    return { name: "CoordinatorHome" };
  }
  if (authStore.user?.role === "coordinator" && to.meta.admin) {
    return { name: "CoordinatorHome" };
  }
  if (authStore.user?.role === "advisor" && to.meta.guest) {
    return { name: "AdvisorHome" };
  }
  if (authStore.user?.role === "advisor" && to.meta.auth) {
    return { name: "AdvisorHome" };
  }
  if (authStore.user?.role === "advisor" && to.meta.welcome) {
    return { name: "AdvisorHome" };
  }
  if (authStore.user?.role === "advisor" && to.meta.admin) {
    return { name: "AdvisorHome" };
  }

  if (authStore.user?.role === "admin" && !to.meta.admin) {
    return next(false);
  }
  if (authStore.user && to.meta.guest) {
    return { name: "Home" };
  }
  if (!authStore.user && to.meta.auth) {
    return { name: "Login" };
  }
});

export default router;
