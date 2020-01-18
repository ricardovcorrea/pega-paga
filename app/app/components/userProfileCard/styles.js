import { StyleSheet } from 'react-native';
import theme from '../../general/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: `rgba(0,0,0,0.3)`,
    flexDirection: `row`,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  textContainer: {
    padding: 15
  },
  textId: {
    fontSize: 20,
    fontWeight: `600`,
    color: theme.secondary
  },
  textFirstName: {
    fontSize: 25,
    fontWeight: `700`,
    color: theme.secondary
  },
  textSurName: {
    fontSize: 14,
    color: theme.secondary
  },


});

export default styles;