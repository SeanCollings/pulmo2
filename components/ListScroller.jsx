import React, { memo } from 'react';
import { StyleSheet, FlatList } from 'react-native';

const ListScroller = ({ data, RenderItem, uid = 'id', ...rest }) => {
  const MemoizedItem = memo(RenderItem);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <MemoizedItem item={item} {...rest} />}
      keyExtractor={(item) => item[uid]}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={11}
    />
  );
};

const styles = StyleSheet.create({});

export default ListScroller;
