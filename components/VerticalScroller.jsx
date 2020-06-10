import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Text } from 'react-native';

const VerticalScroller = ({ data, dataLength, ...props }) => {
  const [end, setEnd] = useState(true);
  const [scrollData, setScrollData] = useState([...data, ...data]);

  let infListRef;

  const RenderItem = () =>
    scrollData.map((d) => (
      <View key={Math.random()} style={styles.listItem}>
        <Text style={styles.text}>{d}</Text>
      </View>
    ));

  useEffect(() => {
    console.log('data length:', scrollData.length);
    if (scrollData.length > data.length * 2) {
      setScrollData((curr) => curr.slice(data.length * 2));
    } else {
      // infListRef.scrollTo({ x: 0, y: 140, animated: false });
    }
  }, [scrollData]);

  const checkScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const itemHeight = +layoutMeasurement.height.toFixed(0);
    const containerHeight = +contentSize.height.toFixed(0);
    const movementY = +contentOffset.y.toFixed(0);
    const first = movementY === 0;
    const last = movementY === containerHeight - itemHeight;

    // console.log('itemHeight', itemHeight);
    // console.log('containerHeight', containerHeight);
    // console.log('movementY', movementY);

    if (first) {
      console.log('first');
      setScrollData((curr) => [...curr, ...data]);
      infListRef.scrollTo({
        x: 0,
        y: contentSize.height,
        animated: false,
      });
    }
    if (last) {
      console.log('last');
    }
  };

  return (
    // <FlatList
    //   snapToInterval={50}
    //   snapToAlignment="center"
    //   {...props}
    //   ref={(ref) => {
    //     infListRef = ref;
    //   }}
    //   data={scrollData}
    //   renderItem={props.renderItem}
    //   onScroll={({ nativeEvent }) => checkScroll(nativeEvent)}
    // />
    <ScrollView
      showsVerticalScrollIndicator={false}
      // snapToInterval={50}
      // snapToAlignment="center"
      decelerationRate={1}
      pagingEnabled
      ref={(ref) => {
        infListRef = ref;
      }}
      onScroll={({ nativeEvent }) => checkScroll(nativeEvent)}
      onScrollEndDrag={() => console.log('test')}
    >
      <RenderItem />
    </ScrollView>
  );
};

VerticalScroller.defaultProps = {
  offset: 20,
  showsVerticalScrollIndicator: false,
};

const styles = StyleSheet.create({
  scrollerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderColor: '#0099A8',
    borderWidth: 5,
    backgroundColor: '#FEFEFE',
    height: 50,
  },
  text: {
    color: '#0099A8',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default VerticalScroller;
