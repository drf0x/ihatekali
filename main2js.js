function checkPassword() {
    const correctPassword = '3';
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');

    if (passwordInput.value === correctPassword) {
        messageDiv.style.color = 'green';
        messageDiv.textContent = 'Well done, you can read source code.';
        messageDiv.style.display = 'block';
        passwordInput.classList.remove('shake'); // Remove shake effect if correct
        messageDiv.classList.add('hide-message'); // Start hide animation
        passwordInput.value = '';
            // Apply typing effect and then keep the message for 5 seconds
            messageDiv.classList.remove('hide-message');
            messageDiv.style.animation = 'typing 2s steps(30, end), blink-caret 1s step-end infinite';
            
            // After typing animation (1s), keep the message visible for 5 seconds, then hide it
            setTimeout(() => {
                messageDiv.style.animation = 'none'; // Stop the typing effect
                messageDiv.classList.add('hide-message'); // Start hide animation
            }, 3000); // 1s typing effect + 5s display = 6 seconds total

    } else {
        passwordInput.classList.add('shake'); // Add shake effect on wrong password

                    // Clear the input field immediately
                    passwordInput.value = '';
        // Remove the shake class after animation to allow future animations
        setTimeout(() => {
            passwordInput.classList.remove('shake');
        }, 500);
    }
}


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
    var elements = document.getElementsByClassName('typesoon');
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