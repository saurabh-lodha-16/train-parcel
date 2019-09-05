import models from '../models';

export async function getCityName(city_id) {
  try {
    let temp = await models.cities.findOne({ where: { id: city_id } });
    let city_name = temp.dataValues.name;
    return city_name;
  } catch (e) {
    throw e;
  }

}

export async function getUserName(user_id) {
  let temp = await models.users.findOne({ where: { id: user_id } });
  let user_name = temp.dataValues.name;
  return user_name;
}

