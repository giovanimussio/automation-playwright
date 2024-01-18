const { test, expect } = require("../support");

test("deve logar como administrador", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("admin@zombieplus.com", "pwd123");
  await page.login.isLoggedIn("Admin");
});

test("nao deve logar quando a senha esta incorreta", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("admin@zombieplus.com", "abc123");
  const message = `Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.`;

  await page.popup.haveText(message);
});

test("nao deve logar quando o campo email nao esta preenchido", async ({
  page,
}) => {
  await page.login.visit();
  await page.login.submit("", "abc123");
  await page.login.alertHaveText("Campo obrigatório");
});
test("nao deve logar quando o campo email estah incorreto", async ({
  page,
}) => {
  await page.login.visit();
  await page.login.submit("www.google.com", "abc123");
  await page.login.alertHaveText("Email incorreto");
});

test("nao deve logar quando o campo senha nao eh preenchido", async ({
  page,
}) => {
  await page.login.visit();
  await page.login.submit("email@email.com", "");
  await page.login.alertHaveText("Campo obrigatório");
});

test("nao deve logar quando nenhum campo eh preenchidoa", async ({ page }) => {
  await page.login.visit();
  await page.login.submit("", "");
  await page.login.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});
