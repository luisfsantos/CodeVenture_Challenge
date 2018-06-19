const { json, redirect, status, header } = require("server/reply");
var axios = require("axios");
const randomString = require("random-base64-string");
const jwt = require("jsonwebtoken");
var CONFIG = require("../config.json");
var userAdapter = require("../model/user.js");
var STATES = [];
const TOKEN_REDIRECT_URI = "http://localhost:3000/auth/github/callback/token";

exports.redirectGithub = ctx => {
  var state = randomString(12);
  STATES.push(state);
  return redirect(
    "https://github.com/login/oauth/authorize?client_id=" +
      CONFIG.github_client_ID +
      "&state=" +
      state
  );
};

exports.getAuthToken = async ctx => {
  const code = ctx.query.code;
  const state = ctx.query.state;
  var user;
  if (STATES.length > 0 && STATES.includes(state)) {
    const accessTokenRequest = {
      url: "https://github.com/login/oauth/access_token",
      method: "POST",
      headers: {
        "User-Agent": "HN-CodeVenture",
        Accept: "application/json"
      },
      data: {
        client_id: CONFIG.github_client_ID,
        client_secret: CONFIG.github_client_secret,
        code: code,
        state: state
      }
    };
    await axios(accessTokenRequest)
      .then(response => {
        return findOrCreateUser(response.data.access_token);
      })
      .then(value => {
        user = value;
      })
      .catch(error => {
        console.log(error);
      });
    if (user === undefined) {
      return redirect("http://localhost:4200/login?status=nologin");
    } else {
      var authJwt = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          name: user.name.toString(),
          user: user.email
        },
        CONFIG.JWT_SECRET
      );
      return redirect(
        "http://localhost:4200/login/token#access_token=" + authJwt
      );
    }
  } else {
    //TODO Handle cross errors and invalid states...
    return status(400);
  }
  return status(400);
};

async function findOrCreateUser(accessToken) {
  const AuthStr = "token ".concat(accessToken);
  const validadeTokenResquest = {
    url: "https://api.github.com/user",
    method: "get",
    headers: {
      "User-Agent": "HN-CodeVenture",
      Authorization: AuthStr
    }
  };
  var user;
  await axios(validadeTokenResquest)
    .then(response => {
      user = userAdapter.getUserById(response.data.id);
      if (user === undefined) {
        userAdapter.createUser(
          response.data.email,
          response.data.name,
          response.data.id,
          accessToken
        );
        user = userAdapter.getUserById(response.data.id);
      } else {
        userAdapter.updateAccessToken(response.data.id, accessToken);
      }
    })
    .catch(error => {
      console.log(error);
    });
  return user;
  // axios.get("https://api.github.com/user", { headers: { Authorization: AuthStr } })
  //  .then(response => {
  //     var user = userAdapter.getUserById(response.data.id);
  //     if (user === undefined) {
  //     	userAdapter.createUser(response.data.email, response.data.name, response.data.id, accessToken);
  //     } else {
  //     	userAdapter.updateAccessToken(response.data.id, accessToken)
  //     }
  //   })
  //  .catch((error) => {
  //      console.log(error);
  //   });
}
