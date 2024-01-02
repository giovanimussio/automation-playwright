const { test } = require("../support");
const data = require("../support/fixtures/movies.json");
const { executeSQL } = require("../support/database");

test.beforeAll(async () => {
  await executeSQL(`DELETE FROM movies;`);
});
test("deve cadastrar um novo filme", async ({ page }) => {
  const movie = data.create;

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.movies.create(movie);
  await page.toast.containText("Cadastro realizado com sucesso!");
});
test("nao deve cadastrar quando o titulo eh duplicado", async ({ page }) => {
  const movie = data.duplicate;

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.movies.create(movie);
  await page.toast.containText("Cadastro realizado com sucesso!");
  await page.movies.create(movie);
  await page.toast.containText(
    "Oops!Este conteúdo já encontra-se cadastrado no catálogo"
  );
});
test("nao deve cadastrar quando os campos obrigatorios nao sao preenchidos", async ({
  page,
}) => {
  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.movies.goForm();
  await page.movies.submit();

  await page.movies.alertHaveText([
    "Por favor, informe o título.",
    "Por favor, informe a sinopse.",
    "Por favor, informe a empresa distribuidora.",
    "Por favor, informe o ano de lançamento.",
  ]);
});
