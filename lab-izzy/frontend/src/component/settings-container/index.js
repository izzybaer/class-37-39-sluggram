import React from 'react';
import {connect} from 'react-redux';
import ProfileForm from '../profile-form';
import * as util from '../../lib/util.js';
// import ProfileUpdateForm from '../profile-update-form';
import {
  profileCreateRequest,
  profileUpdateRequest,
} from '../../action/profile-actions.js';

class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleProfileCreate = this.handleProfileCreate.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }

  handleProfileCreate(profile){
    return this.props.profileCreate(profile)
      .then(() => {
        this.history.push('/dashboard');
      })
      .catch(console.error);
  }

  handleProfileUpdate(profile){
    return this.props.profileUpdate(profile)
      .catch(console.error);
  }

  render() {
    let handleComplete = this.props.profile
      ? this.handleProfileCreate
      : this.handleProfileUpdate;

    return(
      <div className='settings-container'>

        <h2> Settings, Yo! </h2>

        <ProfileForm
          profile={this.props.profile}
          buttonName='create user profile'
          onComplete={handleComplete}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
});

let mapDispatchToProps = (dispatch) => ({
  profileCreate: (profile) => dispatch(profileCreateRequest(profile)),
  profileUpdate: (profile) => dispatch(profileUpdateRequest(profile)),
});

export default connect (mapStateToProps, mapDispatchToProps)(SettingsContainer);
