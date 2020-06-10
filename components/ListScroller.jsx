import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

const ListScroller = ({ data, RenderItem, uid, ...rest }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <RenderItem item={item} {...rest} />}
      keyExtractor={(item) => item[uid]}
    />
  );
};

const styles = StyleSheet.create({});

export default ListScroller;
