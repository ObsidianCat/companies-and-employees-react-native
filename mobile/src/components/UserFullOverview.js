import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TextInput,
} from 'react-native';
import {styleListItemBase as styleBase} from './styleListItemBase';
import {styleOverviewBase} from './styleOverviewBase';
import {gql} from 'apollo-boost';
import {Mutation} from 'react-apollo';

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#d5d6d7'
  },
  imageWrapper: {
    borderRadius: 40
  },
  hidden: {
    display: "none"
  },
});

const updateUserMutation = gql`
    mutation UpdateUser($updatedUser: UserInput!) {
        updateUser(user: $updatedUser){
            id,
            name,
            email
        }
    }
`;


export default class extends PureComponent {
  state = {
    isEditing: false
  };

  componentDidMount() {
    this.setState(prevState => ({
      name: this.props.user.name,
      email: this.props.user.email
    }));
  }

  toogleEditSave = () => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }));
  };

  renderEditDetails = (name, email) => {
    return (
      <View style={styleBase.text}>
        <TextInput
          style={styles.textInput}
          value={name}
          placeholder="Name"
          onChangeText={text => this.setState({name: text})}
        />
        <TextInput
          style={styles.textInput}
          value={email}
          placeholder="Email"
          onChangeText={text => this.setState({email: text})}
        />
      </View>
    );
  };

  renderViewDetails = (name, email) => {
    return (
      <View style={styleBase.text}>
        <Text style={styleBase.textPrimary}>{name}</Text>
        <Text style={styleBase.textSecondary}>{email}</Text>
      </View>
    );
  };

  render() {
    const user = this.props.user;

    const city = `${user.address.cityPrefix} ${user.address.city} ${
      user.address.citySuffix
      }`;
    return (
      <View style={[styleOverviewBase.overview]}>
        <View
          style={[
            styleBase.imageWrapper,
            styleOverviewBase.imageWrapper,
            styles.imageWrapper,
            {borderColor: user.color}
          ]}
        >
          <Image
            style={[styleBase.image, styleOverviewBase.image]}
            source={{uri: user.image}}
          />
        </View>
        {this.state.isEditing
          ? this.renderEditDetails(this.state.name, this.state.email)
          : this.renderViewDetails(this.state.name, this.state.email)}
          <Mutation
          mutation={updateUserMutation}
          variables={{updatedUser: {id: this.props.user.id, name: this.state.name, email: this.state.email}}}
        >
          {(UpdateUser) => (
            <Button
              onPress={() => {
                //Basic implementation, will trigger mutation even when values are not different from initial one
                //Need to implement comparison
                if (this.state.isEditing) {
                  UpdateUser()
                }
                this.toogleEditSave()
              }}
              title={this.state.isEditing ? 'Save' : 'Edit'}
              accessibilityLabel="Mutate"
            />
          )}
        </Mutation>
        <View style={styleBase.text}>
          <Text style={styleBase.textSecondary}>Address</Text>
          <Text style={styleBase.textSecondary}>{city}</Text>
          <Text style={styleBase.textSecondary}>{user.address.country}</Text>
        </View>
      </View>
    );
  }
}
