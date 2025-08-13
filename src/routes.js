// Route definitions for VirtuPrep application

export const routes = {
  HOME: '/',
  SCENARIOS: '/scenarios',
  SIMULATION: '/simulation',
  RESULTS: '/results',
  INTERVIEW_PREP: '/interview-prep',
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
  {
    path: routes.INTERVIEW_PREP,
    name: 'Interview Prep',
    component: 'InterviewPrep',
    exact: false,
  },
];

export const navigationItems = [
  {
    name: 'Home',
    path: routes.HOME,
  },
  {
    name: 'VR Practice',
    path: routes.SCENARIOS,
  },
  {
    name: 'Interview Prep',
    path: routes.INTERVIEW_PREP,
  },
];

export default routes;
