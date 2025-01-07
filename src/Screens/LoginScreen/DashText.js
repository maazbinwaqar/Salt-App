import {hp} from '../../Config/responsive';

const {TextComponent} = require('../../Components/TextComponent');

const DashText = ({text, styles}) => {
  return (
    <TextComponent
      text={`------------- Or ${text} With -------------`}
      styles={{
        color: 'black',
        textAlign: 'center',
        marginTop: hp('15'),
        ...styles,
      }}
    />
  );
};
export default DashText;
