import { nameInput, jobInput } from './constants.js';
import { userInfo } from '../index.js';

export function getProfileValues() {
  const userInfoValues = userInfo.getUserInfo();
  nameInput.value = userInfoValues.userName;
  jobInput.value = userInfoValues.userInfo;
}
