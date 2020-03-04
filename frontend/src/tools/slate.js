import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { Editor, Transforms, createEditor } from 'slate'
// import { withHistory } from 'slate-history'

export const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

export const CustomEditor = {
  isMarkActive: (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  },
  toggleMark: (editor, format) => {
    const isActive = CustomEditor.isMarkActive(editor, format);
  
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  }
};

const TYPE_TEXT_ELEMENTS = [
  "paragraph"
];

export const convertEditorValueToText = (elements) => {
  let text = "";
  let blockFound = false;
  elements.forEach(({ type, children }) => {
    if(type in TYPE_TEXT_ELEMENTS) {
      children.forEach(({ text: childText }, index) => {
        if(!index && blockFound) text += "\n";

        text += childText;

        blockFound = true;
      });
    } 
  });

  return text;
};

export const convertTextToEditorValue = (text) => [ 
  { 
    type: "paragraph", 
    children: [ { text } ] 
  } 
];

const richTextToEditorMap = {
  fontWeight: {
    bold: "bold"
  },
  fontStyle: {
    italic: "italic"
  },
  textDecoration: {
    underline: "underline",
    "line-through": "strikethrough"
  },
  verticalAlign: {
    sub: "subscript",
    super: "superscript"
  },
  color: {},
  fontSize: {},
  fontFamily: {}
};

const editorToRichTextMap = {
  // Boolean behaviours
  bold: { property: "fontWeight", style: "bold" },
  italic: { property: "fontStyle", style: "italic" },
  underline: { property: "textDecoration", style: "underline" },
  strikethrough: { property: "textDecoration", style: "line-through" },
  subscript: { property: "verticalAlign", style: "sub" },
  superscript: { property: "vericalAlign", style: "super" },

  // Dynamic/non-boolean properties
  color: { property: "color" },
  fontSize: { property: "fontSize" },
  fontFamily: { property: "fontFamily" }
};

export const convertEditorValueToRichText = (elements) => {
  let richText = [];

  let blockFound = false;
  elements.forEach(({ type, children }) => {
    if(type in TYPE_TEXT_ELEMENTS) {
      children.forEach((data, childIndex) => {
        let styles = {};
        let { text } = data;

        if(!childIndex && blockFound) text = `\n${text}`;

        delete data.text;

        for(let valueStyle in data) {
          const styleData = data[valueStyle];

          if(styleData) {
            let { property, style } = editorToRichTextMap[valueStyle];

            // data[valueStyle] is the dynamic value (colour, font family) when the rich text style doesn't have a style key
            styles[property] = style ? style : data[valueStyle];
          }
        }

        blockFound = true;

        richText.push({ text, styles });
      });
    }
  });

  return richText;
};

export const convertRichTextToEditorValue = (richText) => [
  {
    type: "paragraph",
    children: richText.map(({ text, styles }) => {
      let childContent = { text };

      for(let property in styles) {
        let style = styles[property];

        const propertyContents = richTextToEditorMap[property];

        const styleSegments = style.split(" ");

        // It's possible that the inline style has more than one segment (ie textDecoration: "underline line-through")
        styleSegments.forEach((segment) => {
          if(propertyContents) {
            const styleContents = propertyContents[segment];
  
            if(styleContents) {
              childContent[styleContents] = true;
            // ! Potentially dynamic (font size, color, ...) - Consider other cases?
            } else {
              childContent[property] = styles[property];
            }
          }
        });
      }

      return childContent;
    })
  }
];