import React, { useCallback, useEffect } from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import Divider from '@material-ui/core/Divider';

import { Editable, Slate, ReactEditor } from 'slate-react';

import { Transforms, Editor } from 'slate';

import { setActiveCellInputValue } from '../../../store/actions/ui/excel/commands';

import { disableSheetFocus } from '../../../store/actions/ui/excel/events';

import { keyEnter, keyTab, keyEscape } from '../../../store/actions/ui/excel/keyboard';

import './FormulaBar.scss';

const Leaf = ({ attributes, children }) => <span {...attributes}>{children}</span>;

// ! Only one element for now
const Element = ({ attributes, children }) => <p {...attributes}>{children}</p>;

const InputField = () => {
  const dispatch = useDispatch();

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const handleKeyDown = useCallback(
    event => {
      const { key } = event;

      if (key === 'Enter') {
        event.preventDefault();
        dispatch(keyEnter());
      } else if (key === 'Tab') {
        event.preventDefault();
        dispatch(keyTab());
      } else if (key === 'Escape') {
        dispatch(keyEscape());
      }
    },
    [dispatch],
  );

  const { formulaEditor, formulaValue, isSheetFocused } = useSelector(
    ({
      ui: {
        excel: {
          present: {
            activeCellInputData: { formulaEditor, formulaValue },
            isSheetFocused,
          },
        },
      },
    }) => ({
      formulaEditor,
      formulaValue,
      isSheetFocused,
    }),
    shallowEqual,
  );

  const handleInputChange = useCallback(
    value => {
      if (!isSheetFocused) dispatch(setActiveCellInputValue({ value, input: 'formula' }));
    },
    [dispatch, isSheetFocused],
  );

  useEffect(() => {
    if (!isSheetFocused) {
      ReactEditor.focus(formulaEditor);
      Transforms.select(formulaEditor, Editor.end(formulaEditor, []));
    }
  }, [dispatch, isSheetFocused]);

  const handleClick = useCallback(() => {
    dispatch(disableSheetFocus());
  }, [dispatch]);

  return (
    <Slate
      editor={formulaEditor}
      value={formulaValue}
      onChange={handleInputChange}
      onClick={handleClick}
    >
      <Editable
        className="formulaBar__input"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={handleKeyDown}
        onFocus={handleClick}
      />
    </Slate>
  );
};

const FormulaBar = () => (
  <div className="formulaBar">
    <div className="formulaBar__icon">fx</div>
    <Divider orientation="vertical" light />
    <InputField />
  </div>
);

export default FormulaBar;
