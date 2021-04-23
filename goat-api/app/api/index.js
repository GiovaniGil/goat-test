const dbConfig = require('../../config/database');
const connection = require('../../helpers/connection');
const query = require('../../helpers/query');
const moment = require('moment');

var api = {}

api.list = async (req, res) => {
  const conn = await connection(dbConfig).catch((e) => {
    console.log('Conexão não realizada');
  });

  const data = await query(
    conn,
    `SELECT * FROM goat_events ORDER BY id ASC`
  ).catch(console.log);
  
  prepareReturn(data, res);
}

api.save = async (req, res) => {
  const body = req.body;
  const conn = await connection(dbConfig).catch((e) => {
    console.log('Conexão não realizada');
  });

  let values = prepareQueryValues(body);

  await query(
    conn,
    'INSERT INTO `goat_events` (strName, textDescription, intWeeklyRecurrence, dateFrom, strStartTime, strEndTime) VALUES ?',
    [
      values.map((item) => [
        item.strName,
        item.textDescription,
        item.intWeeklyRecurrence,
        item.dateFrom,
        item.strStartTime,
        item.strEndTime,
      ]),
    ]
  )
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      error.body = req.body;
      res.status(500).json(error);
    });

}

function prepareReturn(rawData, res) {
  
  const content = rawData.map((el) => ({
    id: el.id,
    start: `${moment(el.dateFrom).format('YYYY-MM-DD')} ${el.strStartTime}`,
    end: `${moment(el.dateFrom).format('YYYY-MM-DD')} ${el.strEndTime}`,
    intWeeklyRecurrence: el.intWeeklyRecurrence,
    content: el.textDescription,
    title: el.strName,
    class: 'event',
  }));

  res.json({
    content,
  });
}

function prepareQueryValues(body) {
  let values = [];
  if (body.intWeeklyRecurrence == 0) {
    values.push(body);
  } else {
    for (var cont = 0; cont < body.intWeeklyRecurrence; cont++) {
      const data = Object.assign({}, body);
      data.dateFrom = moment(data.dateFrom)
        .add(cont, 'week')
        .format('YYYY-MM-DD');
      values.push(data);
    }
  }
  return values;
}
module.exports = api;