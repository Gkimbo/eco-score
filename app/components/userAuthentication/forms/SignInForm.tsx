import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import FetchData from '../../../services/fetchData';
import formStyles from '../../../services/styles/FormStyle';

// interface IFormInput {
//   userName: string;
//   password: string;
//   age: number;
// }

const SignInForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    FetchData.get('/api/v1/user-sessions/current');
  };

  return (
    <View>
      <TextInput
        value={userName}
        onChangeText={setUserName}
        placeholder="User Name"
        style={formStyles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={formStyles.input}
      />
      <TouchableOpacity onPress={onSubmit}>
        <Text style={formStyles.button}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInForm;
