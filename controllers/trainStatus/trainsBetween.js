import models from '../../models'
import db from '../../models/index.js'
const moment = require('moment')
const Op = db.Sequelize.Op
import { getCurrCity } from './fillStations'
import { reservationsUrl } from 'twilio/lib/jwt/taskrouter/util'
import { getISTTime } from '../services/getISTTime'

export async function trainBetween(serial_no, date) {
  const elem = date.split('/')
  date = parseInt(elem[0]).toString() + '/' + parseInt(elem[1]).toString() + '/' + parseInt(elem[2]).toString()
  const packageDetails = await models.packages.findOne({
    where: {
      serial_no: serial_no
    }
  })
  const sCity = packageDetails.dataValues.sCity
  const dCity = packageDetails.dataValues.dCity

  let x = moment().format()
  x = x.split('T')
  let time = x[0] + " " + x[1]
  const store = []
  const trainStatuses = await models.trainStatuses.findAll({
    where: {
      sTime: {
        [Op.gte]: time
      },
      isRunning: true,
      sCity: sCity
    }
  })
  for (let i = 0; i < trainStatuses.length; i++) {
    store.push(trainStatuses[i].dataValues.trainId)
  }
  const trainIds = [...new Set(store)]
  const answer = []
  for (let i = 0; i < trainIds.length; i++) {
    let trainId = trainIds[i]
    let temp = await models.trainStatuses.findAll({
      where: {
        sTime: {
          [Op.gte]: time
        },
        isRunning: true,
        dCity: dCity,
        trainId: trainId
      }
    })
    for (let j = 0; j < temp.length; j++) {
      answer.push(temp[j].dataValues.trainId)
    }
  }
  let final_answer = []
  for (let i = 0; i < answer.length; i++) {
    let trainId = answer[i]
    let trainDetails = await models.trains.findOne({
      where: {
        id: trainId
      }
    })
    let trainName = trainDetails.dataValues.name
    let trainNo = trainDetails.dataValues.trainNo
    let temp1 = await models.trainStatuses.findAll({
      where: {
        sTime: {
          [Op.gte]: time
        },
        isRunning: true,
        sCity: sCity,
        trainId: trainId
      }
    })
    let temp2 = await models.trainStatuses.findAll({
      where: {
        sTime: {
          [Op.gte]: time
        },
        isRunning: true,
        sCity: dCity,
        trainId: trainId
      }
    })
    for (let j = 0; j < temp1.length; j++) {
      let x = temp1[j].dataValues.sTime
      let y = await getISTTime(x)
      y = y.split(',')
      final_answer.push({
        date: y[0],
        trainName: trainName,
        trainNo: trainNo,
        trainId: trainId,
        sourceStatusId: temp1[j].dataValues.id,
        destinationStatusId: temp2[j].dataValues.id
      })
    }
  }
  let output = []
  for (let i = 0; i < final_answer.length; i++) {
    if (final_answer[i].date == date) {
      output.push(final_answer[i])
    }
  }
  const return_answer = removeDuplicates(output, 'trainNo')
  console.log(return_answer)
  if (return_answer.length == 0) {
    return false
  } else {
    return return_answer
  }
}

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  })
}