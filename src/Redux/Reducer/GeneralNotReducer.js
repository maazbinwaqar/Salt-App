import {types} from '../types';

const initial_state = {
  generalNotify: [],
};

const actionMap = {
  [types.addNotification]: (state, act) => {
    return {
      generalNotify: [...state.generalNotify, act.payload],
    };
  },
  [types.ClearNotify]: () => initial_state,
};

export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
