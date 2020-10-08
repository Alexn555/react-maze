import axios from "axios";
const ENV = require('../common/env');

const { SERVER_HOST, SERVER_PORT } = ENV.Settings.Dev;

export const url = `http://${SERVER_HOST}:${SERVER_PORT}`;

export const client = axios.create({
  baseURL: `${SERVER_HOST}:${SERVER_PORT}`,
  headers: {
    "Content-Type": "application/json"
  }
});
