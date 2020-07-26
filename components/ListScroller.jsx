import React, { memo, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { LOAD_ACTIVITIES } from '../context/history-context';

const BUFFER = 5;

const ListScroller = ({ data, RenderItem, uid, onEndReached, ...rest }) => {
  const MemoizedItem = memo(RenderItem);
  const [momentBegun, setMomentBegun] = useState(false);

  const endReachedHandler = () => {
    (momentBegun || data.length >= LOAD_ACTIVITIES - BUFFER) && onEndReached();
  };

  const momentScrollBeginHandler = () => {
    !momentBegun && setMomentBegun(true);
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <MemoizedItem
          item={item}
          totalItems={data.length}
          index={index}
          {...rest}
        />
      )}
      keyExtractor={(item) => item[uid]}
      initialNumToRender={LOAD_ACTIVITIES}
      maxToRenderPerBatch={10}
      windowSize={11}
      onEndReached={endReachedHandler}
      onEndReachedThreshold={0.001}
      onMomentumScrollBegin={momentScrollBeginHandler}
    />
  );
};

ListScroller.defaultProps = {
  uid: 'id',
  onEndReached: () => {},
};

const styles = StyleSheet.create({});

export default ListScroller;
