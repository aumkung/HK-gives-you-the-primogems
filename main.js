
//   #   #    ###   #####  #####   ###   ####    ###   #####   ###    ###   ######    #
//   ##  #   #   #    #      #    #   #  #   #  #   #    #    #   #  #   #       #   ##
//   # # #   #####    #      #    #####  ####   #####    #      #     ###       #     #
//   #  ##   #   #    #      #    #   #  #      #   #    #     #     #   #     #      #
//   #   #   #   #    #      #    #   #  #      #   #    #    #####   ###     #     #####  
//   https://github.com/Nattapat2871


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

        // --- Enter your UID  (API cant to retrieve player UID.) ---
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
        // Español (Spanish): lang=es-es
        // Français (French): lang=fr-fr
        // Italiano (Italian): it-it
        // Português (Portuguese): pt-pt
        // Русский язык (Russian language): lang=ru-ru
        // ภาษาไทย (Thai language): th-th
        // Türkçe (Turkish): tr-tr
        // Tiếng Việt (Vietnamese): vi-vn

        lang: 'en-us' // <--- Enter the desired language.
    },
];

/** Discord Notification **/
const discord_notify = true; // Set to true to enable Discord notifications.
const myDiscordID = ""; // <---  Enter Your Discord User ID 
const discordWebhook = "https://canary.discord.com/api/webhooks/"; // <--- Enter Your Webhooks URL
const webhooks_username = "ʀɪᴍᴜʀᴜ ɢɪᴠᴇꜱ ʏᴏᴜ ᴛʜᴇ ᴘʀɪᴍᴏɢᴇᴍ"  // <--- Enter Webhooks Username
const webhooks_avatar_url = "https://cdn.discordapp.com/attachments/1276433865375879199/1277718573439127572/image.png?ex=66ce2fa6&is=66ccde26&hm=0e32ea05e2b673c64ae1bfc310bd5e045875a6d5798c768c18f877929922540a&"  // <--- Enter Avatar URL link

/** Notification message in Embeds*/
const logedin_text = "has logged in!"
const totalclaim_text_1 = "Total Claimed"
const totalclaim_text_2 = "days this month"






/**  this script made by Nattapat2871    **/
/**  After this line is the script code. Please DO NOT modify. **/
/**  This Script code is .js  */

const axios = require('axios');

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


// Helper function to pause execution
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function for Discord mention tag
function discordPing() {
    if (myDiscordID && /^\d+$/.test(myDiscordID)) {
        return `<@${myDiscordID}>`;
    } else {
        return "";
    }
}

// --- Function to make API requests ---
async function makeApiRequest(method, url, token, gameKey, data = null) {
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

    try {
        let response;
        if (method.toUpperCase() === 'POST') {
            response = await axios.post(url, data, { headers, timeout: 10000 });
        } else {
            response = await axios.get(url, { headers, timeout: 10000 });
        }
        return response.data;
    } catch (error) {
        console.error(`[${gameKey}] Error requesting ${url}:`, error.response ? error.response.data : error.message);
        const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
        throw new Error(`API request failed for ${gameKey} at ${url}: ${errorMessage}`);
    }
}

