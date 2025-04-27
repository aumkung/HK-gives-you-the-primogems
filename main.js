const dotenv = require("dotenv");
const cron = require("node-cron");

dotenv.config();

const profiles = [
  {
    // --- Configuration Section ---

    // Main Account

    accountName: process.env.ACC_NAME, // <--- Enter AccountName
    myDiscordID: process.env.DIS_ID, // <--- Enter ID Discord of account owner.

    token: `ltoken_v2=${process.env.LT_TOKEN}; ltuid_v2=${process.env.LT_UID};`, // <--- PUT YOUR TOKEN

    // --- Setting the game to enable (true = enable, false = disable) ---
    genshin: true,
    honkai_star_rail: true,
    zzz: true,
    honkai_3: true,
    tears_of_themis: true,

    // --- Enter your UID ---
    customUids: {
      Genshin: null,
      Star_Rail: process.env.STARRAIL_UID,
      ZZZ: process.env.ZZZ_UID,
      Honkai_3: null,
      Tears_of_Themis: null,
    },

    // --- Support 15 languages ---
    // English: en-us
    // 简体中文 (Simplified Chinese): zh-cn
    // 繁體中文 (Traditional Chinese): zh-tw
    // 日本語 (Japanese): ja-jp
    // 한국어 (Korean): ko-kr
    // Bahasa Indonesia (Indonesian): id-id
    // Deutsch (German): de-de
    // Español (Spanish): es-es
    // Français (French): fr-fr
    // Italiano (Italian): it-it
    // Português (Portuguese): pt-pt
    // Русский язык (Russian language): ru-ru
    // ภาษาไทย (Thai language): th-th
    // Türkçe (Turkish): tr-tr
    // Tiếng Việt (Vietnamese): vi-vn

    lang: "en-us", // <--- Enter the desired language.
  },

  {
    // Account 2 : If you want to log in to Multiple_accounts

    accountName: "", // <--- Enter AccountName
    myDiscordID: "", // <--- Enter ID Discord of account owner.

    token: `ltoken_v2=${process.env.LT_TOKEN_SECOND}; ltuid_v2=${process.env.LT_UID_SECOND};`, // <--- PUT YOUR TOKEN

    // --- Setting the game to enable (true = enable, false = disable) ---
    genshin: true,
    honkai_star_rail: true,
    zzz: true,
    honkai_3: true,
    tears_of_themis: true,

    // --- Enter Your UID ---
    customUids: {
      Genshin: process.env.GENSHIN_UID,
      Star_Rail: null,
      ZZZ: null,
      Honkai_3: null,
      Tears_of_Themis: null,
    },

    lang: "en-us", // <--- Enter the desired language.
  },

  /*
      {
          // Account 3 , 4 , 5 :    If you have multiple accounts, you can copy the format from above and add them yourself.
  
          accountName: "", // <--- Enter AccountName
          myDiscordID: "", // <--- Enter ID Discord of account owner.      etc. */
];

/** Multiple account login **/
const Multiple_accounts = true; // <---  true = (on) multiple account login, false = (off) Main account login only

/** Discord Notification **/
const discord_notify = true; // Set to true to enable Discord notifications.
const discordWebhooks = [
  process.env.DIS_WEBHOOK_URL, // <--- Enter Main Webhook URL

  /* You can add a URL to send notifications to any message box. */
  //  "https://canary.discord.com/api/webhooks/",  // <--- Enter Webhook URL 2
  // "https://canary.discord.com/api/webhooks/",  // <--- Enter Webhook URL 3
];
const webhooks_username = "Check in Notification"; // <--- Enter Username Webhooks
const webhooks_avatar_url = process.env.DIS_WEBHOOK_AVATAR_URL; // <--- Enter Avatar URL link

/** Notification message in Embeds*/
const logedin_text = "has logged in!";
const totalclaim_text_1 = "Total Claimed";
const totalclaim_text_2 = "days this month";

//     ---- This is all that needs to be fixed. ----

/** this script made by Nattapat2871    **/
/** After this line is the script code. Please DO NOT modify. **/
/** This script is modified to run in Node.js using axios. */

