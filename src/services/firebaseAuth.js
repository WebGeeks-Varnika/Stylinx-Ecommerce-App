import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';

const auth = getAuth();

export const signupUser = async (email, password, name) => {
  const response = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(response.user, {
    displayName: name,
  });

  return response;
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};
