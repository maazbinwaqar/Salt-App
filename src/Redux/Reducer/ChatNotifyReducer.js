import {types} from '../types';

const initial_state = {
  chatNotify: {},
};

const actionMap = {
  [types.addChatNoification]: (state, act) => {
    const checkVal = Boolean(state.chatNotify[act.payload.trip_id]);
    checkVal
      ? state.chatNotify[act.payload.trip_id].push(act.payload)
      : (state.chatNotify[act.payload.trip_id] = [act.payload]);
    return {
      chatNotify: {...state.chatNotify},
    };
  },
  [types.clearNofityObjByID]: (state, act) => {
    const checkVal = Boolean(state.chatNotify[act.payload]);
    checkVal && delete state.chatNotify[act.payload];
    return {
      chatNotify: {...state.chatNotify},
    };
  },
  [types.clearAllChatNotifyObj]: (state, act) => ({
    ...state.chatNotify,
    chatNotify: {},
  }),
};

export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
