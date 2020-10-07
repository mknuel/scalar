/* esversion: 6 */

//smooth scrolling function
function smoothScrolling(target, duration = 1000) {
    var id;
    target = document.querySelector(target);
    let targetPosition = target.getBoundingClientRect()['top'];
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null)
            startTime = currentTime;
        timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed > duration) {
            cancelAnimationFrame(id);
            return "done";
        }
        id = requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1)
            return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    id = requestAnimationFrame(animation);

}

let btn = document.querySelector('.button-scroll');

btn.addEventListener('click', () => {
    smoothScrolling('.water__text');

})
let tabPort = "(max-width: 56.25em)";
let tabLand = "(max-width: 75em)";
let phone = "(max-width: 37.5em)";
let bigDesktop = "(max-width: 112.5em)";

function removeVideo() {
    let parent = document.querySelector('.header');
    let bgvideo = document.querySelector('.bg-video');
    if (window.matchMedia(tabPort).matches) {
        parent.removeChild(bgvideo);
    } else {
        let el = parent.querySelector('.header__text');
        if (!parent.contains(bgvideo)) {

            let bgVideo = document.createElement('div');
            bgVideo.className = "bg-video";

            let video = document.createElement('video');
            video.autoplay = true;
            video.className = "bg-video__content";
            video.muted = true;
            video.loop = true;
            video.src = './images/table-water-video.mp4';
            bgVideo.appendChild(video);
            parent.insertBefore(bgVideo, el);

        }

    }
}

window.onresize = removeVideo;
removeVideo();