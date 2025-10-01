const request = require('supertest');
const { app, db } = require('./index'); // Import your app

describe('API Endpoints', () => {
  // Create the users table before any tests run
  beforeAll((done) => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, fullName TEXT, email TEXT UNIQUE, password TEXT)', (err) => {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // Clear the users table before each test
  beforeEach((done) => {
    db.run('DELETE FROM users', (err) => {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // Test user registration
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.fullName).toBe('Test User');
  });

  // Test fetching all users
  it('should fetch all users', async () => {
    // First, register a user to have some data
    await request(app)
      .post('/register')
      .send({
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].email).toBe('test@example.com');
  });

  // Test for duplicate email registration
  it('should not register a user with a duplicate email', async () => {
    // Register the first user
    await request(app)
      .post('/register')
      .send({
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    // Try to register another user with the same email
    const res = await request(app)
      .post('/register')
      .send({
        fullName: 'Another User',
        email: 'test@example.com', // Same email
        password: 'password456'
      });
    
    // Expect a 500 status because of the UNIQUE constraint on the email column
    expect(res.statusCode).toEqual(500);
  });

  // Close the database connection after all tests are done
  afterAll((done) => {
    db.close((err) => {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});
