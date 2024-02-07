import { ofetch } from "ofetch";

export default {
  install: (app, options) => {
    app.config.globalProperties.$fetch = ofetch.create({
      retry: 5,
      retryDelay: 2500,
      timeout: 3000,
      onRequestError: async ({ request, error }) => {
        // Log error
        console.log("[fetch request error]", request, error);
      },
      onResponseError: async ({ request, response }) => {
        // Log error
        console.log("[fetch response error]", request, response.status, response.body);
      },
    });
  },
};
