'use strict';
import db from '../models/index.js';
const Package = db.packages;
export function updatePackageStatus(packageId, status, res) {
  Package.update({
    status_id: status
  },{ 
    where: {id: packageId} 
  }).then(() => {
    res.write('notify krna hai ');
  });
}