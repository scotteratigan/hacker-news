const moment = require("moment");

const ageOfArticle = moment(
  "2019-04-26T13:45:00.000Z",
  "YYYY-MM-DD[T]HH:mm:ss:0000Z"
)
  .local()
  .fromNow(); // 2017-11-07T16:24:04.000Z

console.log(ageOfArticle);
