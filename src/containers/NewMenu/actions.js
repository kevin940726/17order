import { createAction } from 'redux-actions';
import * as C from './constants';
import db from '../../db';
import { TODAY } from '../../utils/constants';
import { handleChange as handleMenuChange } from '../Menus/actions';

// make file public
const sharePublicUrl = (token, fileId) => (
  fetch(`https://slack.com/api/files.sharedPublicURL?token=${token}&file=${fileId}`)
    .then(res => res.json())
);

// upload to slack
const uploadFile = (token, file, options = {}) => {
  const form = new FormData();

  form.append('token', token);
  form.append('file', file);
  form.append('filename', file.name);

  if (options.title) {
    form.append('title', options.title);
  }
  if (options.channel) {
    form.append('channels', options.channel);
  }

  return fetch(`https://slack.com/api/files.upload`, {
    method: 'POST',
    body: form,
  })
    .then(res => res.json())
    .then(res => res && res.ok === true && sharePublicUrl(token, res.file.id))
    .then(res => res && res.ok === true && res.file.permalink_public);
};

export const handleOpenModal = createAction(C.HANDLE_OPEN_MODAL);

export const handleCloseModal = createAction(C.HANDLE_CLOSE_MODAL);

export const handleChange = createAction(C.HANDLE_CHANGE, (name, value) => ({
  name,
  value,
}));

export const handleSubmit = () => async (dispatch, getState) => {
  const { newMenu, auth, menus } = getState();
  const { fields, isEditing } = newMenu;
  const { user, access_token, team } = auth;

  const getFilePublicLink = async () => {
    if (fields.menu) {
      return fields.menu;
    }

    if (fields.file) {
      return Promise.all(
        [].map.call(fields.file, file => uploadFile(access_token, file, { title: fields.name }))
      );
    }

    return null;
  };

  const menusRef = db.ref(`${team.id}/menus`);
  const menu = isEditing ? menusRef.child(menus.active) : menusRef.push();

  return dispatch({
    type: C.HANDLE_SUBMIT,
    payload: getFilePublicLink()
      .then(filePublicLink => menu.set({
        date: TODAY,
        memberId: user.id,
        memberName: user.name,
        timestamp: Date.now(),
        ...fields,
        file: null, // don't include file
        menu: filePublicLink,
      }))
      .then(() => dispatch(handleMenuChange(menu.key)))
  });
};

export const editMenu = () => (dispatch, getState) => {
  const { menus } = getState();
  const fields = menus.menus.find(menu => menu.key === menus.active);

  dispatch(handleOpenModal());
  dispatch(handleChange('type', fields.type));
  dispatch(handleChange('name', fields.name));
  dispatch(handleChange('menu', fields.menu));
  dispatch(handleChange('file', {}));
  dispatch(handleChange('notes', fields.notes));

  return dispatch({
    type: C.EDIT_MENU,
  });
};

export const handleInputError = createAction(C.HANDLE_INPUT_ERROR, (name, message) => ({
  name,
  message,
}));

export const resetError = createAction(C.RESET_ERROR);

export const validateForm = () => (dispatch, getState) => {
  const { newMenu } = getState();
  const { fields } = newMenu;

  // no name
  if (!fields.name) {
    dispatch(handleInputError('name', 'Name is required'));
    return false;
  }

  dispatch(resetError());
  return true;
};
