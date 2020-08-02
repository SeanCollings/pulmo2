const activityIdArray = [
  '2020-06-26T15:15:43.411Z',
  '2020-06-12T15:15:43.411Z',
  '2020-06-25T15:15:43.411Z',
  '2020-06-22T15:15:43.411Z',
];

const activities = [
  [
    '@Plumo2:2020-06-26T15:15:43.411Z',
    '{"date":"2020-06-26T15:15:43.411Z","excercise":{"cycles":"10","id":1,"rest":"5","rounds":"2","title":"Custom Excercise 1"},"favourite":false,"level":2,"results":[["01:38","00:05"],["00:32",""]],"type":"Custom"}',
  ],
  [
    '@Plumo2:2020-06-12T15:15:43.411Z',
    '{"date":"2020-06-12T15:15:43.411Z","excercise":{"cycles":"11","id":2,"rest":"4","rounds":"3","title":"Endurance Excercise 2"},"favourite":false,"level":3,"results":[["01:38","00:15"],["00:32","00:15"],["02:38","00:15"]],"type":"Endurance"}',
  ],
  ['@Plumo2:2020-02-22T15:15:43.411Z', null],
  [
    '@Plumo2:2020-06-22T15:15:43.411Z',
    '{"date":"2020-06-22T15:15:43.411Z","excercise":{"cycles":"12","id":3,"rest":"5","rounds":"4","title":"Strength Excercise 3"},"favourite":true,"level":4,"results":[["01:38","01:00"]],"type":"Strength"}',
  ],
];

const multipleActivitiesOneDay = [
  [
    '@Plumo2:2020-06-26T11:15:43.411Z',
    '{"date":"2020-06-26T11:15:43.411Z","excercise":{"cycles":"10","id":1,"rest":"5","rounds":"2","title":"Custom Excercise 1"},"favourite":false,"level":2,"results":[["01:38","00:05"],["00:32",""]],"type":"Custom"}',
  ],
  [
    '@Plumo2:2020-06-26T12:15:43.411Z',
    '{"date":"2020-06-26T12:15:43.411Z","excercise":{"cycles":"10","id":1,"rest":"5","rounds":"2","title":"Custom Excercise 1"},"favourite":false,"level":2,"results":[["01:38","00:05"],["00:32",""]],"type":"Custom"}',
  ],
  [
    '@Plumo2:2020-06-26T13:15:43.411Z',
    '{"date":"2020-06-26T13:15:43.411Z","excercise":{"cycles":"10","id":1,"rest":"5","rounds":"2","title":"Custom Excercise 1"},"favourite":false,"level":2,"results":[["01:38","00:05"],["00:32",""]],"type":"Custom"}',
  ],
  [
    '@Plumo2:2020-06-26T14:15:43.411Z',
    '{"date":"2020-06-26T14:15:43.411Z","excercise":{"cycles":"10","id":1,"rest":"5","rounds":"2","title":"Custom Excercise 1"},"favourite":false,"level":2,"results":[["01:38","00:05"],["00:32",""]],"type":"Custom"}',
  ],
  [
    '@Plumo2:2020-06-26T15:15:43.411Z',
    '{"date":"2020-06-26T15:15:43.411Z","excercise":{"cycles":"10","id":1,"rest":"5","rounds":"2","title":"Custom Excercise 1"},"favourite":false,"level":2,"results":[["01:38","00:05"],["00:32",""]],"type":"Custom"}',
  ],
];

export default { activityIdArray, activities, multipleActivitiesOneDay };
