/* eslint-disable cypress/no-unnecessary-waiting */
describe("テスト", () => {
  it("普通に押す", () => {
    cy.visit("http://localhost:3000");
    cy.clock();

    cy.get('input[type="text"]').type("test");
    cy.get('button[type="submit"]').click();
    cy.get(".react-calendar-heatmap-week > *").last().as("todayCell");
    cy.get("@todayCell").should("have.class", "color-empty");
    cy.get('button[type="button"]').contains("test").click();
    cy.get("@todayCell").should("have.class", "color-filled");
    cy.tick(1000);
    cy.wait(10000);
    cy.contains("最後に押した日時：1970-01-01 09:00:00");
    cy.contains("最後に押してから：1 second");
  });
  it("押し忘れ押す", () => {
    cy.visit("http://localhost:3000");
    cy.clock();

    cy.get('input[type="text"]').type("test");
    cy.get('button[type="submit"]').click();
    cy.get(".react-calendar-heatmap-week > *")
      .last()
      .prev()
      .as("yesterdayCell");
    cy.get("@yesterdayCell").should("have.class", "color-empty");
    cy.get('button[type="button"]').contains("押し忘れ").click();
    cy.get("@yesterdayCell").should("have.class", "color-filled");
    cy.tick(1000);
    cy.wait(10000);
    cy.contains("最後に押した日時：1969-12-31 23:59:59");
    cy.contains("最後に押してから：9 hours 2 seconds");
  });
  it("clear押す", () => {});
  it("all clear押す", () => {});
});
