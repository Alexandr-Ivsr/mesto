import { nameInput, aboutInput } from './constants.js';
import { userInfo } from '../pages/index.js';

export function getProfileValues() {
  const userInfoValues = userInfo.getUserInfo();
  nameInput.value = userInfoValues.userName;
  aboutInput.value = userInfoValues.userInfo;
}