const gameDetails = {
  Genshin: {
    name: "Genshin Impact",
    color: 0x298aff,
    key: "genshin",
    checkinUrl:
      "https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481",
  },
  Star_Rail: {
    name: "Honkai Star Rail",
    color: 0xfa6eff,
    key: "honkai_star_rail",
    checkinUrl:
      "https://act.hoyolab.com/bbs/event/signin/hkrpg/index.html?act_id=e202303301540311",
  },
  ZZZ: {
    name: "Zenless Zone Zero",
    color: 0xf3a534,
    key: "zzz",
    checkinUrl:
      "https://act.hoyolab.com/bbs/event/signin/zzz/index.html?act_id=e202406031448091",
  },
  Honkai_3: {
    name: "Honkai Impact 3rd",
    color: 0xe7dfe7,
    key: "honkai_3",
    checkinUrl:
      "https://act.hoyolab.com/bbs/event/signin-bh3/index.html?act_id=e202110291205111",
  },
  Tears_of_Themis: {
    name: "Tears of Themis",
    color: 0x000000,
    key: "tears_of_themis",
    checkinUrl:
      "https://act.hoyolab.com/bbs/event/signin/nxx/index.html?act_id=e202202281857121",
  },
};

// --- Function to dynamically generate endpoints based on profile language ---
function getGameEndpoints(lang) {
  return {
    Genshin: {
      sign: `https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=${lang}&act_id=e202102251931481`,
      info: `https://sg-hk4e-api.hoyolab.com/event/sol/info?lang=${lang}&act_id=e202102251931481`,
      home: `https://sg-hk4e-api.hoyolab.com/event/sol/home?lang=${lang}&act_id=e202102251931481`,
    },
    Star_Rail: {
      sign: `https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=${lang}&act_id=e202303301540311`,
      info: `https://sg-public-api.hoyolab.com/event/luna/os/info?lang=${lang}&act_id=e202303301540311`,
      home: `https://sg-public-api.hoyolab.com/event/luna/os/home?lang=${lang}&act_id=e202303301540311`,
    },
    ZZZ: {
      sign: `https://sg-act-nap-api.hoyolab.com/event/luna/zzz/os/sign?lang=${lang}&act_id=e202406031448091`,
      info: `https://sg-act-nap-api.hoyolab.com/event/luna/zzz/os/info?lang=${lang}&act_id=e202406031448091`,
      home: `https://sg-act-nap-api.hoyolab.com/event/luna/zzz/os/home?lang=${lang}&act_id=e202406031448091`,
    },
    Honkai_3: {
      sign: `https://sg-public-api.hoyolab.com/event/mani/sign?lang=${lang}&act_id=e202110291205111`,
      info: `https://sg-public-api.hoyolab.com/event/mani/info?lang=${lang}&act_id=e202110291205111`,
      home: `https://sg-public-api.hoyolab.com/event/mani/home?lang=${lang}&act_id=e202110291205111`,
    },
    Tears_of_Themis: {
      sign: `https://sg-public-api.hoyolab.com/event/luna/nxx/os/sign?lang=${lang}&act_id=e202202281857121`,
      info: `https://sg-public-api.hoyolab.com/event/luna/nxx/os/info?lang=${lang}&act_id=e202202281857121`,
      home: `https://sg-public-api.hoyolab.com/event/luna/nxx/os/home?lang=${lang}&act_id=e202202281857121`,
    },
  };
}

// Import axios
const axios = require("axios"); // <--- Added: Import axios

// <--- Modified: Replaced Utilities.sleep with an async sleep function ---
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function discordPing(discordId) {
  if (discordId && /^\d+$/.test(discordId)) {
    return `<@${discordId}>`;
  } else {
    return "";
  }
}

