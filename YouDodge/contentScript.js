(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideoId = "";
    const salt = "?can=cel";

    chrome.runtime.onMessage.addListener(async (obj, sender, response) => {
        const { type, value, videoId } = obj;

        // Whenever a new video is loaded, we replace it with our own minus the ads
        if (type === "NEW_V") {
            currentVideoId = videoId;
            await replaceVideo();
        }
    });

    const replaceVideo = async () => {
        const data = await getVideoData();

        console.log("Playability status: " + data.playabilityStatus.status);

        // TODO
        const youtubePlayer = document.querySelector('.html5-video-player video');
        // const youtubePlayer = document.getElementsByClassName('video-stream html5-main-video');
        if (youtubePlayer) {
            youtubePlayer.parentElement.remove();
            // youtubePlayer.src = '';
            // youtubePlayer.removeAttribute('src');
        }
        else {
            console.log('YouTube player not found.')
        }
    }

    const getVideoData = () => {
        const data = fetch('https://www.youtube.com/youtubei/v1/player?key=AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w', {
            method: 'POST',
            headers: {
                "User-Agent": "com.google.ios.youtube/19.29.1 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X)"
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
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
        return data;
    }
})();
