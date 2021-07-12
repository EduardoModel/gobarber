import 'dotenv/config';
// File responsable to run in background to do all the specified background jobs
import Queue from './lib/Queue';

Queue.processQueue();
