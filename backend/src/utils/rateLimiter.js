/**
 * mesure l'interval entre deux req et fait patienter si l'interval
 * est trop petit
 */

function createRateLimiter({ intervalMs }) {
  let lastCall = 0;

  return async function rateLimit() {
    const now = Date.now();
    const wait = Math.max(0, intervalMs - (now - lastCall));

    if (wait > 0) {
      await new Promise((res) => setTimeout(res, wait));
    }

    lastCall = Date.now();
  };
}

module.exports = {
  createRateLimiter,
}
