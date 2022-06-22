import { boot } from "quasar/wrappers";
import httpClient from '../app/api/httpClient.js';

export default boot(({ app }) => {
  app.config.globalProperties.$httpClient = httpClient;
});

export { httpClient };
