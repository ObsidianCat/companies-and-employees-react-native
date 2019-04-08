import React, { PureComponent } from 'react';
import {ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import {ErrorScene, ListItem} from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const query = gql`
    query Companies {
        companies {
            id
            color
            name
            image
            catchPhrase
        }
    }
`;

export default class CompaniesScene extends PureComponent {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return <ErrorScene message={error.message} />;
            }

            return (
              <FlatList
                style={styles.container}
                keyExtractor={(item) => item.id}
                data={data.companies}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CompanyScene', { id: item.id })
                    }
                  >
                    <ListItem key={item.id} item={item} type="company" />
                  </TouchableOpacity>
                )}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}
