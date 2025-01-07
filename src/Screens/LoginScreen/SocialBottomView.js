import {Image, View} from 'react-native';
import {Touchable} from '../../Components/Touchable';
import {appleImage, facebookImage, googleImage} from '../../Assets';
import {styles} from './styles';

const SocialBottomView = ({google, facebook, apple}) => {
  return (
    <View style={styles.socialView}>
      <Touchable onPress={() => onPress('Google')}>
        <Image
          source={googleImage}
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </Touchable>
      <Touchable onPress={() => onPress('Apple')}>
        <Image
          source={appleImage}
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </Touchable>
      <Touchable onPress={() => onPress('Facebook')}>
        <Image
          source={facebookImage}
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </Touchable>
    </View>
  );
};

export default SocialBottomView;
