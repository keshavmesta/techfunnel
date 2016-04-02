import request from 'request';

export default function login(req) {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  request.post('https://studioauth.sapient.com/apiv1/authenticate', {form: user},
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body);
              // req.session.user = user;
              // return Promise.resolve(user);
          } else {
            console.log('WTF Happend: '+error);
          }
      }
  );
}
