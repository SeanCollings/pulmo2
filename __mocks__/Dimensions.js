'use strict';

const Dimensions = {
  get: jest.fn().mockReturnValue({ width: 360, height: 740 }),
};

module.exports = Dimensions;
