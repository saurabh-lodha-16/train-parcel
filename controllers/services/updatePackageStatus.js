'use strict';
import db from '../../models/index.js';
const Package = db.packages;
export function updatePackageStatus(packageId, status, res) {
  try {
    Package.update({
      status_id: status
    }, {
        where: { id: packageId }
      }).then(() => {
        res.write('notify krna hai ');
      });
  } catch (error) {
    res.write(error);
  }
}

