// @ts-nocheck
import config, { Theme } from '../config';
import hash from 'string-hash';
import xmldoc from 'xmldoc';
import _ from 'lodash';

import { __SPRITE_SOURCES__ } from '../themes/__SPRITE_SOURCES__';

const spriteXml = _.transform(
  __SPRITE_SOURCES__,
  (result: any, value: any, key: any) =>
    (result[key] = new xmldoc.XmlDocument(value).firstChild),
  {}
);

const setup = (text: string, theme: Theme = config.defaultTheme) => {
  const options = config.themes[theme];
  const uid = ('' + hash(text)).replace(/0/g, '1').split('');
  const viewBox = options.viewBox.split(' ');
  const width = viewBox[2];
  const height = viewBox[3];

  const shapes = _(options.shapes)
    .keys()
    .map((shape: string, index: number) => [
      shape,
      uid[index] > options.shapes[shape].length || _.isUndefined(uid[index])
        ? '01'
        : _.padStart(uid[index], 2, '0'),
    ])
    .fromPairs()
    .value();

  const colors = _(options.colors)
    .keys()
    .map((color: string, index: number) => {
      const item = options.colors[color];
      const maxLength = item.length - 1;

      return [
        color,
        uid[index] > maxLength ? item[1] : item[Number(uid[index])],
      ];
    })
    .fromPairs()
    .value();

  const fill = _(options.shapes)
    .mapValues((shape: any) => colors[shape.fill])
    .pickBy(_.identity)
    .value();

  const symbols = _.transform(
    spriteXml[theme].children,
    (result: any, value: any) => {
      result[value.attr.id] = value.children.join('');
    },
    {}
  );

  return { theme, shapes, colors, fill, symbols, width, height };
};

export default setup;
