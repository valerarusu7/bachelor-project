// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = async () => {
  return {
    verbose: true,
    setupFiles: ["dotenv/config"],
  };
};
