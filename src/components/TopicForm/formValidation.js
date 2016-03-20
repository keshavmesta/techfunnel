import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email, integer} from 'utils/validation';

const postValidation = createValidator({
  title: [required, maxLength(100)],
  description: [required, maxLength(1000)],
  speakerName: [required, maxLength(50)],
  speakerEmail: [required, email],
  speakerId: [required, integer, maxLength(20)],
  event: [required],
  location: [required]
});
export default memoize(10)(postValidation);
