// @ts-nocheck
import React from 'react';
import { SvgXml } from 'react-native-svg';

import setup from '../setup';
import type { Theme } from '../config';

export interface PictogrifyProps {
  text: string;
  theme: Theme;
}

export default function Pictogrify(props: PictogrifyProps) {
  const { text, theme } = props;

  const property = setup(text, theme);

  const template = (prop, mode = 'use') => {
    let includes = [];

    for (let item of Object.keys(prop.shapes)) {
      includes.push(include(prop, item, prop.shapes[item], mode));
    }

    return `
      <svg viewBox="0 0 ${prop.width} ${
      prop.height
    }" xmlns="http://www.w3.org/2000/svg">
        <defs>
          ${Object.keys(prop.symbols)
            .map((key) => {
              const svg = prop.symbols[key];
              return `<symbol id="${key}" viewBox="0 0 ${prop.width} ${prop.height}">${svg}</symbol>`;
            })
            .join('\n')}
        </defs>
        <rect fill="${
          prop.colors ? prop.colors.background : '#fff'
        }" x="0" y="0" width="${prop.width}" height="${prop.height}"></rect>
        ${includes.join('\n')}
      </svg>
    `;
  };

  const include = (prop, part, index, mode) => {
    const fillable = prop.fill[part] ? `fill="${prop.fill[part]}"` : '';

    if (mode === 'use') {
      return `<use class="${part}" ${fillable} xlink:href="#${part}-${index}" width="${prop.width}" height="${prop.height}"/>`;
    }

    if (mode === 'inline') {
      const svg = prop.symbols[`${part}-${index}`];

      return `
        <svg class="${part}" ${fillable} xmlns="http://www.w3.org/2000/svg">
        ${svg}
        </svg>`;
    }

    return '';
  };

  return <SvgXml xml={template(property)} />;
}
