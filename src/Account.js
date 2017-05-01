import React from 'react';

const LoggedInBadge = (props) => {
  return (
    <div className="User-badge">
      <img className="User-avatar" src={props.profile_photo_url} alt="" />
      {props.email}
      <button className="User-logout" onClick={props.logout}>Logout</button>
    </div>
  );
}

const AccountLink = props => {
  const { account, authUrl } = props;
  const login = <a href={authUrl}>Login</a>;
  const logout = () => {
    props.logout();
    window.location = "/";
  };
  const userLink = !account ? null : <LoggedInBadge {...{...account, logout}} />;
  return !account ? login : userLink; 
}

export default AccountLink;