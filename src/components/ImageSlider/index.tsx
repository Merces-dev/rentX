import React, { useRef, useState } from "react";
import * as St from "./styles";
import { useTheme } from "styled-components/native";
import { FlatList, ViewToken } from "react-native";
import { Bullet } from "../Bullet";

interface SliderProps {
  imagesUrl: string[];
}
interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}
export default function ImageSlider({ imagesUrl }: SliderProps) {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const theme = useTheme();
  const indexChanged = useRef((info: ChangeImageProps) => {
    console.log(info);
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });
  return (
    <St.Container>
      <St.ImageIndexes>
        {imagesUrl.map((_, index) => (
          <Bullet key={String(index)} active={index === imageIndex} />
        ))}
      </St.ImageIndexes>
      <FlatList
        data={imagesUrl}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <St.CarImageWrapper>
            <St.CarImage source={{ uri: item }} resizeMode="contain" />
          </St.CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </St.Container>
  );
}
