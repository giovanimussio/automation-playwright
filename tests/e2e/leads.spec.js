const { test, expect } = require("../support");
const { faker } = require("@faker-js/faker");

test("deve cadastrar um lead na fila de espera ", async ({ page }) => {
  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";

  await page.landing.visit();
  await page.landing.openLeadModal();
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  await page.landing.submitLeadForm(leadName, leadEmail);
  await page.toast.containText(message);
});

test("nao deve cadastrar quando email jah existe ", async ({
  page,
  request,
}) => {
  const message =
    "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post("http://localhost:3333/leads", {
    data: {
      name: leadName,
      email: leadEmail,
    },
  });
  expect(newLead.ok()).toBeTruthy();

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, leadEmail);
  await page.toast.containText(message);
});

test("nao deve cadastrar com email incorreto ", async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();

  await page.landing.submitLeadForm(
    "Giovani Mombelli Mussio",
    "giomussio.gmail.com"
  );
  await page.landing.alertHaveText("Email incorreto");
});

test("nao deve cadastrar quando o nome nao eh preenchido ", async ({
  page,
}) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm("", "giomussio@gmail.com");
  await page.landing.alertHaveText("Campo obrigatório");
});

test("nao deve cadastrar quando o email nao eh preenchido ", async ({
  page,
}) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm("Giovani Mombelli Mussio", "");
  await page.landing.alertHaveText("Campo obrigatório");
});

test("nao deve cadastrar quando nenhum campo eh preenchido ", async ({
  page,
}) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm("", "");
  //in this scenario the locator have 2 results, using this array it's possible to validate the message in this two locators
  await page.landing.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});
