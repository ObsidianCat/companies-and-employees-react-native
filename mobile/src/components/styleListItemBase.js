import { StyleSheet } from 'react-native';

export const styleListItemBase = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    padding: 20,
  },
  imageWrapper: {
    marginRight: 20,
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 80,
    height: 80,
    overflow: 'hidden'
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  text: {
    flexDirection: 'column'
  },
  textPrimary: {
    fontSize: 24
  },
  textSecondary: {
    fontSize: 18
  }
});
