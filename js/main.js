$(document).ready(function() {
    var streamers = [
        "esl_sc2",
        "ogamingsc2",
        "cretetion",
        "freecodecamp",
        "storbeck",
        "habathcx",
        "robotcaleb",
        "noobs2ninjas",
        "brunofin",
        "comster404"
    ];

    streamers.forEach(streamer => getStreamer(streamer));
    $("#isOnline").click(() => {
        showStreamers('.online');
        hideStreamers('.offline');
    });
    $("#isOffline").click(() => {
        showStreamers('.offline');
        hideStreamers('.online');
    });
    $("#all").click(() => {
        showStreamers('.streamer');
    });
    $(".add").click(() => {
        let user = prompt("Enter the name of the streamer you want to add: ");
        streamers.push(user.toLowerCase());
        getStreamer(user);
    });
    $("#searchUser").keyup(() => {
        var searchValue = $("#searchUser").val().toLowerCase();
        streamers.forEach(streamer => {
            if (streamer.includes(searchValue)) {
                TweenMax.to($("." + streamer), 1.2, {
                    scale: 1,
                    opacity: 1,
                    display: 'block',
                    ease: Bounce.easeOut
                });
            } else {
                TweenMax.to($("." + streamer), 1.2, {
                    scale: 0,
                    opacity: 0,
                    display: 'none',
                    ease: Bounce.easeOut
                });
            }
        });
    });
});

function showStreamers(value) {
    TweenMax.staggerTo($(value), 1, {
        scale: 1,
        opacity: 1,
        display: 'block'
    }, 0.08);
}

function hideStreamers(value) {
    TweenMax.staggerTo($(value), 1, {
        scale: 0,
        opacity: 0,
        display: 'none'
    }, 0.08);
}

function getStreamer(streamer) {
    let onOff,
        status;
    let url = "https://wind-bow.gomix.me/twitch-api/streams/" + streamer + '?callback=?';
    let channel = "https://wind-bow.gomix.me/twitch-api/channels/" + streamer + '?callback=?';
    $.getJSON(url, data => {
        if (data.stream) {
            status = data.stream.channel.status;
            onOff = "online";
        } else if (data.stream === null) {
            status = "Offline";
            onOff = "offline";
        } else if (data.status === 404) {
            status = "Account Closed";
            onOff = "offline";
        }
        $.getJSON(channel, info => {
            let logo = info.logo
                ? info.logo
                : "https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif";
            let name = info.display_name
                ? info.display_name
                : streamer;
            status = onOff === "online"
                ? "<a href='" + info.url + "' target='_blank' class='status-online'>" + status + "</a>"
                : status;
            let profile = "<li class = 'row streamer list-group-item " + onOff + " " + name.toLowerCase() + "'><div class = 'col-md-4'><img src='" + logo + "' class = 'img-responsive rounded'><p>" + name + "</p></div><div class='col-md-8'>" + status + "</div></li>";
            $("#streamers").append(profile);
        });
    });
}
