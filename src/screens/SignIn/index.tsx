import React, { useState } from "react";
import * as St from "./styles";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Button from "../../components/Button";
import { useTheme } from "styled-components";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const theme = useTheme();
  const navigation = useNavigation();
  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      setIsLoading(true);
      const schema = Yup.object().shape({
        password: Yup.string().required("Senha obrigatória"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
      });

      await schema.validate({ email, password });

      await signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      } else {
        Alert.alert(
          "Erro na autenticação",
          "Ocorreu um erro ao fazer login, verifique as credenciais"
        );
      }
    }
    setIsLoading(false);
  }
  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep");
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <St.Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <St.Header>
            <St.Title>Estamos{"\n"}quase lá.</St.Title>
            <St.SubTitle>
              Faça seu login para começar{"\n"}uma experiência incrível.
            </St.SubTitle>
          </St.Header>
          <St.Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize={"none"}
              onChangeText={setEmail}
              value={email}
            />
            <InputPassword
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </St.Form>
          <St.Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              isEnabled={!isLoading}
              isLoading={isLoading}
            />
            <Button
              title="Criar conta gratuita"
              onPress={() => {
                handleNewAccount();
              }}
              color={theme.colors.background_secondary}
              isEnabled={!isLoading}
              isLoading={false}
              light={true}
            />
          </St.Footer>
        </St.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
