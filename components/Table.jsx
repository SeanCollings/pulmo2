import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useTheme } from '../hooks/useTheme';

const TableRow = ({ theme, content, index, rowStyles }) => (
  <View
    style={{
      ...styles.content,
      width: index === 0 ? '20%' : '40%',
      borderLeftWidth: index === 0 ? 0 : 1,
      borderLeftColor: theme.DARK ? theme.SECONDARY : theme.PRIMARY,
      borderBottomColor: theme.DARK ? theme.DARK_GRAY : theme.BORDER,
    }}
  >
    <Text style={{ ...styles.tableText, ...rowStyles }}>{content}</Text>
  </View>
);

const Table = ({ headerContent, rowContents, headerColour }) => {
  const theme = useTheme();

  if (!headerContent.length || !rowContents.length) return null;

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        {['', ...headerContent].map((header, index) => (
          <TableRow
            key={`th-${index}`}
            theme={theme}
            index={index}
            content={header}
            rowStyles={{
              ...styles.tableHeaderText,
              color: headerColour || theme.TERTIARY,
            }}
          />
        ))}
      </View>
      <View style={styles.tableBody}>
        {rowContents.map((row, i) => (
          <View key={`tb-${i}`} style={styles.bodyContent}>
            {[i + 1, ...row].map((content, contentIndex) => (
              <TableRow
                key={`tr-${contentIndex}`}
                theme={theme}
                content={content}
                index={contentIndex}
                rowStyles={{
                  color: theme.TEXT,
                  opacity: theme.DARK ? 0.8 : 1,
                }}
              />
            ))}
          </View>
        ))}
      </View>
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
    borderBottomWidth: 1,
  },
  tableHeaderText: {
    fontSize: 16,
    fontFamily: 'tit-regular',
  },
  tableText: {
    textAlign: 'center',
    fontFamily: 'tit-regular',
    fontSize: 16,
    padding: 2,
  },
});

export default Table;
