const { expect } = require("@playwright/test");

export class LandingPage {
  constructor(page) {
    this.page = page;
  }
  async visit() {
    await this.page.goto("http://localhost:3000");
  }
  async openLeadModal() {
    await this.page.getByRole("button", { name: /Aperte o play/ }).click();
    await expect(
      this.page.getByTestId("modal").getByRole("heading")
    ).toHaveText("Fila de espera");
  }
  async submitLeadForm(name, email) {
    /*FIND element by id #
   await this.page.locator("#name").fill("Giovani Mombelli Mussio");*/

    /*FIND element by property name
  await this.page.locator("input[name=name]").fill("Giovani Mombelli Mussio");*/

    /*FIND element by property placeholder(1)
   await this.page
     .locator('input[placeholder="Informe seu nome"]')
     .fill("Giovani Mombelli Mussio");
   placeholder(2)*/

    await this.page.getByPlaceholder("Informe seu nome").fill(name);
    await this.page.locator("#email").fill(email);

    await this.page
      .getByTestId("modal")
      .getByText("Quero entrar na fila!")
      .click();
  }
  async toastHaveText(message) {
    /* Strategy to pickup the toast value
    await this.page.getByText("seus dados conosco").click();
    const content = await this.page.content();
    console.log(content);*/
    const toast = this.page.locator(".toast");
    await expect(toast).toHaveText(message);
    /*Toast should be hidden in at most 5 seconds*/
    await expect(toast).not.toBeVisible({ timeout: 5000 });
  }

  async alertHaveText(target) {
    await expect(this.page.locator(".alert")).toHaveText(target);
  }
}
