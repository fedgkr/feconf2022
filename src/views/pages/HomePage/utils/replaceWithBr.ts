import { replace } from 'lodash';

const replaceWithBr = (sentence: string) => replace(sentence, '\n', '<br/>');

export default replaceWithBr;
