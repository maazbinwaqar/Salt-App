import {types} from '../types';

const initial_state = {
  islocationShare: false,
  tripId: null,
  tripOwnerID: null,
};
const actionMap = {
  [types.isLocationTrue]: (state, act) => {
    console.log('kjavjkvskdvjksbd vbsdjvs', act.payload);
    return {
      islocationShare: true,
      tripId: act.payload.tripId,
      tripOwnerID: act.payload.tripOwnerID,
    };
  },
  [types.isLocationFalse]: () => initial_state,
};
export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
