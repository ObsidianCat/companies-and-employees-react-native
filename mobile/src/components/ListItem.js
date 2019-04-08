import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {styleListItemBase as styles} from "./styleListItemBase"

const userImageStyles = StyleSheet.create({
  borderRadius: 40,

})

const companyImageStyles = StyleSheet.create({
  borderRadius: 15,
  listItem:{
    width: 300
  }
})

export default memo(({ item, type }) => {
  const secondaryText = type === "user"? item.email: item.catchPhrase
  const typeBasedImageStyles = type === "user"? userImageStyles: companyImageStyles
  return (
    <View style={[styles.listItem, typeBasedImageStyles.listItem]}>
      <View style={[styles.imageWrapper, { borderColor: item.color }, typeBasedImageStyles]}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
      <View style={styles.text}>
        <Text style={styles.textPrimary}>{item.name}</Text>
        <Text style={styles.textSecondary}>{secondaryText}</Text>
      </View>
    </View>
  )
});
