import {types} from '../types';

const initial_state = {
  inviNotify: [],
};

const actionMap = {
  [types.addNotiInvitation]: (state, act) => {
    return {
      inviNotify: [...state.inviNotify, act.payload],
    };
  },
  [types.ClearNotifyInvitation]: (state, act) => ({
    ...state.inviNotify,
    inviNotify: [],
  }),
};

export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
