import React, { useRef, useState } from 'react';
import * as St from './styles';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';

interface SliderProps {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
}
interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}
export default function ImageSlider( { imagesUrl }: SliderProps ) {
    const [imageIndex, setImageIndex] = useState<number>( 0 );
    const indexChanged = useRef( ( info: ChangeImageProps ) => {
        const index = info.viewableItems[0].index!;
        setImageIndex( index );
    } );
    return (
        <St.Container>
            <St.ImageIndexes>
                {imagesUrl?.map( ( _, index ) => (
                    <Bullet key={String( index )} active={index === imageIndex} />
                ) )}
            </St.ImageIndexes>
            <FlatList
                data={imagesUrl}
                keyExtractor={( item, key ) => item.id}
                renderItem={( { item } ) => (
                    <St.CarImageWrapper>
                        <St.CarImage source={{ uri: item.photo }} resizeMode="contain" />
                    </St.CarImageWrapper>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={indexChanged.current}
            />
        </St.Container>
    );
}
