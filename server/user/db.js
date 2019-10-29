const mockjs = require('mockjs');
const { mock, Random } = mockjs;
const data = mock({
  success: true,
  msg: Random.string(),
  data: {
    userid: Random.natural(),
    name: Random.cname(),
    avatar: Random.image('200x200'),
    email: Random.email(),
    signature: Random.string(),
    title: Random.string(),
    group: Random.string(),
    'tags|1-10': [
      {
        'key|+1': 1
      }
    ],
    notifyCount: Random.natural(),
    unreadCount: Random.natural(),
    country: Random.county(),
    geographic: {
      province: {
        label: Random.province(),
        key: Random.zip()
      },
      city: {
        label: Random.province(),
        key: Random.zip()
      }
    },
    address: Random.paragraph(),
    phone: '0571-88886666'
  }
});

module.exports = data;
