// src/data/projectsConfig.ts
// Backwards-compatible barrel re-exporting modular types and project data.

export type {
  SupportedLang,
  SceneCutDetail,
  ProductionBlueprintScene,
  LegoComponentItem,
  ComparisonRow,
  StrategicPillar,
  CharacterCastRigSpec,
  CharacterCastRig,
  ProjectComprehensive,
} from './types';

export {
  CHAI_PROJECT_DATA,
  CRABIT_PROJECT_DATA,
  CRABIT_PROJECT_DATA as CRABIT_PROJECT,
  SHOWCASE_PROJECTS,
} from './projects';
