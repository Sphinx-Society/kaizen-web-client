import React from 'react';
import { connect } from 'react-redux';
import Logo from '../atoms/Logo/Logo';
import { getUser, getProfile } from '../../redux/user/user.actions.requests';
import { getCookie, deleteCookie } from '../../utils/cookie';
import { login } from '../../routes/paths';

const mapStateToProps = ({ user: { user } }) => ({ user });
const mapDispatchToProps = {
  getUser,
  getProfile,
};

const withUserData = (Component) => connect(mapStateToProps, mapDispatchToProps)(
  class ComponentWithUserData extends React.Component {
    constructor(props) {
      super(props);
      this.uid = getCookie('uid');
      this.role = getCookie('role');
    }

    componentDidMount() {
      const { getUser, user, getProfile } = this.props;
      if (!this.uid || !this.role) {
        deleteCookie('token');
        deleteCookie('role');
        deleteCookie('uid');
        document.location = login();
      }

      console.log(this.role);

      switch (this.role) {
        case 'admin': {
          if (!user || user.id !== this.uid) {
            getUser(this.uid);
          }
          break;
        }
        default: {
          if (!user || user.id !== this.uid) {
            getProfile(this.uid);
          }
        }
      }
    }

    render() {
      if (!this.props.user) {
        return (
          <div className='central-flex-container'>
            <Logo
              size='60px'
              isLoading
            />
          </div>
        );
      }

      return (
        <Component {...this.props} />
      );
    }
  },
);

export default withUserData;
