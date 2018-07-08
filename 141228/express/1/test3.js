let root = '/v2/api/web'
let paths = [
  {method: 0, path: ''},
  {method: 0, path: '/'},
  {method: 1, path: '/courses/list'},
  {method: 1, path: '/userinfo'},
  {method: 1, path: '/classrooms/join'},
  {method: 1, path: '/classrooms/join_code'},
  {method: 1, path: '/courses/create'},
  {method: 1, path: '/courses/edit'},
  {method: 1, path: '/courses/del'},
  {method: 1, path: '/classrooms/create'},
  {method: 1, path: '/courses/toggletop'},
  {method: 1, path: '/classrooms/\\d+'},
  {method: 1, path: '/logs/learn/\\d+'},
  {method: 1, path: '/logs/teach/\\d+'},
  {method: 1, path: '/logs/appointment/\\d+'},
];

let bb = paths.map(item => {
  return {
    method: item.method,
    path: new RegExp('^' + root + item.path + '$')
  }
})
console.log(bb)