import { css } from 'styled-components';
import { baseFontSize } from '../styles/theme.json';

const fontSize = /[0-9]+/.exec(baseFontSize)[0];

const sizes = {
  phone: 320,
  tablet: 768,
  desktop: 992,
  yuge: 1200,
};

export default Object.keys(sizes).reduce((accumulator, key) => {
  accumulator[key] = (...args) => css`
    @media only screen and (min-width: ${sizes[key] / fontSize}em) {
      ${css(...args)}
    }
  `;

  return accumulator;
}, {});