// <--- Modified: Replaced UrlFetchApp.fetch with axios ---
async function makeApiRequest(method, url, token, gameKey, data = null) {
  const baseHeader = {
    Cookie: token,
    Accept: "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
    "x-rpc-app_version": "2.34.1", // Might need updates periodically
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "x-rpc-client_type": "4", // or "5" for web
    Referer: "https://act.hoyolab.com/",
    Origin: "https://act.hoyolab.com",
  };
  const headers = { ...baseHeader };
  if (gameDetails[gameKey]) {
    headers["x-rpc-signgame"] = gameDetails[gameKey].key;
  }

  const config = {
    method: method.toLowerCase(),
    url: url,
    headers: headers,
    timeout: 10000, // Example timeout: 10 seconds
    // Axios automatically handles JSON parsing and throws errors for non-2xx status codes.
    // validateStatus: function (status) {
    //   return status >= 200 && status < 300; // Default axios behavior
    // },
  };

  if (method.toUpperCase() === "POST" && data) {
    config.data = data; // Axios uses 'data' property for POST body
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await axios(config);
    return response.data; // Axios returns parsed data directly
  } catch (error) {
    let errorMessage = `API request failed for ${gameKey} at ${url}: `;
    let responseBody = null;
    let responseStatus = null;

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      responseStatus = error.response.status;
      responseBody = error.response.data;
      errorMessage += `HTTP ${responseStatus}`;
      if (responseBody) {
        try {
          // Attempt to extract a more specific message from the response body
          const hoyoMessage =
            responseBody.message || JSON.stringify(responseBody);
          errorMessage += `: ${hoyoMessage}`;
        } catch (e) {
          errorMessage += ` - Unable to parse error response body: ${responseBody}`;
        }
      } else {
        errorMessage += ` - No response body received.`;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage += `No response received from server.`;
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage += `Error setting up request: ${error.message}`;
    }

    console.error(
      `[${gameKey}] Exception during axios request for ${url}:`,
      errorMessage,
      error.config
    ); // Log the config for debugging
    throw new Error(errorMessage); // Re-throw a standardized error
  }
}

