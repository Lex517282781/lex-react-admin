import Mock from 'mockjs';
const { Random } = Mock;

const user = Mock.mock({
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
});

export default user;
