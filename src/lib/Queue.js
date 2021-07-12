import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

// All background processes that are saved inside arrays are called jobs
const jobs = [CancellationMail];

class Queue {
  constructor() {
    // Queues for the services that need to run in background
    this.queues = {};

    this.init();
  }

  // Method to initialize the queues for each job
  init() {
    // Iterate through the jobs, desestructuring the elements of the class to easy access
    jobs.forEach(({ key, handle }) => {
      // Save the job inside the queue to be done
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // Method to add new jobs inside the declared queues
  add(queue, job) {
    // Add the specified job inside the queue and save it to be processed
    return this.queues[queue].bee.createJob(job).save();
  }

  // Method responsable to process all the queues with the specified handle method
  processQueue() {
    jobs.forEach((job) => {
      // Take the methods for each queue
      const { bee, handle } = this.queues[job.key];

      // Process the queues with the specified handle method and listen to failed processes
      bee.on('failed', this.handleFaliure).process(handle);
    });
  }

  handleFaliure(job, error) {
    // When the application is already in production, the errors need to be save into a database
    console.log(`Queue ${job.queue.name}: FAILED`, error);
  }
}
export default new Queue();

/**
 * Structure of the queues
 * queues = {
 *  CancellationMail = {
 *    bee, -> REDIS DB connection
 *    handle -> How to process the job
 *  }
 * }
 * queues[queue].bee
 *  .createJob(job) -> Create the entry to save inside the REDIS DB
 *  .save(); -> Save the entry to be accessed by another process to do the necessary work for it
 */
