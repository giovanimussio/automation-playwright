const { test: base, expect } = require("@playwright/test");

const { LoginPage } = require("../pages/LoginPage");
const { Toast } = require("../pages/Components");
const { MoviePage } = require("../pages/MoviePage");
const { LandingPage } = require("../pages/LandingPage");

const test = base.extend({
  page: async ({ page }, use) => {
    await use({
      ...page,
      landing: new LandingPage(page),
      login: new LoginPage(page),
      toast: new Toast(page),
      movies: new MoviePage(page),
    });
  },
});
export { test, expect };
