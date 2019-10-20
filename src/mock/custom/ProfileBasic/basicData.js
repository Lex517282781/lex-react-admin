const basicData = {
  userInfo: {
    name: '薛强',
    tel: '18100000000',
    delivery: '菜鸟物流',
    addr: '浙江省杭州市西湖区万塘路18号',
    remark: '备注'
  },
  application: {
    id: '1000000000',
    status: '已取货',
    orderNo: '320000199204068169',
    childOrderNo: '420000201601221765'
  },
  basicGoods: [
    {
      id: '1234561',
      name: '矿泉水 550ml',
      barcode: '12421432143214321',
      price: '2.00',
      num: '1',
      amount: '2.00'
    },
    {
      id: '1234562',
      name: '凉茶 300ml',
      barcode: '12421432143214322',
      price: '3.00',
      num: '2',
      amount: '6.00'
    },
    {
      id: '1234563',
      name: '好吃的薯片',
      barcode: '12421432143214323',
      price: '7.00',
      num: '4',
      amount: '28.00'
    },
    {
      id: '1234564',
      name: '特别好吃的蛋卷',
      barcode: '12421432143214324',
      price: '8.50',
      num: '3',
      amount: '25.50'
    }
  ],
  basicProgress: [
    {
      key: '1',
      time: '2017-10-01 14:10',
      rate: '联系客户',
      status: 'processing',
      operator: '取货员 ID1234',
      cost: '5mins'
    },
    {
      key: '2',
      time: '2017-10-01 14:05',
      rate: '取货员出发',
      status: 'success',
      operator: '取货员 ID1234',
      cost: '1h'
    },
    {
      key: '3',
      time: '2017-10-01 13:05',
      rate: '取货员接单',
      status: 'success',
      operator: '取货员 ID1234',
      cost: '5mins'
    },
    {
      key: '4',
      time: '2017-10-01 13:00',
      rate: '申请审批通过',
      status: 'success',
      operator: '系统',
      cost: '1h'
    },
    {
      key: '5',
      time: '2017-10-01 12:00',
      rate: '发起退货申请',
      status: 'success',
      operator: '用户',
      cost: '5mins'
    }
  ]
};

export default basicData;
