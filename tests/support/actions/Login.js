const { expect } = require("@playwright/test");

export class Login {
  constructor(page) {
    this.page = page;
  }

  async do(email, password, userName) {
    this.visit();
    this.submit(email, password);
    this.isLoggedIn(userName);
  }
  async visit() {
    await this.page.goto("http://localhost:3000/admin/login");
    const loginForm = this.page.locator(".login-form");
    await expect(loginForm).toBeVisible();
  }
  async submit(email, password) {
    await this.page.getByPlaceholder("E-mail").fill(email);
    await this.page.getByPlaceholder("Senha").fill(password);
    await this.page.getByText("Entrar").click();
  }

  async alertHaveText(text) {
    const alert = this.page.locator("span[class$=alert]");
    await expect(alert).toHaveText(text);
  }
  async isLoggedIn(userName) {
    const logoutLink = this.page.locator('a[href="/logout"]');
    const loggerUser = this.page.locator(".logged-user");

    await this.page.waitForLoadState("networkidle");
    await expect(logoutLink).toBeVisible();
    await expect(this.page).toHaveURL("http://localhost:3000/admin/movies");
    await expect(this.page).toHaveURL(/.*admin/);
    await expect(loggerUser).toHaveText(`Olá, ${userName}`);
  }
}