// --- Function to get check-in data  ---
async function getCheckInData(gameKey, token, customUid) {
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

    try {
        // 1. Attempt Sign-in
        try {
            signResult = await makeApiRequest('POST', endpoints.sign, token, gameKey);
            checkInStatus = signResult.message || "No message in sign response";
            if (signResult.data?.gt_result?.is_risk) {
                captchaRisk = true;
                checkInStatus = "CAPTCHA Risk Detected";
                throw new Error(checkInStatus);
            }
            if (signResult.retcode !== 0 && !checkInStatus.includes("Already checked in")) {

                //console.warn(`[${gameKey}] Sign-in message: ${checkInStatus} (retcode: ${signResult.retcode})`);

            }
        } catch (signError) {
            console.error(`[${gameKey}] Critical sign-in error: ${signError.message}`);
            throw signError;
        }

        // 2. Get Info
        try {
            infoResult = await makeApiRequest('GET', endpoints.info, token, gameKey);

            // console.log(`[${gameKey}] RAW Home Result Data:`, JSON.stringify(homeResult?.data, null, 2));

            if (infoResult && infoResult.data) {
                totalSignDay = infoResult.data.total_sign_day || 0;
                isSign = infoResult.data.is_sign || false;

                if (isSign && checkInStatus === "OK") {
                    checkInStatus = "Already checked in (verified by info)";
                }
                if (typeof totalSignDay !== 'number' || totalSignDay < 0) {
                    console.warn(`[${gameKey}] Invalid totalSignDay received: ${totalSignDay}. Setting to 0.`);
                    totalSignDay = 0;
                }
            } else {
                console.warn(`[${gameKey}] Info data not found in response. totalSignDay will be 0.`);
                totalSignDay = 0;
            }
        } catch (infoError) {
            console.error(`[${gameKey}] Failed to get info data: ${infoError.message}. totalSignDay will be 0.`);
            errorMessage = `Failed to retrieve info: ${infoError.message}`;
            totalSignDay = 0;
        }

        // 3. Get Home/Awards
        if (totalSignDay > 0) {
            try {
                homeResult = await makeApiRequest('GET', endpoints.home, token, gameKey);

                //console.log(`[${gameKey}] RAW Home Result Data:`, JSON.stringify(homeResult?.data, null, 2));

                if (homeResult && homeResult.data && homeResult.data.awards && homeResult.data.awards.length >= totalSignDay) {
                    const rewardIndex = totalSignDay - 1;
                    const rawReward = homeResult.data.awards[rewardIndex];

                    todayReward = {
                        name: rawReward?.name || "N/A",
                        cnt: rawReward?.cnt || 0,
                        icon: rawReward?.icon || ""
                    };

                   // console.log(`[${gameKey}] Extracted Today's Reward Object (Index ${rewardIndex}):`, JSON.stringify(todayReward, null, 2));

                } else {
                    console.warn(`[${gameKey}] Awards data not found or insufficient for day ${totalSignDay}.`);
                    if (!errorMessage) errorMessage = "Failed to retrieve reward details.";
                }
            } catch (homeError) {
                console.error(`[${gameKey}] Failed to get home/awards data: ${homeError.message}`);
                if (!errorMessage) errorMessage = `Failed to retrieve rewards: ${homeError.message}`;
            }
        } else {
            console.log(`[${gameKey}] Total sign-in days is 0, cannot determine today's reward.`);

            if (!errorMessage && infoResult) {
            }
        }

        // Return structured result
        return {
            gameName: details.name,
            color: details.color,
            itemName: todayReward.name,
            itemCount: todayReward.cnt,
            itemIcon: todayReward.icon || "",
            statusMessage: checkInStatus,
            totalDays: totalSignDay,
            uid: uid,
            success: !captchaRisk && (checkInStatus === "OK" || checkInStatus.includes("Already checked in")),
            error: captchaRisk ? checkInStatus : errorMessage,
            requiresRetry: captchaRisk,
            checkinUrl: details.checkinUrl
        };

    } catch (error) {
        return {
            gameName: details.name, color: details.color, itemName: "N/A", itemCount: 0, itemIcon: "",
            statusMessage: `Error: ${error.message}`, totalDays: 0, uid: uid,
            success: false, error: error.message, requiresRetry: error.message.includes("CAPTCHA"), checkinUrl: details.checkinUrl
        };
    }
}

// --- Function to process one profile ---
async function processProfile(profile) {
    const profileIdentifier = profile.customUids?.Genshin || profile.customUids?.Star_Rail || profile.customUids?.ZZZ || profile.customUids?.Honkai_3 || profile.token.substring(0, 25) + "...";
    console.log(`\nProcessing account of discord user id : https://discord.com/users/${myDiscordID}`);
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
                let firstResult = await getCheckInData(gameKey, profile.token, specificCustomUid);
                
                await sleep(1); // รอ 1 วินาที

                // --- เช็คอินครั้งที่ 2 (สำหรับส่ง Discord) ---
                console.log(`- [Notification] Logging in for ${gameDetails[gameKey].name}...`);
                let secondResult = await getCheckInData(gameKey, profile.token, specificCustomUid);
                finalGameResults.push(secondResult);

                // ตรวจสอบว่า 'ครั้งที่สอง' ติด CAPTCHA หรือไม่
                if (secondResult.requiresRetry) {
                    profileRequiresRetry = true;
                    console.log(`  - [Attempt 2] ${gameKey} ติด CAPTCHA ในครั้งที่สอง. โปรไฟล์นี้จะถูก Retry.`);
                }

            } catch (error) {
                 // กรณีเกิด Error ร้ายแรงระหว่างประมวลผลเกมนี้
                 console.error(`  - [Critical Error] Processing ${gameKey} failed: ${error.message}`);
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
        }
    }

    return {
        gameResults: finalGameResults,
        requiresRetry: profileRequiresRetry
    };
}

// --- Function to create Discord Embed ---
function createDiscordEmbed(gameResult) {

    // console.log(`[DEBUG][${gameResult.gameName}] Data received by createDiscordEmbed:`, JSON.stringify(gameResult, null, 2));

    const embed = {
        color: gameResult.color || 0x7289DA,
        footer: {
            text: `${gameResult.gameName} | UID: ${gameResult.uid} `,
        },
        timestamp: new Date().toISOString(),        
    };
    
    if (gameResult.itemName && gameResult.itemName !== "N/A") {
        embed.title = `${gameResult.itemName} x${gameResult.itemCount},`;
    } else {
        embed.title = `${gameResult.gameName} Check-In Status (Item N/A or Missing)`;
    }

    if (gameResult.itemIcon && typeof gameResult.itemIcon === 'string' && gameResult.itemIcon.trim() !== "") {
        embed.thumbnail = { url: gameResult.itemIcon };
    } else {
        delete embed.thumbnail;
        if (embed.title.includes('x')) {
            embed.title += " (No Icon)";
        }
    }

    embed.fields = [];


    // Field 1: Account logged in 
    embed.fields.push({
        name: "",
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
        value: `${totalclaim_text_1} **${gameResult.totalDays}** ${totalclaim_text_2}`,
        inline: false
    });


    return embed;
}

