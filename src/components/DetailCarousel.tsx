import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import {colorsType} from '../types/types';

const {width, height} = Dimensions.get('window');

interface HeroCarouselProp<T> {
  CarouselData: Array<T>;
  colors: colorsType;
}
const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 1,
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 5,
    marginVertical: 5,
  },
  itemTitle: {
    fontFamily: 'Nunito-Bold',
    color: 'black',
    fontSize: 20,
  },
});

class HeroCarouselDetails extends React.PureComponent<
  HeroCarouselProp<string>
> {
  constructor(props: HeroCarouselProp<string>) {
    super(props);
    this.state = {
      activeSlide: 0,
      entries: this.props.CarouselData.length,
    };
  }
  get pagination() {
    const {entries, activeSlide}: any = this.state;

    return (
      <Pagination
        dotsLength={entries}
        activeDotIndex={activeSlide}
        containerStyle={{backgroundColor: 'transparent', flexWrap: 'wrap'}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: this.props.colors.text,
        }}
        inactiveDotStyle={{
          backgroundColor: 'white',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  _renderItem = ({item}: any, parallaxProps?: any) => {
    return (
      <ParallaxImage
        containerStyle={styles.imageContainer}
        parallaxFactor={0.4}
        {...parallaxProps}
        source={{
          uri: 'https://image.tmdb.org/t/p/w780/' + item.file_path,
        }}
        style={styles.image}
      />
    );
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
          marginTop: 40,
        }}>
        <Carousel
          decelerationRate="fast"
          activeAnimationType="spring"
          layoutCardOffset={15}
          data={this.props.CarouselData}
          renderItem={this._renderItem}
          sliderWidth={width - 20}
          itemWidth={width - 100}
          itemHeight={height}
          hasParallaxImages={true}
          onSnapToItem={(index) => this.setState({activeSlide: index})}
        />
        {this.pagination}
      </View>
    );
  }
}
export default HeroCarouselDetails;
