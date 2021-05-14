const request = require("supertest")
const app = require("../../../server")

describe('Test getFriendsByUser route', () => {
    const BASE_URL = '/api/friends'
    it('should get friends', async (done) => {
        const params = {
            id: 58
        }
        const res = await request(app)
        .get(`${BASE_URL}/getfriendsbyuser/${params.id}`)

        expect(res.statusCode).toEqual(200)
        expect(typeof(res.body)).toBe('object')
        done()
    })
})

describe('Test find friend route', () => {
    const BASE_URL = '/api/find/friend'
    it('should find some friend', async (done) => {
        const params = {
            me: 58,
            name: 'lor'
        }
        const res = await request(app)
        .get(`${BASE_URL}/${params.me}/${params.name}`)
        
        expect(res.statusCode).toEqual(200)
        expect(typeof(res.body)).toBe('object')
        done()
    })
})