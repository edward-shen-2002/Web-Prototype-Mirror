const TOGGLE_TEMPLATE_PUBLISH = state => ({
  ...state,
  isTemplatePublished: !state.isTemplatePublished,
});

export default TOGGLE_TEMPLATE_PUBLISH;
