(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideoId = "";

    chrome.runtime.onMessage.addListener(async (obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW_V") {
            currentVideoId = videoId;
            await newVideoLoaded();
            console.log("Listened successfully!");
            // newVideoLoaded();
        }
    });

    const newVideoLoaded = async () => {
        // const injectedVideoExists = document.getElementsByClassName("inj-vid")[0];

        // if (!injectedVideoExists) {
        //     // Disable youtube video and inject video over it
            
        //     // const injVid = 
        // }

        console.log(currentVideoId);

        // const headers = new Headers();
        // headers.append("User-Agent", "com.google.android.youtube/19.32.34 (Linux; U; Android 12; US) gzip");

        // const response = await fetch('https://www.youtube.com/youtubei/v1/player?
        const response = await fetch('https://www.youtube.com/youtubei/v1/player?key=AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w', {
            method: 'POST',
            headers: {
                "User-Agent": "com.google.ios.youtube/19.29.1 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X)",
                // "Content-Type": "application/json",
                // "Accept-Encoding": "gzip, deflate",
                // "x-goog-api-format-version": "2",
                // "X-YouTube-Client-Version": "19.32.34", // Example of additional header
                // "X-YouTube-Client-Name": "3", // Sometimes needed for YouTube
            },
            body: JSON.stringify({
                "videoId": currentVideoId,
                "contentCheckOk": true,
                "context": {
                    "client": {
                        "clientName": "IOS",
                        "clientVersion": "19.29.1",
                        "deviceMake": "Apple",
                        "deviceModel": "iPhone16,2",
                        "hl": "en",
                        "osName": "iPhone",
                        "osVersion": "17.5.1.21F90",
                        "timeZone": "UTC",
                        "userAgent": "com.google.ios.youtube/19.29.1 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X;)",
                        "gl": "US",
                        "utcOffsetMinutes": 0
                    }
                }

                // "context": {
                //     "client": {
                //         "clientName": "ANDROID_TESTSUITE",
                //         "clientVersion": "1.9",
                //         "androidSdkVersion": 30,
                //         "hl": "en",
                //         "gl": "US",
                //         "utcOffsetMinutes": 0
                //     }
                // }
                // "context": {
                //     "client": {
                //         "clientName": "ANDROID",
                //         "clientVersion": "19.32.34",
                //         "androidSdkVersion": 31,
                //         "hl": "en",
                //         "gl": "US",
                //         "utcOffsetMinutes": 0,
                //         // "osName": "Android",
                //         // "osVersion": "12",
                //         // "platform": "MOBILE"
                //     }
                // }
            }),
        });
        const data = await response.json();
        // const data = response.json();
        console.log(data);

        const youtubePlayer = document.querySelector('.html5-video-player video');
        if (youtubePlayer) {

        }
        else {
            console.log('YouTube player not found.')
        }
    }
})();
