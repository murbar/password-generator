import { css } from 'styled-components';

const sizes = {
  desktop: 1050,
  tablet: 760,
  phone: 500
};

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}rem) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const addAlpha = (hsl, alpha) => {
  return `${hsl.slice(0, -1)}, ${alpha})`;
};
