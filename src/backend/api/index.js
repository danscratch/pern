
module.exports = function(app) {
  // 'server_status' is used by the AWS load balancer for verifying that the backend is up and running
  // It's separate from /api/ping in case we need to change it at some point
  app.get('/api/server_status', (req, res) => res.sendStatus(200));

  // 'ping' is solely for verifying that the backend is up and running
  app.get('/api/ping', (req, res) => res.sendStatus(200));
};
