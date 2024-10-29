import async from "async";

// Initialize a queue with concurrency 1 for sequential processing
const dbQueue = async.queue(async (task: () => Promise<void>, callback) => {

  try {
    await task();
  } catch (error) {
    console.error("Failed to run task in queue ", error);
  }

  callback(); // Signal that the job is complete
}, 1);

export const addToQueue = (task: () => Promise<void>) => dbQueue.push(task);