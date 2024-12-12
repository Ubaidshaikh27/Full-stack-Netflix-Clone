//rafce to auto complete the starting code

import React from 'react'
import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen'
import { useAuthStore } from '../../store/authUser';

const HomePage = () => {

  //Once the user is Authenticated it will come to Home page
  const { user } = useAuthStore();
  return (
    <div>
      {user ? <HomeScreen /> : <AuthScreen />}
    </div>
  )
}

export default HomePage