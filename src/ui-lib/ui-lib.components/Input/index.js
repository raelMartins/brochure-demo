export {Input} from './input';
export {FormInput} from './formInput';
export {PhoneInput} from './PhoneInput';
export {CurrencyInput} from './CurrencyInput';
export {TitleInput} from './TitleInput';
export {EditableInput} from './editable';
export {FormTextarea} from './formTextarea';
export {FormSelect} from './formSelect';

export const placeholder_style = {
  fontSize: `13px`,
  letterSpacing: '0.52px',
  color: 'text',
  opacity: 0.8,
  fontWeight: 500,
};

export const getFormInputStyles = (error, rest) => {
  const height = rest?.h || rest?.height || '60px';
  const background =
    rest?.background || rest?.bg || rest?.backgroundColor || rest?.bgColor || `transparent`;

  return {
    position: 'relative',
    fontSize: `16px`,
    p: `13.333px 18.667px`,
    color: rest?.color || 'text',
    fontWeight: `400`,
    borderRadius: rest?.borderRadius || `full`,
    rounded: rest?.rounded,
    border: !error && rest?.border ? rest?.border : `1px solid !important`,
    borderColor: error
      ? `#FF3636 !important`
      : rest?.borderColor || `matador_border_color.100 !important`,
    background: background,
    height: height,
    w: `full`,
    _placeholder: {opacity: 0.8},
    _active: {
      boxShadow: 'transparent',
      outline: 'none',
      border: !error && rest?.border ? rest?.border : `1px solid !important`,
      borderColor: error
        ? `#FF3636 !important`
        : rest?.borderColor || `matador_border_color.100 !important`,
    },
    _focus: {
      boxShadow: 'transparent',
      outline: 'none',
      border: !error && rest?.border ? rest?.border : `1px solid !important`,
      borderColor: error
        ? `#FF3636 !important`
        : rest?.borderColor || `matador_border_color.100 !important`,
    },
    _focusVisible: {
      boxShadow: 'transparent',
      outline: 'none',
      border: !error && rest?.border ? rest?.border : `1px solid !important`,
      borderColor: error
        ? `#FF3636 !important`
        : rest?.borderColor || `matador_border_color.100 !important`,
    },
  };
};

export const defaultLabelStyling = {
  fontSize: '13px',
  color: 'matador_text.label',
  fontWeight: 500,
  mb: `6px`,
};

export const getInputDropDownStyle = rest => {
  const height = rest?.h || rest?.height || `44px`;

  return {
    overflowX: 'hidden',
    opacity: '0',
    zIndex: '2',
    position: 'absolute',
    p: '0px !important',
    cursor: 'pointer',
    left: '10px',
    top: '10px',
    bottom: `0px`,
    border: 'none',
    lineHeight: '18px ',
    fontSize: '16px',
    height: height,
    fontWeight: '400',
    _focus: {border: 'none'},
    _active: {
      border: 'none',
    },
    _disabled: {color: `transparent`},
    sx: {
      paddingInlineStart: '0.05rem',
    },
  };
};
