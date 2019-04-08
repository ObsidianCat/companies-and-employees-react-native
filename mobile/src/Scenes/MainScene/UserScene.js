import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import {
  ErrorScene,
  UserFullOverview,
  OverviewUserListItem,
  ListItem
} from '../../components';

export const USER_BASE_FRAGMENT = gql`
    fragment UserBaseFragment on User {
        id
        name
        image
        color
    }`

export const COMPANY_BASE_FRAGMENT = gql`
    fragment CompanyBaseFragment on Company {
        id
        name
        image
    }`

const query = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      ...UserBaseFragment
      email
      company {
        ...CompanyBaseFragment
      }
      address {
        country
        city
        cityPrefix
        citySuffix
      }
      friends {
        ...UserBaseFragment
      }
    }
  }
  ${USER_BASE_FRAGMENT}
  ${COMPANY_BASE_FRAGMENT}
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  sectionTitle: {
    fontSize: 30
  }
});

export default class UserScene extends PureComponent {
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    return (
      <ScrollView style={styles.container} keyboardDismissMode='on-drag'
                  keyboardShouldPersistTaps={"always"}>
        <Query query={query} variables={{ userId: id }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return <ErrorScene message={error.message} />;
            }

            return (
              <View>
                <UserFullOverview user={data.user} />
                <Text style={styles.sectionTitle}>Company</Text>
                {data.user.company &&
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CompanyScene', { id: data.user.company.id })
                  }
                >
                  <ListItem item={data.user.company} type="company" />
                </TouchableOpacity>
                }

                <Text style={styles.sectionTitle}>Friends</Text>

                <FlatList
                  keyExtractor={item => item.id}
                  data={data.user.friends}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('UserScene', { id: item.id })
                      }
                    >
                      <OverviewUserListItem user={item} type="user" />
                    </TouchableOpacity>
                  )}
                />
              </View>
            );
          }}
        </Query>
      </ScrollView>
    );
  }
}
