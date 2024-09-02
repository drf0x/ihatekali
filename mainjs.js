function onMenuClick() {
    var navbar = document.getElementById("navigation-bar");
    var responsive_class_name = "responsive";

    navbar.classList.toggle(responsive_class_name);
}

document.addEventListener("DOMContentLoaded", function (event) {
    type();
    movingBackgroundImage();
})

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap {}";
    document.body.appendChild(css);
};



// Coutdown CSS


var countDownDate = new Date("Aug 23, 2024 18:00:00").getTime();
                  
                  
var x = setInterval(function() {


  var now = new Date().getTime();


  var distance = countDownDate - now;


  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);


  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "Out";
  }
}, 1000);


// Audio Function JavaScript


document.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelectorAll('.audio-player');

    players.forEach(player => {
        const audio = player.querySelector('.audio');
        const playPauseBtn = player.querySelector('.playPauseBtn');
        const seekBar = player.querySelector('.seekBar');
        const volumeControl = player.querySelector('.volumeControl');
        const currentTimeElem = player.querySelector('.current-time');
        const durationElem = player.querySelector('.duration');

        // Format time
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }

        // Play/Pause Button
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseBtn.textContent = 'Pause';
            } else {
                audio.pause();
                playPauseBtn.textContent = 'Play';
            }
        });

        // Update Seek Bar and Time Display
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            seekBar.value = progress;
            currentTimeElem.textContent = formatTime(audio.currentTime);
        });

        // Update Duration
        audio.addEventListener('loadedmetadata', () => {
            durationElem.textContent = formatTime(audio.duration);
        });

        // Seek Bar Change
        seekBar.addEventListener('input', () => {
            const seekTime = (seekBar.value / 100) * audio.duration;
            audio.currentTime = seekTime;
        });

        // Volume Control
        volumeControl.addEventListener('input', () => {
            audio.volume = volumeControl.value / 100;
        });

        // Initialize volume control
        volumeControl.value = audio.volume * 100;
    });
});