import { getRandomIntInclusive } from "@/helpers/math";

export function useSound() {
  const audioCtx = window.AudioContext || window.webkitAudioContext;
  const audioContext = new audioCtx();
  const sounds = {
    correct: [
      { src: "audio/wow-mlg-sound-effect.mp3", buffer: null },
      { src: "audio/ha-got-eeem.mp3", buffer: null }
    ],
    wrong: [
      { src: "audio/hitmarker_2.mp3", buffer: null },
      { src: "audio/koekoek-jongen-koekoek-jonguh.mp3", buffer: null },
      { src: "audio/Nou-nee-PowNews-boosted.mp3", buffer: null }
    ]
  };
  let source;

  function loadSound(soundObj) {
    console.log("getsound trigger");
    let request = new XMLHttpRequest();
    source = audioContext.createBufferSource();

    request.open("GET", soundObj.src, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      let audioData = request.response;

      audioContext
        .decodeAudioData(audioData)
        .then(buffer => {
          source.buffer = buffer;
          source.connect(audioContext.destination);

          // remembers buffer for next playbacks
          if (!soundObj.buffer) {
            soundObj.buffer = source.buffer;
          }
        })
        .catch(err => console.log("Error with decoding audio data" + err.err));
    };

    request.send();
  }

  function loadSoundFromExistingBuffer(soundObj) {
    console.log("loading existing sound buffer.");
    source = audioContext.createBufferSource();
    source.buffer = soundObj.buffer;
    source.connect(audioContext.destination);
  }

  function play(isCorrect) {
    const currentArray = sounds[isCorrect ? "correct" : "wrong"];
    const randomNumber = getRandomIntInclusive(currentArray.length - 1);
    const selectedSoundObj = currentArray[randomNumber];

    // FIXME: Create a local state instead of passing values
    selectedSoundObj.buffer
      ? loadSoundFromExistingBuffer(selectedSoundObj)
      : loadSound(selectedSoundObj);

    source.start();
  }

  return {
    play
  };
}
