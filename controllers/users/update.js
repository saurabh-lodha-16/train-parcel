import * as db from '../../models'

export async function usersPut(userId, attrs) {
    try {
        let obj = await db.users.update(
            attrs,
            {
                where: { id: userId },
                plain: true,
                returning: true
            }
        )
        return obj[1]
    } catch (err) {
        throw err.message
    }
}