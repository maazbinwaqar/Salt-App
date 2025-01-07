import {useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import useReduxStore from '../../Hooks/UseReduxStore';
import {types} from '../../Redux/types';
import {onBoardinData} from '../../Utils/localDB';

const useOnboardingScreen = ({navigate, params}) => {
  const {dispatch} = useReduxStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const width = Dimensions.get('window').width;

  const animationValue = {
    from: {
      opacity: isFirst ? 1 : 0,
    },
    to: {
      opacity: isFirst ? 0 : 1,
    },
  };

  const startAnimationFunc = () => setStartAnimation(!startAnimation);

  const hideFirstView = () => setIsFirst(!isFirst);

  const getStart = () => {
    dispatch({
      type: types.onBoardFinished,
    });
  };

  return {
    animationValue,
    startAnimation,
    startAnimationFunc,
    hideFirstView,
    isFirst,
    getStart,
  };
};

export default useOnboardingScreen;
