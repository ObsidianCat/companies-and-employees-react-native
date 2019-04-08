import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import {styleListItemBase as styleBase} from "./styleListItemBase"
import {styleOverviewBase as styleOverviewBase} from "./styleOverviewBase"

export default memo(({ company }) => {
  return (
    <View style={[styleBase.overview, styleOverviewBase.overview]}>
      <View style={[styleBase.imageWrapper, styleOverviewBase.imageWrapper, {borderColor: company.color}]}>
        <Image style={[styleBase.image, styleOverviewBase.image]} source={{uri: company.image}} />
      </View>
      <View style={styleBase.text}>
        <Text style={styleBase.textPrimary}>{company.name}</Text>
        <Text style={styleBase.textSecondary}>{company.catchPhrase}</Text>
      </View>
    </View>)
});
