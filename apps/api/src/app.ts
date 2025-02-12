import configureOpenAPI from "@/api/lib/configure-open-api";
import createApp from "@/api/lib/create-app";
import index from "@/api/routes/index.route";
import tasks from "@/api/routes/tasks/tasks.index";

const app = createApp();

configureOpenAPI(app);

const routes = [
  index,
  tasks,
] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;
