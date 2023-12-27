const { test: base, expect } = require("@playwright/test");

const { LoginPage } = require("../pages/LoginPage");
const { Toast } = require("../pages/Components");
const { MoviePage } = require("../pages/MoviePage");
const { LandingPage } = require("../pages/LandingPage");

const test = base.extend({
  page: async ({ page }, use) => {
    const context = page;
    context["landing"] = new LandingPage(page);
    context["login"] = new LoginPage(page);
    context["movies"] = new MoviePage(page);
    context["toast"] = new Toast(page);
    await use(context);
  },
});
export { test, expect };
