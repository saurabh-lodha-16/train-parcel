import models from '../models';

export async function getCityName(city_id){
let temp = await models.cities.findOne({ where: { id: city_id } });
let city_name = temp.dataValues.name;
return city_name;
}