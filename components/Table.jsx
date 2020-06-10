import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { COLORS } from '../constants/constants';

const TableRow = ({ content, index, rowStyles }) => (
  <View
    style={{
      ...styles.content,
      width: index === 0 ? '20%' : '40%',
      borderLeftWidth: index === 0 ? 0 : 1,
    }}
  >
    <Text style={{ ...styles.tableText, ...rowStyles }}>{content}</Text>
  </View>
);

const TableHeader = ({ headerContent }) => (
  <View style={styles.tableHeader}>
    {['', ...headerContent].map((header, index) => (
      <TableRow
        key={`th-${index}`}
        index={index}
        content={header}
        rowStyles={styles.tableHeaderText}
      />
    ))}
  </View>
);

const TableBody = ({ rowContents }) => (
  <View style={styles.tableBody}>
    {rowContents.map((row, i) => (
      <View key={`tb-${i}`} style={styles.bodyContent}>
        {[i + 1, ...row].map((content, contentIndex) => (
          <TableRow
            key={`tr-${contentIndex}`}
            content={content}
            index={contentIndex}
          />
        ))}
      </View>
    ))}
  </View>
);

const Table = ({ headerContent, rowContents }) => {
  if (!headerContent.length || !rowContents.length) return null;

  return (
    <View style={styles.container}>
      <TableHeader headerContent={headerContent} />
      <TableBody rowContents={rowContents} />
    </View>
  );
};

Table.defaultProps = {
  headerContent: [],
  rowContents: [],
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: -1,
  },
  tableBody: { width: '100%' },
  bodyContent: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: -1,
  },
  content: {
    borderLeftColor: COLORS.PRIMARY,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  tableHeaderText: {
    fontFamily: 'tit-regular',
    color: COLORS.TERTIARY,
  },
  tableText: {
    textAlign: 'center',
    fontFamily: 'tit-regular',
    fontSize: 16,
    color: COLORS.TEXT,
    padding: 2,
  },
});

export default Table;
