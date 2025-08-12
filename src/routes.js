// Route definitions for VirtuPrep application

export const routes = {
  HOME: '/',
  SCENARIOS: '/scenarios',
  SIMULATION: '/simulation',
  RESULTS: '/results',
};

export const routeConfig = [
  {
    path: routes.HOME,
    name: 'Home',
    component: 'LandingPage',
    exact: true,
  },
  {
    path: routes.SCENARIOS,
    name: 'Scenarios',
    component: 'ScenarioSelect',
    exact: true,
  },
  {
    path: routes.SIMULATION,
    name: 'Simulation',
    component: 'Simulation',
    exact: true,
  },
  {
    path: routes.RESULTS,
    name: 'Results',
    component: 'Results',
    exact: true,
  },
];

export const navigationItems = [
  {
    name: 'Home',
    path: routes.HOME,
  },
  {
    name: 'Practice',
    path: routes.SCENARIOS,
  },
];

export default routes;
