/* eslint-disable cypress/no-unnecessary-waiting */
const now = new Date(2022, 1, 1).getTime();

describe("テスト", () => {
  it("普通に押す", () => {
    cy.visit("http://localhost:3000");
    cy.clock(now);

    cy.get('input[type="text"]').type("test");
    cy.get('button[type="submit"]').click();
    cy.get(".react-calendar-heatmap-week > *").last().as("todayCell");
    cy.get("@todayCell").should("have.class", "color-empty");
    cy.get('button[type="button"]').contains("test").click();
    cy.get("@todayCell").should("have.class", "color-filled");
    cy.tick(1000);
    cy.contains("2022-02-01 00:00:00");
    cy.contains("最後に押してから：1 second");
    cy.get('button[type="button"]').contains("test clear").click();
    cy.get('button[type="button"]').contains("はい").click();
    cy.get("body").should("not.contain", "test");
  });
  it("押し忘れ押す", () => {
    cy.visit("http://localhost:3000");
    cy.clock(now);

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
    cy.contains("最後に押した日時：2022-01-31 23:59:59");
    cy.contains("最後に押してから：2 seconds");
    cy.get('button[type="button"]').contains("test clear").click();
    cy.get('button[type="button"]').contains("はい").click();
    cy.get("body").should("not.contain", "test");
  });
  it("all clear押す", () => {
    cy.visit("http://localhost:3000");
    cy.clock(now);

    cy.get('input[type="text"]').type("test");
    cy.get('button[type="submit"]').click();
    cy.get('input[type="text"]').type("test 2");
    cy.get('button[type="submit"]').click();
    cy.contains("test");
    cy.contains("test 2");
    cy.get('button[type="button"]').contains("all clear").click();
    cy.get('button[type="button"]').contains("はい").click();
    cy.get("body").should("not.contain", "test");
    cy.get("body").should("not.contain", "test 2");
  });
});
