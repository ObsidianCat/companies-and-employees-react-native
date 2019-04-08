import React, {PureComponent} from 'react';
import {gql} from "apollo-boost";
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View, ScrollView} from "react-native";
import {Query} from "react-apollo";
import {ErrorScene, OverviewUserListItem, CompanyFullOverview} from "../../components";

const query = gql`
    query Company($companyId: ID!) {
        company(id: $companyId) {
            id
            color
            name
            catchPhrase
            image
            employees {
                id
                name
                image
                color
            }
        }
    }
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

export default class CompanyScene extends PureComponent {
  render() {
    const {navigation} = this.props;
    const id = navigation.getParam('id');

    return (
      <ScrollView style={styles.container}>
        <Query query={query} variables={{companyId: id}}>
          {({loading, error, data}) => {
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return <ErrorScene message={error.message} />;
            }

            return (
              <View>
                <CompanyFullOverview company={data.company} />
                <Text style={styles.sectionTitle}>Employees</Text>

                <FlatList
                  keyExtractor={(item) => item.id}
                  data={data.company.employees}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('UserScene', {id: item.id})
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
