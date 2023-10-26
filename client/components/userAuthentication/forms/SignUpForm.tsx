import { useForm } from 'react-hook-form';
import { ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';

import formStyles from '../../../services/styles/FormStyle';

interface IFormInput {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  passwordConfirmation: string;
  age: number;
}

const SignUpForm = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <ScrollView contentContainerStyle={formStyles.container}>
      <TextInput
        {...register('firstName', { required: true, maxLength: 20 })}
        placeholder="First Name"
        style={formStyles.input}
      />
      <TextInput
        {...register('lastName', { pattern: /^[A-Za-z]+$/i })}
        placeholder="Last Name"
        style={formStyles.input}
      />
      <TextInput
        {...register('age', { min: 10, max: 110 })}
        placeholder="Age"
        keyboardType="numeric"
        style={formStyles.input}
      />
      <TextInput
        {...register('userName', { pattern: /^[A-Za-z]+$/i })}
        placeholder="User Name"
        style={formStyles.input}
      />
      <TextInput
        {...register('password', { pattern: /^[A-Za-z]+$/i })}
        placeholder="Password"
        style={formStyles.input}
      />
      <TextInput
        {...register('passwordConfirmation', { pattern: /^[A-Za-z]+$/i })}
        placeholder="Password Confirmation"
        style={formStyles.input}
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text style={formStyles.button}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpForm;
