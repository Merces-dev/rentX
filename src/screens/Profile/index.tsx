import React, { useState } from 'react';
import * as St from './styles';
import BackButton from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const Profile = () => {
	const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
	const theme = useTheme();
	const navigation = useNavigation();

	function handleBack() {
		navigation.goBack();
	}
	function handleSelectedOption(selectedOption: 'dataEdit' | 'passwordEdit') {
		setOption(selectedOption);
	}
	function handleSignOut() {}
	return (
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
					<St.Photo
						source={{
							uri: 'https://avatars.githubusercontent.com/u/61596432?v=4',
						}}
					/>
					<St.PhotoButton>
						<Feather size={24} color={theme.colors.shape} name={'camera'} />
					</St.PhotoButton>
				</St.PhotoContainer>
			</St.Header>
			<St.Content>
				<St.Options>
					<St.Option active={option == 'dataEdit'} onPress={() => handleSelectedOption('dataEdit')}>
						<St.OptionTitle active={option == 'dataEdit'}>Dados</St.OptionTitle>
					</St.Option>
					<St.Option active={option == 'passwordEdit'} onPress={() => handleSelectedOption('passwordEdit')}>
						<St.OptionTitle active={option == 'passwordEdit'}>Trocar senha</St.OptionTitle>
					</St.Option>
				</St.Options>
			</St.Content>
		</St.Container>
	);
};

export default Profile;
