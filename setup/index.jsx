import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import testData, { TEST_TITLE } from '../data/test-data';
import loadTestData from '../helpers/load-test-data';

const AppSetup = (props) => {
  const [loadedData, setloadedData] = useState([]);
  const [errors, setErrors] = useState([]);

  const saveData = async (title) => {
    try {
      const status = await loadTestData(title);
      setloadedData((curr) => ({
        ...curr,
        [title]: { ...curr[title], status },
      }));
    } catch (err) {
      setErrors((curr) => [...curr, err]);
    }
  };

  useEffect(() => {
    const data = Object.values(testData).reduce((acc, data) => {
      const { [TEST_TITLE]: title, [TEST_TITLE]: key } = data;
      const status = 'saving...';
      saveData(title);

      return {
        ...acc,
        [title]: {
          title,
          key,
          status,
        },
      };
    }, {});
    setloadedData(data);
  }, []);

  const sortable = (a, b) =>
    a.title < b.title ? -1 : a.title > b.title ? 1 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ ...styles.textStyle, color: 'green' }}>
          Saving Data to Device
        </Text>
      </View>
      <View style={styles.dataContainer}>
        {Object.values(loadedData)
          .sort(sortable)
          .map((data) => {
            return (
              <View style={styles.dataStyle} key={data.key}>
                <Text
                  style={styles.textStyle}
                >{`${data.title}: ${data.status}`}</Text>
              </View>
            );
          })}
      </View>
      {!!errors.length && (
        <View style={styles.sContainer}>
          {errors.map((error) => (
            <Text key={Math.random()} style={styles.errorText}>
              {error}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#002f56',
    width: '100%',
  },
  headerContainer: {
    paddingVertical: 20,
  },
  dataContainer: {
    width: '80%',
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  dataStyle: {
    paddingBottom: 10,
  },
  errorContainer: {
    width: '80%',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'monospace',
    paddingVertical: 2,
  },
});

export default AppSetup;
