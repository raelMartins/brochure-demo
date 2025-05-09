import {useTheme} from '@emotion/react';

export const useLightenHex = baseHex => {
  const theme = useTheme();
  const primaryColor = baseHex ?? theme?.colors?.custom_color?.color_pop;
  const lightenHex = percent => {
    let hex = primaryColor?.replace(/^#/, '');

    if (hex.length === 3) {
      hex = hex
        .split('')
        .map(char => char + char)
        .join('');
    } else if (hex.length === 4) {
      hex = hex
        .split('')
        .map(char => char + char)
        .join('');
    }

    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    let a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) : 255;

    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

    let newHex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();

    if (a !== 255) {
      newHex += a.toString(16).padStart(2, '0').toUpperCase();
    }

    return '#' + newHex;
  };

  return {
    lightenHex,
  };
};