// <--- Modified: Made function async to use await sleep ---
async function getCheckInData(gameKey, token, customUid, lang) {
  const endpoints = getGameEndpoints(lang)[gameKey]; // Get endpoints based on language
  const details = gameDetails[gameKey];
  let signResult, infoResult, homeResult;
  let checkInStatus = "Unknown Status";
  let totalSignDay = 0;
  let uid = customUid || "N/A";
  let isSign = false;
  let todayReward = { name: "N/A", cnt: 0, icon: "" };
  let captchaRisk = false;
  let errorMessage = null;
  let specificApiMessage = null;

  try {
    // 1. Attempt Sign-in
    try {
      signResult = await makeApiRequest(
        "POST",
        endpoints.sign,
        token,
        gameKey,
        {}
      ); // Await the async call
      specificApiMessage = signResult.message || "No message in sign response";
      checkInStatus = specificApiMessage;

      if (
        signResult.data &&
        (signResult.data.gt ||
          signResult.data.risk_code ||
          signResult.data.is_risk)
      ) {
        captchaRisk = true;
        checkInStatus = "CAPTCHA Risk Detected";
        console.warn(
          `[${gameKey}] CAPTCHA detected during sign-in. Response: ${JSON.stringify(
            signResult
          )}`
        );
        throw new Error(checkInStatus);
      }

      if (signResult.retcode === 0) {
        checkInStatus = "OK";
      } else if (signResult.retcode === -5003) {
        isSign = true;
      } else {
        console.warn(
          `[${gameKey}] Sign-in issue: ${checkInStatus} (retcode: ${signResult.retcode})`
        );
        errorMessage = `Sign-in failed: ${checkInStatus}`;
      }
    } catch (signError) {
      console.error(
        `[${gameKey}] Sign-in request failed: ${signError.message}`
      );
      if (!captchaRisk) {
        // Use the message from the thrown error which might contain HTTP status etc.
        errorMessage = `Sign-in request error: ${signError.message}`;
        checkInStatus = errorMessage;
      } else {
        // If it was a CAPTCHA error, let it propagate
        errorMessage = `CAPTCHA Risk Detected`;
        checkInStatus = errorMessage;
        throw signError; // Re-throw CAPTCHA error to be caught by the outer try-catch
      }
      // Do not proceed if sign-in failed critically (excluding CAPTCHA which is handled by throw)
      if (!captchaRisk && !signError.message.includes("-5003")) {
        // Allow already checked-in (-5003) to proceed to info check
        throw signError; // Throw other critical sign-in errors
      }
    }

    // 2. Get Info
    try {
      infoResult = await makeApiRequest("GET", endpoints.info, token, gameKey); // Await the async call
      if (infoResult && infoResult.data) {
        const infoIsSign = infoResult.data.is_sign || false;
        totalSignDay = infoResult.data.total_sign_day || 0;

        if (infoIsSign) {
          isSign = true;
          if (signResult?.retcode === 0 && checkInStatus === "OK") {
            checkInStatus = "Check-in Successful";
            // If sign-in was successful just now, the info call might not reflect the new day count yet.
            // It's safer to rely on the previous day count + 1 if sign-in was successful,
            // but HoYoLAB API can be inconsistent. Let's trust the info call for now.
            // totalSignDay = (infoResult.data.total_sign_day || 0); // Trust the info API result
            errorMessage = null;
          } else if (signResult?.retcode === -5003) {
            checkInStatus = specificApiMessage; // "Traveler, you've already checked in today~"
            errorMessage = null;
          } else {
            // This case might happen if sign-in failed but info says signed in (e.g., race condition?)
            checkInStatus =
              specificApiMessage || "Already checked in (according to info)";
            errorMessage = null;
          }
        } else {
          // Info says not signed in
          isSign = false;
          if (errorMessage) {
            // Keep the error message from the sign-in attempt if it exists
            checkInStatus = errorMessage;
          } else if (signResult?.retcode === 0) {
            // Sign-in reported OK, but info says not signed in. This indicates a potential delay/issue.
            checkInStatus =
              "Check-in reported OK, but info says not signed in yet.";
            errorMessage = checkInStatus;
          } else {
            checkInStatus = "Not checked in";
            errorMessage = checkInStatus; // Set error if definitively not checked in
          }
        }

        if (typeof totalSignDay !== "number" || totalSignDay < 0) {
          console.warn(
            `[${gameKey}] Invalid totalSignDay received: ${totalSignDay}. Setting to 0.`
          );
          totalSignDay = 0;
        }
      } else {
        console.warn(
          `[${gameKey}] Info data not found/invalid. Response: ${JSON.stringify(
            infoResult
          )}`
        );
        totalSignDay = 0;
        isSign = false;
        if (!errorMessage) errorMessage = "Failed to retrieve check-in info.";
        checkInStatus = errorMessage;
      }
    } catch (infoError) {
      console.error(
        `[${gameKey}] Failed to get info data: ${infoError.message}`
      );
      if (!errorMessage)
        errorMessage = `Failed to retrieve info: ${infoError.message}`;
      checkInStatus = errorMessage;
      totalSignDay = 0;
      isSign = false;
    }

    // 3. Get Home/Awards
    if (isSign && totalSignDay > 0) {
      try {
        homeResult = await makeApiRequest(
          "GET",
          endpoints.home,
          token,
          gameKey
        ); // Await the async call
        if (
          homeResult &&
          homeResult.data &&
          homeResult.data.awards &&
          homeResult.data.awards.length >= totalSignDay
        ) {
          const rewardIndex = totalSignDay - 1;
          const rawReward = homeResult.data.awards[rewardIndex];
          if (rawReward) {
            todayReward = {
              name: rawReward.name || "N/A",
              cnt: rawReward.cnt || 0,
              icon: rawReward.icon || "",
            };
          } else {
            console.warn(
              `[${gameKey}] Reward data for day ${totalSignDay} missing/invalid.`
            );
          }
        } else {
          console.warn(
            `[${gameKey}] Awards data not found/insufficient/invalid. Total Days: ${totalSignDay}, Awards Length: ${
              homeResult?.data?.awards?.length
            }. Resp: ${JSON.stringify(homeResult)}`
          );
        }
      } catch (homeError) {
        console.error(
          `[${gameKey}] Failed to get home/awards data: ${homeError.message}`
        );
        // Don't overwrite the main status if reward fetch fails
      }
    } else if (totalSignDay === 0 && isSign) {
      console.log(
        `[${gameKey}] Signed in but total days is 0 (or info fetch failed). Skipping reward fetch.`
      );
    } else if (!isSign) {
      console.log(
        `[${gameKey}] Not signed in (or sign/info failed), skipping reward fetch.`
      );
    }

    // --- Final Return Object ---
    // Success is defined as either a successful check-in now OR already being checked in, AND no critical errors occurred.
    const success =
      !captchaRisk &&
      !errorMessage &&
      (checkInStatus === "Check-in Successful" ||
        signResult?.retcode === -5003 ||
        (isSign && checkInStatus.includes("Already checked in")));
    let finalStatusMessage = captchaRisk
      ? "CAPTCHA - Manual Check-in Required"
      : checkInStatus;

    // Refine final status message if needed
    if (
      success &&
      checkInStatus.includes("Already checked in") &&
      signResult?.retcode === -5003
    ) {
      finalStatusMessage = signResult.message; // Use the accurate "already checked in" message
    } else if (success && checkInStatus === "OK") {
      finalStatusMessage = "Check-in Successful"; // Correct status if sign retcode was 0 but final status was just "OK"
    }

    return {
      gameName: details.name,
      color: details.color,
      itemName: todayReward.name,
      itemCount: todayReward.cnt,
      itemIcon: todayReward.icon || "",
      statusMessage: finalStatusMessage,
      totalDays: totalSignDay, // Use the value from the info call
      uid: uid,
      success: success,
      error: captchaRisk ? "CAPTCHA" : errorMessage, // errorMessage holds other errors
      requiresRetry: captchaRisk,
      checkinUrl: details.checkinUrl,
    };
  } catch (error) {
    // Catch errors from sign-in, info, or CAPTCHA throw
    console.error(
      `[${gameKey}] Critical error during check-in process for UID ${uid}: ${error.message}`
    );
    return {
      gameName: details.name,
      color: details.color,
      itemName: "N/A",
      itemCount: 0,
      itemIcon: "",
      statusMessage: `Error: ${error.message}`, // Use the error message directly
      totalDays: 0,
      uid: uid,
      success: false,
      error: error.message,
      requiresRetry: error.message.includes("CAPTCHA"), // Check if the error indicates CAPTCHA
      checkinUrl: details.checkinUrl,
    };
  }
}

