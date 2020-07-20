export const getMainFontStylesStates = ({ fontWeight, fontStyle, textDecoration }) => ({
  bold: fontWeight === 'bold',
  italic: fontStyle === 'italic',
  underline: textDecoration && textDecoration.includes('underline'),
  strikethrough: textDecoration && textDecoration.includes('line-through'),
});
