import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  overview: {
    flexDirection: 'row',
    padding: 10
  },
  imageWrapper: {
    marginRight: 20,
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 50,
    height: 50,
    overflow: 'hidden'
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  text: {
    flexDirection: 'column'
  },
  textName: {
    fontSize: 24
  },
  textEmail: {
    fontSize: 18
  }
});

export default memo(({ user }) => (
  <View style={styles.overview}>
    <View style={[styles.imageWrapper, { borderColor: user.color }]}>
      <Image style={styles.image} source={{ uri: user.image }} />
    </View>
    <View style={styles.text}>
      <Text style={styles.textName}>{user.name}</Text>
      <Text style={styles.textEmail}>{user.email}</Text>
    </View>
  </View>
));
