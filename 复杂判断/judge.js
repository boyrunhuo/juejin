const onButtonClick = (status) => {
  if (status === 1) {
    console.log('1');
  } else if (status === 2) {
    console.log('2');
  } else if (status === 3) {
    console.log('3');
  } else if (status === 4) {
    console.log('4');
  } else if (status === 5) {
    console.log('5');
  } else {
    console.log('quit');
  }
}

// 1
onButtonClick(1)


const onButtonClickSwitch = (status) => {
  switch (status) {
    case 1:
    console.log('1');
    break

    case 2:
    case 3:
    console.log('2 || 3');
    break

    case 4: 
    console.log('4');
    break

    case 5: 
    console.log('5');
    break
    
    default:
    console.log('quit');
    break
  }
}

// 2 || 3
onButtonClickSwitch(3)


const actions = {
  '1': '1',
  '2': '2 || 3',
  '3': '2 || 3',
  '4': '4',
  '5': '5',
  'default': 'quit'
}

const onButtonClickAction = (status) => {
  let action = actions[status] || actions['default']
  console.log(action);
}
// 5
onButtonClickAction(5)

const actionsMap = new Map([
  [1, ['1']],
  [2, ['2 || 3']],
  [3, ['2 || 3']],
  [4, ['4']],
  [5, ['5']],
  ['default', ['quit']]
])

const onButtonClickMap = (status) => {
  let action = actionsMap.get(status) || actionsMap.get('default')
  console.log(action[0]);
}

// quit
onButtonClickMap(6)

// 两个条件判断，不同的组合触发不同的结果
const onConditionsClick = (status, indetity) => {
  if (indetity === 'guest') {
    if (status === 1) {
      console.log('guest 1');
    } else if (status === 2) {
      console.log('guest 2');
    } else if (status === 3) {
      console.log('guest 3');
    } else if (status === 4) {
      console.log('guest 4');
    } else {
      console.log( 'guest quit');
    }
  } else if (indetity === 'master') {
    if (status === 1) {
      console.log('master 1');
    } else if (status === 2) {
      console.log('master 2');
    } else if (status === 3) {
      console.log('master 3');
    } else if (status === 4) {
      console.log('master 4');
    } else {
      console.log( 'master quit');
    }
  }
}

// master 1
onConditionsClick(1, 'master')

const actionsConditionsMap = new Map([
  ['guest_1', () => {console.log('guest 1');}],
  ['guest_2', () => {console.log('guest 2');}],
  ['guest_3', () => {console.log('guest 3');}],
  ['guest_4', () => {console.log('guest 4');}],
  ['guest_default', () => console.log('guest quit')],

  ['master_1', () => {console.log('master_1')}],
  ['master_2', () => {console.log('master_2')}],
  ['master_3', () => {console.log('master_3')}],
  ['master_4', () => {console.log('master_4')}],
  ['master_default', () => console.log('master quit')],
  
  ['default', () => {console.log('quit')}]
])

// 把多个条件拼接成一个字符串
const onConditionsClickMap = (indetity, status) => {
  let action = actionsConditionsMap.get(`${indetity}_${status}`) || actionsConditionsMap.get(`${indetity}_default`) || actionsConditionsMap.get('default')  
  action.call(this)
}

// master 4
onConditionsClickMap('master', 4)

// 缓存函数处理复杂判断
const actionsFunction = () => {
  const functionA = () => {
    console.log('A')
  }
  const functionB = () => {
    console.log('B')
  }
  
  const functionDefault = () => {
    console.log('default')
  }

  return new Map([
    [/^guest_[1-4]$/, functionA],
    [/^guest_5$/, functionB],
    [/^.*$/, functionDefault],
  ])
}


const onFunctionClick = (indetity, status) => {
  let action = [...actionsFunction()].filter(([key, value]) => (key.test(`${indetity}_${status}`)))
  action.forEach(([key, value]) => value.call(this))
}

// B default
onFunctionClick('guest', 1)

// default
onFunctionClick('master', 1)