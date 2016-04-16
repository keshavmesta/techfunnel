import memoize from 'lru-memoize';
import {createValidator, required, maxLength, integer} from 'utils/validation';

const postValidation = createValidator({
  title: [required, maxLength(100)],
  description: [required, maxLength(1000)],
  speakerMobile: [required, integer, maxLength(10)],
  event: [required],
  location: [required]
});
export default memoize(10)(postValidation);
