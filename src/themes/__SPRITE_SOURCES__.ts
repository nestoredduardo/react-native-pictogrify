import type { Theme } from 'src/config';

import femaleSprite from './avataars-female/sprite';
import maleSprite from './avataars-male/sprite';
import maleFlatSprite from './male-flat/sprite';
import monstersSprite from './monsters/sprite';

type SpriteSources = {
  [key in Theme]: string;
};

export const __SPRITE_SOURCES__: SpriteSources = {
  'avataars-female': femaleSprite,
  'avataars-male': maleSprite,
  'male-flat': maleFlatSprite,
  'monsters': monstersSprite,
};
