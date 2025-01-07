import {View} from 'react-native';
import {TextComponent} from '../../Components/TextComponent';
import {Colors} from '../../Theme/Variables';
import {styles} from './styles';
import {wp} from '../../Config/responsive';

const BottomText = ({text, ButtonText, onPress, viewStyle}) => {
  return (
    <View style={{...styles.bottomTextView, ...viewStyle}}>
      <TextComponent
        text={text}
        styles={{color: 'black', marginRight: wp('2')}}
      />
      <TextComponent
        text={ButtonText}
        styles={{color: Colors.themeRed}}
        onPress={onPress}
      />
    </View>
  );
};

export default BottomText;
