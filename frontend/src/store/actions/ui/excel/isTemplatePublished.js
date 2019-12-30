import {
  PUBLISH_TEMPLATE, 
  UNPUBLISH_TEMPLATE, 
  TOGGLE_TEMPLATE_PUBLISH,
  UPDATE_PUBLISH_TEMPLATE
} from "actionCreators";

export const publishTemplate = ()  => ({ type: PUBLISH_TEMPLATE });
export const unpublishTemplate = () => ({ type: UNPUBLISH_TEMPLATE });
export const toggleTemplatePublish = () => ({ type: TOGGLE_TEMPLATE_PUBLISH });
export const updatePublishTemplate = (published) => ({ type: UPDATE_PUBLISH_TEMPLATE, published });
