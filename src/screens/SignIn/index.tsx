import React, { useState } from "react";
import * as St from "./styles";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Button from "../../components/Button";
import { useTheme } from "styled-components";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";

export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const theme = useTheme();

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
              onPress={() => {}}
              isLoading={false}
              isEnabled={false}
            />
            <Button
              title="Criar conta gratuita"
              onPress={() => {}}
              color={theme.colors.background_secondary}
              isEnabled={false}
              isLoading={false}
              light={true}
            />
          </St.Footer>
        </St.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
