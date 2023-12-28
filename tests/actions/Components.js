const { expect } = require("@playwright/test");
export class Toast {
  constructor(page) {
    this.page = page;
  }
  async containText(message) {
    /* Strategy to pickup the toast value
        await this.page.getByText("seus dados conosco").click();
        const content = await this.page.content();
        console.log(content);*/
    const toast = this.page.locator(".toast");
    await expect(toast).toContainText(message);
    /*Toast should be hidden in at most 5 seconds*/
    await expect(toast).not.toBeVisible({ timeout: 5000 });
  }
}
