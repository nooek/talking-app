const request = require("supertest")
const app = require("../../../server")

const BASE_URL = "/api/user"

describe('Test getUserById', () => {
    it('should get user by id', async (done) => {
        const res = await request(app).get(`${BASE_URL}/35`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeDefined()
        done()
    })

    it ('should not get user by id', async (done) => {
        const res = await request(app).get(`${BASE_URL}/sada`)
        expect(res.statusCode).toEqual(200)
        done()
    })
})

describe('Test update user', () => {
    it('should update user', async (done) => {
        const body = {
            name: "eu sou legal",
            pfp: "",
            desc: "sou legal123",
            onlineStatus: false,
            id: 8
        }
        const res = await request(app).put(BASE_URL).send(body)
        expect(res.statusCode).toEqual(200)
        expect(typeof(res.body)).toBe('object')
        done()
    })
})

describe('Test login user', () => {
    const URL = '/api/user/login'
    it('should login user', async (done) => {
        const body = {
            userEmail: 'a',
            password: 'a'
        }
        const res = await request(app)
        .post(URL)
        .send(body)

        expect(res.statusCode).toEqual(200)
        expect(typeof(res.body)).toBe('object')
        expect(res.body).toHaveProperty('token')
        done()
    })

    it('should not login user', async (done) => {
        const body = {
            userEmail: 'a',
            password: 'seujifnisuenfise'
        }

        const res = await request(app)
        .post(URL)
        .send(body)

        expect(res.statusCode).toEqual(200)
        expect(typeof(res.body)).toBe('object')
        expect(res.body).toHaveProperty('message')
        done()
    })

    it('should get error', async (done) => {
        const body = {
            userEmail: 'a'
        }

        const res = await request(app)
        .post(URL)
        .send(body)

        expect(res.statusCode).toEqual(400)
        expect(typeof(res.body)).toBe('object')
        expect(res.body).toHaveProperty('error')
        done()
    })
})

describe('Teste the register route', () => {
    const URL = '/api/user/register'
    it('should not register user', async (done) => {
        const body = {
            userEmail: 'a',
            password: 'a',
            name: 'batata',
            pfp: ''
        }

        const res = await request(app)
        .post(URL)
        .send(body)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        done()
    })
})