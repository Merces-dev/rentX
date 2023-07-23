import React, { useState } from 'react';
import * as St from './styles';
import BackButton from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Input from '../../components/Input';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import InputPassword from '../../components/InputPassword';
import { useAuth } from '../../hooks/auth';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import Button from '../../components/Button';
import { useNetInfo } from '@react-native-community/netinfo';

const Profile = () => {
    const { user, signOut, updateUser } = useAuth();

    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>( 'dataEdit' );
    const [avatar, setAvatar] = useState( user.avatar );
    const [name, setName] = useState( user.name );
    const [driverLicense, setDriverLicense] = useState( user.driver_license );

    const theme = useTheme();
    const netInfo = useNetInfo();
    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }
    function handleSelectedOption( selectedOption: 'dataEdit' | 'passwordEdit' ) {
        if( netInfo.isConnected === false && selectedOption === 'passwordEdit' ){
            Alert.alert( 'Offline', 'Para mudar a senha conecte-se a internet' );
        }else{
            setOption( selectedOption );
        }
    }
    async function handleSignOut() {
        Alert.alert(
            'Tem certeza?',
            'Se você sair, irá precisar de internet para conectar-se novamente',
            [
                {
                    text: 'Cancelar',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'Sair',
                    onPress: async () => {
                        await signOut();
                    },
                },
            ]
        );
    }
    async function handleSelectAvatar() {
        const result = await ImagePicker.launchImageLibraryAsync( {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        } );

        if ( !result.canceled ) {
            console.log( { result, first: result.assets[0] } );
            setAvatar( result.assets[0].uri );
        }
    }
    async function handleProfileUpdate() {
        try {
            const schema = Yup.object().shape( {
                driverLicense: Yup.string().required( 'CNH é obrigatória' ),
                name: Yup.string().required( 'Nome é obrigatório' ),
            } );
            const data = { name, driverLicense };
            await schema.validate( data );
            await updateUser( {
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                token: user.token,
                name,
                driver_license: driverLicense,
                avatar,
            } );
        } catch ( error ) {
            console.log( { error } );
            if ( error instanceof Yup.ValidationError ) {
                Alert.alert( 'Opa', error.message );
            } else {
                Alert.alert( 'Não foi possivel atualizar o perfil' );
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <St.Container>
                    <St.Header>
                        <St.HeaderTop>
                            <BackButton color={theme.colors.shape} onPress={handleBack} />
                            <St.HeaderTitle>Editar Perfil</St.HeaderTitle>
                            <St.LogoutButton onPress={handleSignOut}>
                                <Feather size={24} color={theme.colors.shape} name={'power'} />
                            </St.LogoutButton>
                        </St.HeaderTop>
                        <St.PhotoContainer>
                            {!!avatar && (
                                <St.Photo
                                    source={{
                                        uri: avatar,
                                    }}
                                />
                            )}
                            <St.PhotoButton onPress={handleSelectAvatar}>
                                <Feather size={24} color={theme.colors.shape} name={'camera'} />
                            </St.PhotoButton>
                        </St.PhotoContainer>
                    </St.Header>
                    <St.Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <St.Options>
                            <St.Option
                                active={option == 'dataEdit'}
                                onPress={() => handleSelectedOption( 'dataEdit' )}
                            >
                                <St.OptionTitle active={option == 'dataEdit'}>
                  Dados
                                </St.OptionTitle>
                            </St.Option>
                            <St.Option
                                active={option == 'passwordEdit'}
                                onPress={() => handleSelectedOption( 'passwordEdit' )}
                            >
                                <St.OptionTitle active={option == 'passwordEdit'}>
                  Trocar senha
                                </St.OptionTitle>
                            </St.Option>
                        </St.Options>

                        {option == 'dataEdit'
                            ? (
                                <St.Section>
                                    <Input
                                        iconName={'user'}
                                        placeholder={'Nome'}
                                        autoCorrect={false}
                                        defaultValue={user.name}
                                        onChangeText={setName}
                                    />
                                    <Input
                                        iconName={'mail'}
                                        editable={false}
                                        defaultValue={user.email}
                                    />

                                    <Input
                                        iconName={'credit-card'}
                                        placeholder={'CNH'}
                                        keyboardType="numeric"
                                        defaultValue={user.driver_license}
                                        onChangeText={setDriverLicense}
                                    />
                                </St.Section>
                            )
                            : (
                                <St.Section>
                                    <InputPassword iconName={'lock'} placeholder={'Senha atual'} />
                                    <InputPassword iconName={'lock'} placeholder={'Nova senha'} />
                                    <InputPassword
                                        iconName={'lock'}
                                        placeholder={'Repetir senha'}
                                    />
                                </St.Section>
                            )}
                        <Button title={'Salvar alterações'} onPress={handleProfileUpdate} />
                    </St.Content>
                </St.Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Profile;