// <--- Modified: Made function async to use await sleep and getCheckInData ---
async function processProfile(profile) {
  const profileIdentifier =
    profile.accountName ||
    profile.customUids?.Genshin ||
    profile.customUids?.Star_Rail ||
    profile.customUids?.ZZZ ||
    profile.customUids?.Honkai_3 ||
    profile.token.substring(0, 25) + "...";
  console.log();
  console.log();
  console.log(
    `\nProcessing login for account: ${
      profile.accountName || "N/A"
    } (Discord ID: ${profile.myDiscordID || "N/A"}, Lang: ${profile.lang})`
  );
  console.log();
  const finalGameResults = [];
  const gameKeys = Object.keys(getGameEndpoints(profile.lang)); // Use dynamic endpoints
  let profileRequiresRetry = false;
  const customUids = profile.customUids || {};

  for (const gameKey of gameKeys) {
    const gameConfigKey = gameDetails[gameKey]?.key;
    if (gameConfigKey && profile[gameConfigKey]) {
      const specificCustomUid = customUids?.[gameKey]; // Get UID specific to the game
      if (specificCustomUid) {
        // chekc uid
        try {
          // --- Perform check-in (single attempt sufficient with clearer logic) ---
          console.log(
            ` - [Notification] logging in for ${gameDetails[gameKey].name}...`
          );
          let result = await getCheckInData(
            gameKey,
            profile.token,
            specificCustomUid,
            profile.lang
          ); // Await the result, pass lang
          result.accountName = profile.accountName || "N/A";
          result.myDiscordID = profile.myDiscordID;
          finalGameResults.push(result);

          // Log the outcome
          console.log(
            `  - Result: ${result.statusMessage} | Total Days: ${
              result.totalDays
            } | Success: ${result.success} | Error: ${result.error || "None"}`
          );

          // Check if this game instance requires retry
          if (result.requiresRetry) {
            profileRequiresRetry = true; // Mark the whole profile for retry if any game hits CAPTCHA
            console.log(
              `  - [${gameKey}] CAPTCHA detected. Profile marked for potential retry.`
            );
          }
        } catch (error) {
          // Catch any unexpected errors during the processing of a specific game
          console.error(
            `  - [Critical Error] Processing ${gameKey} for profile ${profileIdentifier} failed unexpectedly: ${error.message}`,
            error.stack
          );
          finalGameResults.push({
            gameName: gameDetails[gameKey]?.name || gameKey,
            color: 0xff0000, // Red for error
            itemName: "N/A",
            itemCount: 0,
            itemIcon: "",
            statusMessage: `Critical Processing Error: ${error.message}`,
            totalDays: 0,
            uid: specificCustomUid || "N/A",
            success: false,
            error: error.message,
            requiresRetry: false,
            checkinUrl: gameDetails[gameKey]?.checkinUrl || "N/A",
            accountName: profile.accountName || "N/A",
            myDiscordID: profile.myDiscordID,
          });
          // Continue to the next game even if one fails critically
          continue;
        }
        // Add a small delay between game check-ins for the same account
        await sleep(1500 + Math.random() * 1000); // Wait 1.5-2.5 seconds
      }
    } else if (gameConfigKey && !profile[gameConfigKey]) {
      // console.log(`- Skipping ${gameDetails[gameKey].name} (disabled).`);
    }
  }

  return {
    gameResults: finalGameResults,
    requiresRetry: profileRequiresRetry,
  };
}

