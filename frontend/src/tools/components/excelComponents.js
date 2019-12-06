import React from "react";

import { extractCellRichTextStyle } from "tools/excel";

import uniqid from "uniqid";

export const RichTextCellContent = (richText) => {
  let Fragments = [];

  const richTextLength = richText.length;

  for(let fragmentIndex = 0; fragmentIndex < richTextLength; fragmentIndex++) {
    const fragment = richText.get(fragmentIndex);

    const fragmentStyles = extractCellRichTextStyle(fragment);

    if(fragmentStyles) {
      const fragmentText = fragment.value();

      Fragments.push(
        <span key={uniqid()} style={fragmentStyles}>
          {fragmentText}
        </span>
      );
    }
  }

  return Fragments;
};