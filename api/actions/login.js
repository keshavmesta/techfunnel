import request from 'request';
import superagent from 'superagent';

export default function login(req) {
  return new Promise((resolve, reject) => {
    const user = {
      username: req.body.username,
      token: req.body.token
    };
    superagent
      .post('http://studioauth.sapient.com/apiv1/verifyToken')
      .set('x-access-token', user.token)
      .end((err, res) => {
        if (res.status === 200 && res.statusCode === 200) {
          if(res.body.isValid) {
            user.name = res.body.user.name;
            user.email = res.body.user.email;
            user.oracleId = res.body.user.oracle_id;
            user.profilePic = res.body.user.profilePic;
            req.session.user = user;
            resolve(user);
          }
        } else {
          reject(err);
        }
      })
  });
}
