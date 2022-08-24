const routes = [
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
  },
  {
    path: "/story/:id",
    component: () => import("components/TrippyStory.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