// --- Function to create Discord Embed ---
function createDiscordEmbed(gameResult) {
  // console.log(`[DEBUG][${gameResult.gameName}] Data for Embed:`, JSON.stringify(gameResult, null, 2));

  const embed = {
    color: gameResult.color || 0x7289da,
    footer: {
      // Show account name, game name, and UID in Footer
      text: `Account: ${gameResult.accountName || "N/A"} | ${
        gameResult.gameName
      } | UID: ${gameResult.uid || "N/A"}`,
    },
    timestamp: new Date().toISOString(), // Add timestamp
  };

  // Determine Title based on success, status, and item presence
  if (
    gameResult.success ||
    gameResult.statusMessage.includes("Already checked in")
  ) {
    if (gameResult.itemName && gameResult.itemName !== "N/A") {
      embed.title = `${gameResult.itemName} x${gameResult.itemCount || 1}`;
    } else {
      // Successful check-in or already checked in, but no item details (or item is legitimately null/empty)
      embed.title = `${gameResult.gameName} Check-In Status`;
      // Optionally add a note if item details were expected but missing
      // if (!gameResult.itemName) {
      //     embed.title += " (Item Detail Unavailable)";
      // }
    }
  } else if (gameResult.requiresRetry) {
    embed.title = `${gameResult.gameName} - CAPTCHA Detected`;
  } else {
    // Handle various error scenarios
    if (
      gameResult.statusMessage.includes("Profile not found") ||
      gameResult.error?.includes("Profile not found")
    ) {
      embed.title = `${gameResult.gameName} - Profile Not Found`;
    } else if (
      gameResult.statusMessage.includes("Error:") ||
      gameResult.error
    ) {
      // General error display
      embed.title = `${gameResult.gameName} - Check-In Error`;
      // Optionally add more detail if available and concise
      // if(gameResult.error && gameResult.error.length < 50) { // Avoid overly long titles
      //    embed.title += `: ${gameResult.error}`;
      // }
    } else {
      // Default failed state
      embed.title = `${gameResult.gameName} - Check-In Failed`;
    }
  }

  // --- Set Thumbnail ---
  // Show thumbnail only if check-in was successful (or already done) AND icon exists
  if (
    (gameResult.success ||
      gameResult.statusMessage.includes("Already checked in")) &&
    gameResult.itemIcon &&
    typeof gameResult.itemIcon === "string" &&
    gameResult.itemIcon.startsWith("http")
  ) {
    embed.thumbnail = { url: gameResult.itemIcon };
  }

  // --- Set Fields ---
  embed.fields = [];

  // Field 1: User logged in mention
  if (logedin_text) {
    // Only add if text is defined
    embed.fields.push({
      name: ``, // Zero-width space for spacing if needed
      value: `${discordPing(gameResult.myDiscordID)} ${logedin_text}`,
      inline: false,
    });
  }

  // Field 2: Status Message (clickable link)
  embed.fields.push({
    name: "", // Clearer field name
    value: `[${gameResult.statusMessage || "Status Unknown"}](${
      gameResult.checkinUrl || "https://hoyolab.com"
    })`, // Provide default URL
    inline: false, // Keep status prominent
  });

  // Field 3: Total Claimed (only if successful or already claimed)
  if (
    gameResult.success ||
    gameResult.statusMessage.includes("Already checked in")
  ) {
    embed.fields.push({
      name: "", // Clearer field name
      value: `${totalclaim_text_1} **${
        gameResult.totalDays === undefined ? "N/A" : gameResult.totalDays
      }** ${totalclaim_text_2}`,
      inline: false, // Keep streak prominent
    });
  } else if (gameResult.error && !gameResult.requiresRetry) {
    // Optionally add error details in a field for non-CAPTCHA errors
    embed.fields.push({
      name: "Error Details",
      value: `\`\`\`${gameResult.error.substring(0, 1000)}\`\`\``, // Limit length
      inline: false,
    });
  }

  return embed;
}

