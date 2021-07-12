import { next } from 'sucrase/dist/parser/tokenizer';
import app from './app';

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('App listen at port 8080');
});
