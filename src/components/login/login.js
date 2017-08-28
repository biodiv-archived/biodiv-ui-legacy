import React from 'react';

class Login extends React.Component {
  constructor(props) {
      super(props);


      this.onSuccess = this.props.onSuccess || (() => {});
      this.onFailure = this.props.onFailure || (() => {});
      this.onSuccess = this.onSuccess.bind(this);
      this.onFailure = this.onFailure.bind(this);
    }


    componentDidMount() {
      let self = this;
      let scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.src = "http://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=1907065672880329";
      scriptTag.addEventListener('load', function (e) {
        self.FB = window.FB;
        window.FB = null;
        self.FB.Event.subscribe('auth.statusChange', self.onStatusChange.bind(self));
      });
      document.body.appendChild(scriptTag);
    }



    onStatusChange(response) {
      if (response.status === 'connected') {
        const { accessToken } = response.authResponse;
        console.log(response)
        this.onSuccess(accessToken, this.props.afterLogin);
      } else {
        this.onFailure();
      }
    }

    render() {
      return (
        <div>
          <div
            className="fb-login-button"
            data-width={this.props.width}
            data-max-rows="1"
            data-size="small"
            data-button-type="login_with"
            data-show-faces="true"
            data-auto-logout-link="true"
            data-use-continue-as="true"
            data-scope={this.props.dataScope}
          >
          </div>
          <h1>Profile</h1>
        </div>

      );
    }

}
export default Login;