// --- Modified: Webhook function using axios and async/await ---
async function postWebhook(
  singleProfileGameResults,
  webhookUrls,
  discordNotify
) {
  // Make async
  if (
    !discordNotify ||
    !Array.isArray(webhookUrls) ||
    webhookUrls.length === 0 ||
    webhookUrls.every((url) => !url || !url.startsWith("http"))
  ) {
    console.log(
      "[DiscordWebhooks] Notification disabled or no valid webhook URLs provided."
    );
    return;
  }

  if (
    !Array.isArray(singleProfileGameResults) ||
    singleProfileGameResults.length === 0
  ) {
    console.log(
      "[DiscordWebhooks] No valid game results provided for this profile to send."
    );
    return;
  }

  const allEmbeds = [];
  for (const gameResult of singleProfileGameResults) {
    if (gameResult) {
      // Basic check if gameResult is not null/undefined
      allEmbeds.push(createDiscordEmbed(gameResult));
    }
  }

  if (allEmbeds.length === 0) {
    console.log(
      "[DiscordWebhooks] No valid embeds generated from the provided game results."
    );
    return;
  }

  // Discord allows max 10 embeds per message
  const chunks = [];
  for (let i = 0; i < allEmbeds.length; i += 10) {
    chunks.push(allEmbeds.slice(i, i + 10));
  }

  const validWebhookUrls = webhookUrls.filter(
    (url) => url && url.startsWith("http")
  );

  for (const [webhookIndex, currentWebhookUrl] of validWebhookUrls.entries()) {
    const accountNameToLog =
      singleProfileGameResults[0]?.accountName || "Current Account"; // Get account name from first result
    console.log(
      `\n[DiscordWebhooks] Sending ${
        allEmbeds.length
      } embed(s) for account: '${accountNameToLog}' to Webhook #${
        webhookIndex + 1
      }`
    );

    for (const [chunkIndex, chunk] of chunks.entries()) {
      const payload = {
        username: webhooks_username,
        avatar_url: webhooks_avatar_url,
        embeds: chunk,
      };

      try {
        const config = {
          method: "post",
          url: currentWebhookUrl,
          headers: { "Content-Type": "application/json" },
          data: payload,
          timeout: 15000, // 15 second timeout for webhook post
        };
        const response = await axios(config); // Use axios

        //console.log(`  - Sent chunk ${chunkIndex + 1}/${chunks.length} to Webhook #${webhookIndex + 1}. Status: ${response.status}`);
      } catch (error) {
        let errorMsg = `  - Error sending Discord notification chunk ${
          chunkIndex + 1
        } to Webhook #${webhookIndex + 1}: `;
        if (error.response) {
          errorMsg += `HTTP ${error.response.status} - ${JSON.stringify(
            error.response.data
          )}`;
        } else if (error.request) {
          errorMsg += `No response received.`;
        } else {
          errorMsg += `Request setup error: ${error.message}`;
        }
        console.error(errorMsg);
      }

      // Rate limiting delay between chunks/webhooks
      if (
        (chunks.length > 1 && chunkIndex < chunks.length - 1) ||
        (validWebhookUrls.length > 1 &&
          webhookIndex < validWebhookUrls.length - 1)
      ) {
        await sleep(1200); // Wait 1.2 seconds (adjust as needed for Discord rate limits)
      }
    }

    // console.log(`[DiscordWebhooks] Finished sending embeds for '${accountNameToLog}' to Webhook #${webhookIndex + 1}.`);
  }
}

