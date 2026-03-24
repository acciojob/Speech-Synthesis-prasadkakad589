// Your script here.
const textInput = document.querySelector('[name="text"]');

// Set default text
msg.text = textInput.value;

// Populate voices dropdown
function populateVoices() {
  voices = speechSynthesis.getVoices();

  // Handle no voices case
  if (!voices.length) {
    voicesDropdown.innerHTML = '<option>No voices available</option>';
    return;
  }

  voicesDropdown.innerHTML = voices
    .map(
      (voice, i) =>
        `<option value="${i}">${voice.name} (${voice.lang})</option>`
    )
    .join('');
}

// Set selected voice
function setVoice() {
  const selectedIndex = this.value;
  msg.voice = voices[selectedIndex];
  restartSpeech();
}

// Restart speech when settings change
function restartSpeech() {
  speechSynthesis.cancel();
  if (textInput.value.trim() !== "") {
    speechSynthesis.speak(msg);
  }
}

// Speak function
function speak() {
  if (textInput.value.trim() === "") return; // prevent empty speech

  msg.text = textInput.value;
  speechSynthesis.cancel(); // stop previous speech
  speechSynthesis.speak(msg);
}

// Stop function
function stop() {
  speechSynthesis.cancel();
}

// Handle rate & pitch changes
function setOption() {
  msg[this.name] = this.value;
  restartSpeech();
}

// Event listeners 
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);

options.forEach(option => option.addEventListener('change', setOption));

speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);