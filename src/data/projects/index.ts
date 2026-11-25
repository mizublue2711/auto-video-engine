// src/data/projects/index.ts
import { ProjectComprehensive } from '../types';
import { CHAI_PROJECT_DATA } from './chai-meritz-2611';
import { CRABIT_PROJECT_DATA } from './crabit-korea';

export { CHAI_PROJECT_DATA } from './chai-meritz-2611';
export { CRABIT_PROJECT_DATA } from './crabit-korea';

// Tab 1 is Chai Meritz (Default active), Tab 2 is Crabit Korea
export const SHOWCASE_PROJECTS: ProjectComprehensive[] = [
  CHAI_PROJECT_DATA,
  CRABIT_PROJECT_DATA,
];
