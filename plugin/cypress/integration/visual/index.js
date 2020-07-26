describe('index', () => {
  before(() => {
    cy.visit('/');
  });

  it('police', () => {
    cy.get('[data-testid=police]').not('matchImageSnapshot');
  });

  it('yellow', () => {
    cy.get('[data-testid=yellow]').not('matchImageSnapshot');
  });

  it('noise', () => {
    cy.get('[data-testid=noise]').not('matchImageSnapshot');
  });

  it('em', () => {
    cy.get('[data-testid=em]').not('matchImageSnapshot');
  });

  it('full page', () => {
    cy.matchImageSnapshot({
      failureThreshold: 0.4,
      failureThresholdType: 'percent',
    });
  });
});
