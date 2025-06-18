const { createClient } = require("redis");

const redisData = createClient({ useurl: "redis://localhost:6379" });

redisData.on("error", (err) => {
  console.log(err, "error");
});

(async () => {
  try {
    await redisData.connect();
    console.log("Connected!");
  } catch (err) {
    console.log("Redis Not Connected!");
  }
})();

module.exports = redisData;
