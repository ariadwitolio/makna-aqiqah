import * as migration_20260712_184253 from './20260712_184253.js';
import * as migration_20260712_205905_add_hero_and_gallery_fields from './20260712_205905_add_hero_and_gallery_fields.js';

export const migrations = [
  {
    up: migration_20260712_184253.up,
    down: migration_20260712_184253.down,
    name: '20260712_184253',
  },
  {
    up: migration_20260712_205905_add_hero_and_gallery_fields.up,
    down: migration_20260712_205905_add_hero_and_gallery_fields.down,
    name: '20260712_205905_add_hero_and_gallery_fields'
  },
];
