import type { Theme } from 'src/config';

import femaleSprite from 'src/themes/avataars-female/sprite';
import maleSprite from 'src/themes/avataars-male/sprite';
import maleFlatSprite from 'src/themes/male-flat/sprite';
import monstersSprite from 'src/themes/monsters/sprite';

type SpriteSources = {
  [key in Theme]: string;
};

export const __SPRITE_SOURCES__: SpriteSources = {
  'avataars-female': femaleSprite,
  'avataars-male': maleSprite,
  'male-flat': maleFlatSprite,
  'monsters': monstersSprite,
};
