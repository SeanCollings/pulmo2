import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

const ListScroller = ({ data, RenderItem, uid = 'id', ...rest }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <RenderItem item={item} {...rest} />}
      keyExtractor={(item) => item[uid]}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
    />
  );
};

const styles = StyleSheet.create({});

export default ListScroller;
