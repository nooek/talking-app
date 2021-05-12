const request = require("supertest")
const app = require("../../../server")

describe('Test main route', () => {
    it('should get main route', async (done) => {
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual("Working!")
        done()
    })
})