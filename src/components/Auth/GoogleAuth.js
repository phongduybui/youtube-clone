import './GoogleAuth.css';
import firebase from "firebase/app";
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signOutAction, signInAction } from '../../actions';
import { googleSignInPopup, signOut } from '../../firebase/googleAuth';
import { FcGoogle } from 'react-icons/fc';

const Auth = ({ user, signOutAction, signInAction }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      signInAction(user);
    } else {
      // No user is signed in.
      signOutAction();
      setShowDropdown(false);
    }
  });

  return (
    <>
      { user
        ? <div className="user">
            <div className="user__details">
              <img 
                onClick={() => setShowDropdown(!showDropdown)}
                src={user.photoURL} alt="" className="user__avatar"
              />
              <ul className={`user__dropdown ${showDropdown && 'active'}`}>
                <li className="user__info-wrapper">
                  <img src={user.photoURL} alt="" className="user__avatar"/>
                  <div className="user__info">
                    <span>{user.displayName}</span>
                    <div className="user__email">{user.email}</div>
                  </div>
                </li>
                <li>
                  <button onClick={signOut} className="menu__btn btn-google">
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        : (
          <button onClick={googleSignInPopup} className="menu__btn btn-google">
            <FcGoogle />
            Sign In
          </button>
        )
      }
    </>
  )
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, { signInAction, signOutAction })(Auth)
