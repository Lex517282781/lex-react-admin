const mockjs = require('mockjs');
const { mock, Random } = mockjs;
const data = mock({
  success: Random.boolean(9, 1, true),
  msg: Random.string(),
  data: {
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
      address: Random.paragraph(),
      phone: Random.natural(11)
    }
  }
});

module.exports = data;