// --- Modified: Main function using async/await ---
async function main() {
  // Make main async
  await sleep(1000);
  console.log(); // Use await sleep
  console.log(
    "Starting RIMURU GIVES YOU THE PRIMOGEM Script (Node.js Version)"
  );
  console.log(
    "Developer by Nattapat2871 https://github.com/Nattapat2871/Rimuru-gives-you-the-primogems"
  );
  await sleep(2000);
  console.log(); // Use await sleep
  console.log("Starting auto log in process...");

  // Retry logic is removed as CAPTCHA requires manual intervention anyway.
  // The script will process each configured profile once.
  const maxAttempts = 1; // No retries implemented in this version
  let profilesToProcess = [];

  // --- Select profiles based on Multiple_accounts setting ---
  if (Multiple_accounts) {
    profilesToProcess = profiles.filter(
      (p) => p && p.token && p.token.includes("ltoken_v2")
    );
    console.log(
      `[Multiple accounts] Enable multiple login ${profilesToProcess.length} accounts.`
    );
  } else {
    // Use only the first valid profile if Multiple_accounts is false
    const mainProfile = profiles.find(
      (p) => p && p.token && p.token.includes("ltoken_v2")
    );
    if (mainProfile) {
      profilesToProcess = [mainProfile];
      console.log("[Main account] Enable Main account login");
    } else {
      console.log(
        "[Main account] No valid main profile found in the configuration."
      );
      profilesToProcess = [];
    }
  }

  if (profilesToProcess.length === 0) {
    console.log("No profiles configured or found to be valid. Exiting.");
    return; // Exit if no profiles to process
  }

  for (let i = 0; i < profilesToProcess.length; i++) {
    const currentProfile = profilesToProcess[i];
    const profileIdentifier =
      currentProfile.accountName ||
      currentProfile.token.substring(0, 20) + "..."; // Safe identifier

    try {
      // Process the profile (handles game check-ins internally)
      const profileResult = await processProfile(currentProfile); // Await the async call

      // Send notifications if enabled and results exist
      if (
        discord_notify &&
        profileResult.gameResults &&
        profileResult.gameResults.length > 0
      ) {
        await postWebhook(
          profileResult.gameResults,
          discordWebhooks,
          discord_notify
        ); // Await webhook posting
      } else if (!discord_notify) {
        console.log(
          `   - Discord notifications disabled for profile: ${profileIdentifier}`
        );
      } else {
        console.log(
          `   - No game results to send for profile: ${profileIdentifier}`
        );
      }

      // Log completion for the profile
      if (profileResult.requiresRetry) {
        console.log(
          `Account : ${profileIdentifier} (Discord ID: ${
            currentProfile.myDiscordID || "N/A"
          }) processed. CAPTCHA detected in one or more games. Manual check-in required.`
        );
      } else {
        console.log(
          `Account : ${profileIdentifier} (Discord ID: ${
            currentProfile.myDiscordID || "N/A"
          }) processed successfully.`
        );
      }
    } catch (error) {
      // Catch critical errors during the profile processing loop itself (less likely now with error handling inside processProfile)
      console.error(
        `Critical error processing profile '${profileIdentifier}' (Discord ID: ${
          currentProfile.myDiscordID || "N/A"
        }):`,
        error.message,
        error.stack
      );
      // Continue to the next profile even if one fails critically here
    }

    // Delay between processing different profiles
    if (i < profilesToProcess.length - 1) {
      console.log(``);
      await sleep(2000); // Wait 2 sec
    }
  }

  console.log();
  console.log();
  console.log("Logged in process completed.");
  console.log();
}

// --- Start the main function ---
// main().catch((error) => {
//   console.error("An uncaught error occurred in the main execution:", error);
// });

// ตั้งให้ทำงานทุกวันเวลา 03:00 AM
cron.schedule(
  "0 3 * * *",
  () => {
    console.log("Running task at 00:59 AM");
    // ใส่โค้ดที่อยากให้ทำตรงนี้ เช่น backup database, ส่ง email ฯลฯ
  },
  {
    timezone: "Asia/Bangkok",
  }
);
