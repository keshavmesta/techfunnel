import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email, integer} from 'utils/validation';

const postValidation = createValidator({
  title: [required, maxLength(100)],
  description: [required, maxLength(1000)],
  name: [required, maxLength(50)],
  email: [required, email],
  oracleid: [required, integer, maxLength(20)]
});
export default memoize(10)(postValidation);