// --- Function to post Embeds to Discord ---
async function postWebhook(allProfileResults, discordWebhookUrl, discordNotify) {
    if (!discordNotify || !discordWebhookUrl) {
        console.log("Discord notification disabled or webhook not set.");
        return;
    }

    const allEmbeds = [];
    for (const profileResult of allProfileResults) {
        for (const gameResult of profileResult.gameResults) {
            allEmbeds.push(createDiscordEmbed(gameResult));
        }
    }

    if (allEmbeds.length === 0) {
        console.log("No embeds to send to Discord.");
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
            await axios.post(discordWebhookUrl, payload, { headers: { 'Content-Type': 'application/json' }, timeout: 20000 });

            // console.log(`- Sent chunk ${index + 1}/${chunks.length} (${chunk.length} embeds) to Discord.`);

        } catch (error) {
            console.error(`- Error sending Discord notification chunk ${index + 1}:`, error.response ? JSON.stringify(error.response.data) : error.message);
        }
        if (chunks.length > 1 && index < chunks.length - 1) {
            await sleep(1000);
        }
    }
}

// --- Main function to run the script ---
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    await delay(1000);console.log();
    console.log("Starting RIMURU GIVES YOU THE PRIMOGEM Script");
    console.log("Developer by Nattapat2871 https://github.com/Nattapat2871/Rimuru-gives-you-the-primogems");
    await delay(2000); console.log();
    console.log("Starting auto log in process...");
    let attempts = 0;
    const maxAttempts = 3;
    let profilesToProcess = [...profiles];

    while (attempts < maxAttempts && profilesToProcess.length > 0) {
        attempts++;
        if (attempts > 1) {
            console.log(`\n--- Retry Attempt ${attempts}/${maxAttempts} for profiles with CAPTCHA ---`);
            const retryDelay = 3600000; // 1 hour
            console.log(`Sleeping for ${retryDelay / 1000 / 60} minutes...`);
            await sleep(retryDelay);
            console.log("Retrying...");
        }

        const currentRunResults = [];
        const nextRetryProfiles = [];

        const settledResults = await Promise.allSettled(profilesToProcess.map(p => processProfile(p)));

        settledResults.forEach((result, index) => {
            const originalProfile = profilesToProcess[index];
            if (result.status === 'fulfilled') {
                const profileResult = result.value;
                currentRunResults.push(profileResult);

                if (profileResult.requiresRetry) {
                    console.log(`Profile ${discordPing()} requires retry on next attempt.`);
                    nextRetryProfiles.push(originalProfile);
                } else {
                    console.log()
                    console.log(`Account of https://discord.com/users/${myDiscordID} processed.`);
                }
            } else {
                console.error(`Critical error processing profile ${discordPing()}:`, result.reason);
                currentRunResults.push({
                    gameResults: [{
                        gameName: "System Error", color: 0xFF0000, itemName: "N/A", itemCount: 0, itemIcon: "",
                        statusMessage: `Error: Profile processing failed critically - ${result.reason?.message || result.reason}`,
                        totalDays: 0, uid: "N/A",
                        success: false, error: result.reason?.message || result.reason, requiresRetry: false
                    }],
                    requiresRetry: false
                });
            }
        });

        await postWebhook(currentRunResults, discordWebhook, discord_notify);

        profilesToProcess = nextRetryProfiles;
        if (profilesToProcess.length === 0) {
            break;
        }
        if (attempts >= maxAttempts) {
            console.log(`\nReached max retry attempts (${maxAttempts}). Any remaining profiles with CAPTCHA issues will not be retried further.`);
        }
    }
    console.log("\nLogged in process completed.");
}

main().catch(error => {
    console.error("An unexpected critical error occurred in the main function:", error);
    if (discord_notify && discordWebhook) {
        const errorPayload = {
            username: webhooks_username,
            avatar_url: "https://imgur.com/a/WOSDAY1",
            content: `${discordPing()} A critical error occurred running the check-in script!`,
            embeds: [{
                title: "Script Execution Error",
                description: `\`\`\`${error.stack || error.message}\`\`\``,
                color: 0xFF0000,
                timestamp: new Date().toISOString()
            }]
        };
        axios.post(discordWebhook, errorPayload, { headers: { 'Content-Type': 'application/json' }, timeout: 10000 })
            .catch(discordError => console.error("Failed to send critical error notification to Discord:", discordError.message));
    }
});