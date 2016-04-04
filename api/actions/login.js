import request from 'request';

export default function login(req) {
  const user = {
    name: req.body.username,
    token: req.body.token
  };
  req.session.user = user;
  return Promise.resolve(user);
}
