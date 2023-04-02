import themes from '../themes';

enum ThemeEnum {
  'avataars-female' = 'avataars-female',
  'avataars-male' = 'avataars-male',
  'monsters' = 'monsters',
  'male-flat' = 'male-flat',
}

export type Theme = keyof typeof ThemeEnum;

export default {
  defaultTheme: 'male-flat' as Theme,
  themes,
};
