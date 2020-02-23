var oscillator = null;
var isPlaying = false;
var context = new AudioContext();
var volume = context.createGain();
function dec(decreaseTime) {
    volume.gain.exponentialRampToValueAtTime(0.00001,context.currentTime+decreaseTime)
}
function play(Lfreq, Lgain) {
    if (isPlaying) {
        oscillator.frequency.setValueAtTime(Lfreq, context.currentTime);
        volume.gain.value = Lgain;
    }
    else {
    volume.connect(context.destination);
    oscillator = context.createOscillator();
    oscillator.type = 'sine';
    if (isFinite(Lgain)) {
        volume.gain.setValueAtTime(Lgain, context.currentTime);
    }

    oscillator.frequency.value = Lfreq;
    oscillator.connect(volume);
    // volume.gain.value = Lgain;

    oscillator.start();
    // oscillator.stop(context.currentTime+2)
    isPlaying = true;
    }
    console.log(oscillator.frequency.value,volume.gain.value)
}

