import React from 'react';
import * as St from './styles';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components';

interface AccessoryProps {
  name: string;
  icon: React.FC<SvgProps>;
}

export default function Accessory( { name, icon: Icon }: AccessoryProps ) {
    const theme = useTheme();
    return (
        <St.Container>
            <Icon width={32} height={32} fill={theme.colors.header}/>
            <St.Name>{name}</St.Name>
        </St.Container>
    );
}
