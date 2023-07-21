import React, { useState } from 'react';
import * as St from './styles';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export default function InputPassword({
	iconName,
	value,
	...rest
}: InputProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [isFilled, setIsFilled] = useState<boolean>(false);

	const theme = useTheme();

	function handlePasswordVisibilityChange() {
		setIsPasswordVisible((prevState) => !prevState);
	}

	function handleInputFocus() {
		setIsFocused(true);
	}
	function handleInputBlur() {
		setIsFocused(false);
		setIsFilled(!!value);
	}
	return (
		<St.Container isFocused={isFocused} isFilled={isFilled}>
			<St.IconContainer>
				<Feather
					name={iconName}
					size={24}
					color={
						isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
					}
				/>
			</St.IconContainer>

			<St.Input
				secureTextEntry={isPasswordVisible}
				autoCorrect={false}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				{...rest}
			/>
			<St.IconContainer>
				<BorderlessButton onPress={handlePasswordVisibilityChange}>
					<Feather
						name={isPasswordVisible ? 'eye' : 'eye-off'}
						size={24}
						color={theme.colors.text_detail}
					/>
				</BorderlessButton>
			</St.IconContainer>
		</St.Container>
	);
}
