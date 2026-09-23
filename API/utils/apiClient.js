require('dotenv').config();
const supertest = require('supertest');

const baseUrl = process.env.BASE_URL || 'http://lojaebac.ebaconline.art.br';
const apiUser = process.env.API_USER;
const apiPassword = process.env.API_PASSWORD;

const request = supertest(baseUrl);

function authHeader() {
  const token = Buffer.from(`${apiUser}:${apiPassword}`).toString('base64');
  return `Basic ${token}`;
}

module.exports = { request, authHeader, baseUrl };
