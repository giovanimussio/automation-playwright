import { Toast } from "./Components";

const { expect } = require("@playwright/test");

export class Movies {
  constructor(page) {
    this.page = page;
  }

  async goForm() {
    await this.page.locator('a[href$="register"]').click();
  }
  async submit() {
    await this.page.getByRole("button", { name: "Cadastrar" }).click();
  }
  async create(title, overview, company, release_year) {
    //Try to find element a with property href who starts with value register - await this.page.locator('a[href^="register"]').click()
    //Try to find element a with property href who contains value register - await this.page.locator('a[href*="register"]').click()
    //Try to find element a with property href who ends with value register -
    await this.goForm();

    await this.page.getByLabel("Titulo do filme").fill(title);
    await this.page.getByLabel("Sinopse").fill(overview);
    //Way to click and select a value in a dropdown
    await this.page
      .locator("#select_company_id .react-select__indicator")
      .click();
    //this 2 lines were added to have the HTML file to indetify a css locator to find the values in the checkbox
    // const html = await this.page.content();
    // console.log(html);
    await this.page
      .locator(".react-select__option")
      .filter({ hasText: company })
      .click();

    await this.page.locator("#select_year .react-select__indicator").click();
    await this.page
      .locator(".react-select__option")
      .filter({ hasText: release_year })
      .click();
    await this.submit();
    await this.alertHaveText("");
  }
  async alertHaveText(text) {
    const alert = this.page.locator("span[class$=alert]");
    await expect(alert).toHaveText(text);
  }
}
