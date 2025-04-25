
//   #   #    ###   #####  #####   ###   ####    ###   #####   ###    ###   ######    #
//   ##  #   #   #    #      #    #   #  #   #  #   #    #    #   #  #   #       #   ##
//   # # #   #####    #      #    #####  ####   #####    #      #     ###       #     #
//   #  ##   #   #    #      #    #   #  #      #   #    #     #     #   #     #      #
//   #   #   #   #    #      #    #   #  #      #   #    #    #####   ###     #     #####
//   https://github.com/Nattapat2871


const profiles = [
    {  // --- Configuration Section ---

        // --- PUT YOUR TOKEN ---
        token: "ltoken_v2=xxxxxx; ltuid_v2=xxxxxx;", 

        // --- Setting the game to enable (true = enable, false = disable) ---
        genshin: true,
        honkai_star_rail: true,
        zzz: true,
        honkai_3: true,
        tears_of_themis: true,

        // --- Enter your UID  ---
        customUids: {
            Genshin: "",
            Star_Rail: "",
            ZZZ: "",
            Honkai_3: "",
            Tears_of_Themis: ""
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

        lang: 'en-us' // <--- Enter the desired language.
    },
];

/** Discord Notification **/
const discord_notify = true; // Set to true to enable Discord notifications.
const myDiscordID = ""; // <---  Enter Your Discord User ID 
const discordWebhook = "https://canary.discord.com/api/webhooks/"; // <---  Enter Your Webhooks URL
const webhooks_username = "ʀɪᴍᴜʀᴜ ɢɪᴠᴇꜱ ʏᴏᴜ ᴛʜᴇ ᴘʀɪᴍᴏɢᴇᴍ"  // <--- Enter Your Username Webhooks
const webhooks_avatar_url = "https://cdn.discordapp.com/attachments/1276433865375879199/1277718573439127572/image.png?ex=66ce2fa6&is=66ccde26&hm=0e32ea05e2b673c64ae1bfc310bd5e045875a6d5798c768c18f877929922540a&"  // <--- Enter Avatar URL link

/** Notification message in Embeds*/
const logedin_text = "has logged in!"
const totalclaim_text_1 = "Total Claimed"
const totalclaim_text_2 = "days this month"






/**  this script made by Nattapat2871    **/
/**  After this line is the script code. Please DO NOT modify. **/
/**  This script is .gs and works only in Google app script.  (https://script.google.com)  */

const gameDetails = {
    Genshin: { name: "Genshin Impact", color: 0x298aff, key: "genshin", checkinUrl: "https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481" },
    Star_Rail: { name: "Honkai Star Rail", color: 0xfa6eff, key: "honkai_star_rail", checkinUrl: "https://act.hoyolab.com/bbs/event/signin/hkrpg/index.html?act_id=e202303301540311" },
    ZZZ: { name: "Zenless Zone Zero", color: 0xf3a534, key: "zzz", checkinUrl: "https://act.hoyolab.com/bbs/event/signin/zzz/index.html?act_id=e202406031448091" },
    Honkai_3: { name: "Honkai Impact 3rd", color: 0xe7dfe7, key: "honkai_3", checkinUrl: "https://act.hoyolab.com/bbs/event/signin-bh3/index.html?act_id=e202110291205111" },
    Tears_of_Themis:{ name: "Tears of Themis", color: 0x000000, key: "tears_of_themis", checkinUrl: "https://act.hoyolab.com/bbs/event/signin/nxx/index.html?act_id=e202202281857121"}
};

// --- Endpoints (sign, info, home) ---
const gameEndpoints = {
    Genshin: {
        sign: `https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=${profiles[0].lang}&act_id=e202102251931481`,
        info: `https://sg-hk4e-api.hoyolab.com/event/sol/info?lang=${profiles[0].lang}&act_id=e202102251931481`,
        home: `https://sg-hk4e-api.hoyolab.com/event/sol/home?lang=${profiles[0].lang}&act_id=e202102251931481`
    },
    Star_Rail: {
        sign: `https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=${profiles[0].lang}&act_id=e202303301540311`,
        info: `https://sg-public-api.hoyolab.com/event/luna/os/info?lang=${profiles[0].lang}&act_id=e202303301540311`,
        home: `https://sg-public-api.hoyolab.com/event/luna/os/home?lang=${profiles[0].lang}&act_id=e202303301540311`
    },
    ZZZ: {
        sign: `https://sg-act-nap-api.hoyolab.com/event/luna/zzz/os/sign?lang=${profiles[0].lang}&act_id=e202406031448091`,
        info: `https://sg-act-nap-api.hoyolab.com/event/luna/zzz/os/info?lang=${profiles[0].lang}&act_id=e202406031448091`,
        home: `https://sg-act-nap-api.hoyolab.com/event/luna/zzz/os/home?lang=${profiles[0].lang}&act_id=e202406031448091`
    },
    Honkai_3: {
        sign: `https://sg-public-api.hoyolab.com/event/mani/sign?lang=${profiles[0].lang}&act_id=e202110291205111`,
        info: `https://sg-public-api.hoyolab.com/event/mani/info?lang=${profiles[0].lang}&act_id=e202110291205111`,
        home: `https://sg-public-api.hoyolab.com/event/mani/home?lang=${profiles[0].lang}&act_id=e202110291205111`
    },
    Tears_of_Themis:{
        sign: `https://sg-public-api.hoyolab.com/event/luna/nxx/os/sign?lang=${profiles[0].lang}&act_id=e202202281857121`,
        info: `https://sg-public-api.hoyolab.com/event/luna/nxx/os/info?lang=${profiles[0].lang}&act_id=e202202281857121`,
        home: `https://sg-public-api.hoyolab.com/event/luna/nxx/os/home?lang=${profiles[0].lang}&act_id=e202202281857121`
    }
};

function sleep(ms) {
    Utilities.sleep(ms);
}

function discordPing() {
    if (myDiscordID && /^\d+$/.test(myDiscordID)) {
        return `<@${myDiscordID}>`; 
    } else {
        return "";
    }
}

function makeApiRequest(method, url, token, gameKey, data = null) {
    const baseHeader = {
        Cookie: token,
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "x-rpc-app_version": "2.34.1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "x-rpc-client_type": "4",
        Referer: "https://act.hoyolab.com/",
        Origin: "https://act.hoyolab.com"
    };
    const headers = { ...baseHeader };
    if (gameDetails[gameKey]) {
        headers["x-rpc-signgame"] = gameDetails[gameKey].key;
    }
    const params = {
        method: method.toLowerCase(),
        headers: headers,
        muteHttpExceptions: true,
        validateHttpsCertificates: true,
    };
    if (method.toUpperCase() === 'POST' && data) {
        params.payload = JSON.stringify(data);
        params.contentType = 'application/json';
    }
    try {
        const response = UrlFetchApp.fetch(url, params);
        const responseCode = response.getResponseCode();
        const responseBody = response.getContentText();
        if (responseCode >= 200 && responseCode < 300) {
            try {
                return JSON.parse(responseBody);
            } catch (parseError) {
                console.error(`[${gameKey}] Error parsing JSON response from ${url}: ${parseError.message}. Response body: ${responseBody}`);
                throw new Error(`Failed to parse JSON response for ${gameKey} at ${url}.`);
            }
        } else {
            console.error(`[${gameKey}] Error requesting ${url}: HTTP ${responseCode}. Response: ${responseBody}`);
            let errorMessage = responseBody;
            try {
                const errorData = JSON.parse(responseBody);
                errorMessage = errorData.message || JSON.stringify(errorData);
            } catch (e) { /* Keep raw body if not JSON */ }
            throw new Error(`API request failed for ${gameKey} at ${url} (HTTP ${responseCode}): ${errorMessage}`);
        }
    } catch (error) {
        console.error(`[${gameKey}] Exception during UrlFetchApp for ${url}:`, error.message);
        if (!error.message.startsWith('API request failed') && !error.message.startsWith('Failed to parse')) {
            throw new Error(`Network or processing error for ${gameKey} at ${url}: ${error.message}`);
        } else {
            throw error;
        }
    }
}

function getCheckInData(gameKey, token, customUid) {
    const endpoints = gameEndpoints[gameKey];
    const details = gameDetails[gameKey];
    let signResult, infoResult, homeResult;
    let checkInStatus = "Unknown Status";
    let totalSignDay = 0;
    let uid = customUid || "N/A";
    let isSign = false;
    let todayReward = { name: "N/A", cnt: 0, icon: "" };
    let captchaRisk = false;
    let errorMessage = null;
    let specificApiMessage = null; // *** เพิ่ม: ตัวแปรเก็บข้อความตรงจาก API ***

    try {
        // 1. Attempt Sign-in
        try {
            signResult = makeApiRequest('POST', endpoints.sign, token, gameKey, {});
            specificApiMessage = signResult.message || "No message in sign response";
            checkInStatus = specificApiMessage; 

            if (signResult.data && (signResult.data.gt || signResult.data.risk_code || signResult.data.is_risk)) {
                captchaRisk = true;
                checkInStatus = "CAPTCHA Risk Detected";
                console.warn(`[${gameKey}] CAPTCHA detected during sign-in. Response: ${JSON.stringify(signResult)}`);
                throw new Error(checkInStatus); 
            }

            if (signResult.retcode === 0) {
                checkInStatus = "OK";
            } else if (signResult.retcode === -5003) {
                isSign = true;
            } else {
                console.warn(`[${gameKey}] Sign-in issue: ${checkInStatus} (retcode: ${signResult.retcode})`);
                errorMessage = `Sign-in failed: ${checkInStatus}`;
            }

        } catch (signError) {
            console.error(`[${gameKey}] Sign-in request failed: ${signError.message}`);
            if (!captchaRisk) {
                errorMessage = `Sign-in request error: ${signError.message}`;
                checkInStatus = errorMessage;
            }
            if (captchaRisk) throw signError;
        }

        // 2. Get Info
        try {
            infoResult = makeApiRequest('GET', endpoints.info, token, gameKey);
            if (infoResult && infoResult.data) {
                const infoIsSign = infoResult.data.is_sign || false;
                totalSignDay = infoResult.data.total_sign_day || 0;

                if (infoIsSign) {
                    isSign = true; 
                    if (signResult?.retcode === 0 && checkInStatus === "OK") {
                        checkInStatus = "Check-in Successful";
                        totalSignDay = (infoResult.data.total_sign_day || 0) + 1;
                        errorMessage = null; 
                    } else if (signResult?.retcode === -5003) {
                        checkInStatus = specificApiMessage;
                        errorMessage = null;
                    } else {
                        checkInStatus = specificApiMessage || "Already checked in";
                        errorMessage = null;
                    }
                } else {
                    isSign = false;
                    if (errorMessage) {
                        checkInStatus = errorMessage;
                    } else {
                        checkInStatus = "Not checked in";
                    }
                }

                if (typeof totalSignDay !== 'number' || totalSignDay < 0) {
                    console.warn(`[${gameKey}] Invalid totalSignDay received: ${totalSignDay}. Setting to 0.`);
                    totalSignDay = 0;
                }
            } else {
                console.warn(`[${gameKey}] Info data not found/invalid. Response: ${JSON.stringify(infoResult)}`);
                totalSignDay = 0; isSign = false;
                if (!errorMessage) errorMessage = "Failed to retrieve check-in info.";
                checkInStatus = errorMessage;
            }
        } catch (infoError) {
            console.error(`[${gameKey}] Failed to get info data: ${infoError.message}`);
            if (!errorMessage) errorMessage = `Failed to retrieve info: ${infoError.message}`;
            checkInStatus = errorMessage;
            totalSignDay = 0; isSign = false;
        }


        // 3. Get Home/Awards 
        if (isSign && totalSignDay > 0) {
            try {
                homeResult = makeApiRequest('GET', endpoints.home, token, gameKey);
                if (homeResult && homeResult.data && homeResult.data.awards && homeResult.data.awards.length >= totalSignDay) {
                    const rewardIndex = totalSignDay - 1;
                    const rawReward = homeResult.data.awards[rewardIndex];
                    if (rawReward) {
                        todayReward = {
                            name: rawReward.name || "N/A",
                            cnt: rawReward.cnt || 0,
                            icon: rawReward.icon || ""
                        };
                    } else {
                        console.warn(`[${gameKey}] Reward data for day ${totalSignDay} missing/invalid.`);
                    }
                } else {
                    console.warn(`[${gameKey}] Awards data not found/insufficient/invalid. Resp: ${JSON.stringify(homeResult)}`);
                }
            } catch (homeError) {
                console.error(`[${gameKey}] Failed to get home/awards data: ${homeError.message}`);
            }
        } else if (totalSignDay === 0 && isSign) {
            console.log(`[${gameKey}] Signed in but total days is 0.`);
        } else if (!isSign) {
            console.log(`[${gameKey}] Not signed in, skipping reward fetch.`);
        }

        // --- Final Return Object ---
        const success = !captchaRisk && !errorMessage && (checkInStatus === "Check-in Successful" || signResult?.retcode === -5003);
        let finalStatusMessage = captchaRisk ? "CAPTCHA - Manual Check-in Required" : checkInStatus;

        return {
            gameName: details.name,
            color: details.color,
            itemName: todayReward.name,
            itemCount: todayReward.cnt,
            itemIcon: todayReward.icon || "",
            statusMessage: finalStatusMessage,
            totalDays: totalSignDay > 0 && isSign ? totalSignDay : (infoResult?.data?.total_sign_day || 0),
            uid: uid,
            success: success,
            error: captchaRisk ? "CAPTCHA" : errorMessage,
            requiresRetry: captchaRisk,
            checkinUrl: details.checkinUrl
        };

    } catch (error) { // จับ error ที่ถูก throw มา (เช่น CAPTCHA) หรือ error ร้ายแรงอื่นๆ
        console.error(`[${gameKey}] Critical error during check-in process: ${error.message}`);
        return {
            gameName: details.name, color: details.color, itemName: "N/A", itemCount: 0, itemIcon: "",
            statusMessage: `Error: ${error.message}`, totalDays: 0, uid: uid,
            success: false, error: error.message,
            requiresRetry: error.message.includes("CAPTCHA"),
            checkinUrl: details.checkinUrl
        };
    }
}

function processProfile(profile) { 
    const profileIdentifier = profile.customUids?.Genshin || profile.customUids?.Star_Rail || profile.customUids?.ZZZ || profile.customUids?.Honkai_3 || profile.token.substring(0, 25) + "...";
    Logger.log(`\nProcessing account of discord user id : https://discord.com/users/${myDiscordID}`)
    console.log()
    const finalGameResults = [];
    const gameKeys = Object.keys(gameEndpoints);
    let profileRequiresRetry = false;
    const customUids = profile.customUids || {};

    for (const gameKey of gameKeys) {
        const gameConfigKey = gameDetails[gameKey]?.key;
        if (gameConfigKey && profile[gameConfigKey]) {
            const specificCustomUid = customUids[gameKey]; // ดึง UID เฉพาะเกมนั้นๆ
            try {
                // --- เช็คอินครั้งที่ 1 (รันเพื่อ Trigger เท่านั้น) ---
                let firstResult = getCheckInData(gameKey, profile.token, specificCustomUid);

                Utilities.sleep(1000); // รอ 1 วินาที (ใช้ Utilities.sleep)

                // --- เช็คอินครั้งที่ 2 (สำหรับส่ง Discord) ---
                Logger.log(`- [Notification] Logging in for ${gameDetails[gameKey].name}...`);
                let secondResult = getCheckInData(gameKey, profile.token, specificCustomUid);
                finalGameResults.push(secondResult);

                // ตรวจสอบว่า 'ครั้งที่สอง' ติด CAPTCHA หรือไม่
                if (secondResult.requiresRetry) {
                    profileRequiresRetry = true;
                    Logger.log(`  - [Attempt 2] ${gameKey} ติด CAPTCHA ในครั้งที่สอง. โปรไฟล์นี้จะถูก Retry.`);
                }

            } catch (error) {
                 // กรณีเกิด Error ร้ายแรงระหว่างประมวลผลเกมนี้
                 Logger.log(`  - [Critical Error] Processing ${gameKey} failed: ${error.message}`);
                 finalGameResults.push({
                     gameName: gameDetails[gameKey]?.name || gameKey,
                     color: 0xFF0000, itemName: "N/A", itemCount: 0, itemIcon: "",
                     statusMessage: `Critical Error: ${error.message}`, totalDays: 0, uid: specificCustomUid || "N/A",
                     success: false, error: error.message, requiresRetry: false,
                     checkinUrl: gameDetails[gameKey]?.checkinUrl || "N/A"
                 });
                 // ดำเนินการเช็คเกมถัดไป แม้เกมนี้จะ Error
                 continue;
            }
        } else if (gameConfigKey && !profile[gameConfigKey]) {
             // Logger.log(`- Skipping ${gameDetails[gameKey].name} (disabled).`); 
        }
    }

    return {
        gameResults: finalGameResults,
        requiresRetry: profileRequiresRetry
    };
}



// --- Function to create Discord Embed ---
function createDiscordEmbed(gameResult) {

    // console.log(`[DEBUG][${gameResult.gameName}] Data for Embed:`, JSON.stringify(gameResult, null, 2));

    const embed = {
        color: gameResult.color || 0x7289DA, 
        footer: {
            text: `${gameResult.gameName} | UID: ${gameResult.uid || 'N/A'}`
        },
        timestamp: new Date().toISOString() // Add timestamp
    };

    if ((gameResult.success || gameResult.statusMessage.includes("Already checked in")) && gameResult.itemName && gameResult.itemName !== "N/A") {
        embed.title = `${gameResult.itemName} x${gameResult.itemCount || 1},`;
    }
    else if (gameResult.success || gameResult.statusMessage.includes("Already checked in")) {
        embed.title = `${gameResult.gameName} Check-In Status`;
        if (gameResult.itemName === "N/A" || !gameResult.itemName) {
            embed.title += " (Item N/A or Missing)";
        }
    }
    // If CAPTCHA error
    else if (gameResult.requiresRetry) {
        embed.title = `${gameResult.gameName} - CAPTCHA Detected`;
    }
    else {
        if (gameResult.statusMessage.includes("Profile not found")) {
            embed.title = `${gameResult.gameName} - Profile Not Found`;
        } else if (gameResult.statusMessage.includes("Error:")) {
            embed.title = `${gameResult.gameName} - Check-In Error`;
        }
        else {
            embed.title = `${gameResult.gameName} - Check-In Failed`;
        }
        if (gameResult.itemName === "N/A" || !gameResult.itemName) {
            embed.title += " (Item N/A or Missing)";
        }
    }


    // --- Set Thumbnail ---
    if (gameResult.itemIcon && typeof gameResult.itemIcon === 'string' && gameResult.itemIcon.startsWith('http') && (gameResult.success || gameResult.statusMessage.includes("Already checked in"))) {
        embed.thumbnail = { url: gameResult.itemIcon };
    }
    embed.fields = [];

    // Field 1: User logged in mention
    embed.fields.push({
        name: ``,
        value: `${discordPing()} ${logedin_text}`,
        inline: false
    });

    // Field 2: Status Message
    embed.fields.push({
        name: "",
        value: `[${gameResult.statusMessage}](${gameResult.checkinUrl})`,
        inline: false
    });

    // Field 3: Total Claimed 
    embed.fields.push({
        name: "", 
        value: `${totalclaim_text_1} **${gameResult.totalDays === undefined ? 0 : gameResult.totalDays}** ${totalclaim_text_2} `,
        inline: false
    });

    return embed;
}


function postWebhook(allProfileResults, discordWebhookUrl, discordNotify) {
    if (!discordNotify || !discordWebhookUrl || !discordWebhookUrl.startsWith("http")) {
        console.log("Discord notification disabled or webhook URL is invalid/missing.");
        return;
    }
    const allEmbeds = [];
    for (const profileResult of allProfileResults) {
        for (const gameResult of profileResult.gameResults) {
            if (gameResult) {
                allEmbeds.push(createDiscordEmbed(gameResult));
            }
        }
    }
    if (allEmbeds.length === 0) {
        console.log("No valid game results to send to Discord.");
        return;
    }
    const chunks = [];
    for (let i = 0; i < allEmbeds.length; i += 10) {
        chunks.push(allEmbeds.slice(i, i + 10));
    }
    console.log(`\n[DiscordWebhooks] Sending ${allEmbeds.length} embeds to Discord in ${chunks.length} message(s)...`);
    for (const [index, chunk] of chunks.entries()) {
        const payload = {
            username: webhooks_username,
            avatar_url: webhooks_avatar_url,
            embeds: chunk
        };
        try {
            const params = {
                method: 'post',
                contentType: 'application/json',
                payload: JSON.stringify(payload),
                muteHttpExceptions: true,
                headers: { 'Content-Type': 'application/json' }
            };
            const response = UrlFetchApp.fetch(discordWebhookUrl, params);
            const responseCode = response.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {

                //console.log(`- Sent chunk ${index + 1}/${chunks.length} (${chunk.length} embeds) to Discord.`);

            } else {
                console.error(`- Error sending Discord notification chunk ${index + 1}: HTTP ${responseCode} - ${response.getContentText()}`);
            }
        } catch (error) {
            console.error(`- Exception sending Discord notification chunk ${index + 1}:`, error.message);
        }
        if (chunks.length > 1 && index < chunks.length - 1) {
            Utilities.sleep(1100);
        }
    }
}

// --- Main function to run the script ---
function main() {
    Utilities.sleep(1000);console.log();
    console.log("Starting RIMURU GIVES YOU THE PRIMOGEM Script");
    console.log("Developer by Nattapat2871 https://github.com/Nattapat2871/Rimuru-gives-you-the-primogems");
    Utilities.sleep(2000); console.log();
    console.log("Starting auto log in process...");
    let attempts = 0;
    const maxAttempts = 3;
    let profilesToProcess = [...profiles];
    const allResultsAcrossAttempts = [];

    while (attempts < maxAttempts && profilesToProcess.length > 0) {
        attempts++;
        if (attempts > 1) {
            console.log(`\n--- Retry Attempt ${attempts}/${maxAttempts} for profiles with CAPTCHA ---`);
            const retryDelay = 3600000; // 1 hour
            console.log(`Sleeping for ${retryDelay / 1000 / 60} minutes...`);
            Utilities.sleep(retryDelay);
            console.log("Retrying...");
        }
        const nextRetryProfiles = [];
        for (let i = 0; i < profilesToProcess.length; i++) {
            const currentProfile = profilesToProcess[i];
            let profileResult;
            try {
                profileResult = processProfile(currentProfile);
                if (profileResult.requiresRetry) {
                    console.log(`Profile ${currentProfile.token.substring(0, 20)}... marked for retry.`);
                    nextRetryProfiles.push(currentProfile);
                    allResultsAcrossAttempts.push(profileResult);
                } else {
                    console.log()
                    console.log(`Account of https://discord.com/users/${myDiscordID} processed.`);
                    allResultsAcrossAttempts.push(profileResult);
                }
            } catch (error) {
                console.error(`Critical error processing profile ${currentProfile.token.substring(0, 20)}...:`, error.message, error.stack);
                const errorResult = { /* ... create error result object ... */ }; 
                allResultsAcrossAttempts.push(errorResult);
            }
        }
        profilesToProcess = nextRetryProfiles;
        if (profilesToProcess.length === 0) {
            // console.log("No more profiles require retries.");
            break;
        }
        if (attempts >= maxAttempts && profilesToProcess.length > 0) {
            console.log(`\nReached max retry attempts (${maxAttempts}). Reporting final status for remaining ${profilesToProcess.length} profiles.`);
            profilesToProcess.forEach(profile => {
                try {
                    const finalResult = processProfile(profile);
                    allResultsAcrossAttempts.push(finalResult);
                } catch (e) { /* handle error */ }
            });
        }
    }
    postWebhook(allResultsAcrossAttempts, discordWebhook, discord_notify);
    console.log("\nLogged in process completed.");
}


