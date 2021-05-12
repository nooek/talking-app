const request = require("supertest")
const app = require("../../../server")

describe('Test getFriendsByUser route', () => {
    const URL = '/api/friends'
    it('should get friends', async (done) => {
        const params = {
            id: 58
        }
        const res = await request(app)
        .get(`${URL}/getfriendsbyuser/${params.id}`)

        expect(res.statusCode).toEqual(200)
        expect(typeof(res.body)).toBe('object')
        done()
    })
})

describe('Test find friend