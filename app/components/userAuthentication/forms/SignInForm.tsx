import { useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import formStyles from '../../../services/styles/FormStyle';

interface IFormInput {
  userName: string;
  password: string;
  age: number;
}

const SignInForm = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <View>
      <TextInput
        {...register('userName', { required: true, maxLength: 20 })}
        placeholder="User Name"
        style={formStyles.input}
      />
      <TextInput
        {...register('password', { pattern: /^[A-Za-z]+$/i })}
        placeholder="Password"
        style={formStyles.input}
      />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text style={formStyles.button}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInForm;
