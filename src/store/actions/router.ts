import actionTypes from '../actionTypes';

const { ROUTER } = actionTypes;

export const switchTab = (url: string) => {
  return {
    type: ROUTER.SWITCH_TAB,
    playload: {
      url
    }
  };
};

export const navigateTo = (param: Taro.navigateTo.Param) => {
  return {
    type: ROUTER.NAVIGATE_TO,
    playload: param
  };
};

export const logout = () => {
  return {
    type: ROUTER.LOGOUT
  };
};

export interface LoginAction {
  type: string;
  playload: {
    token: string;
  };
}

export const login = (token: string) => {
  return {
    type: ROUTER.LOGIN,
    playload: {
      token
    }
  };
};
