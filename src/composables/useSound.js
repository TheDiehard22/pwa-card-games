export function useSound() {
  const audioContext = new AudioContext();
  const sounds = {
    correct: ["audio/wow-mlg-sound-effect.mp3"],
    wrong: ["audio/hitmarker_2.mp3"]
  };
  let source;
  let buffers = {
    correct: null,
    wrong: null
  };

  function loadSound(isCorrect) {
    console.log("getsound trigger");
    const soundToPlay = isCorrect ? sounds.correct[0] : sounds.wrong[0];
    let request = new XMLHttpRequest();
    source = audioContext.createBufferSource();

    request.open("GET", soundToPlay, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      let audioData = request.response;

      audioContext
        .decodeAudioData(audioData)
        .then(buffer => {
          source.buffer = buffer;
          source.connect(audioContext.destination);

          // remembers buffer for next playbacks
          if (!buffers[isCorrect ? "correct" : "wrong"]) {
            buffers[isCorrect ? "correct" : "wrong"] = source.buffer;
          }
        })
        .catch(err => console.log("Error with decoding audio data" + err.err));
    };

    request.send();
  }

  function loadSoundFromExistingBuffer(isCorrect) {
    console.log("loading existing sound buffer.");
    source = audioContext.createBufferSource();
    source.buffer = buffers[isCorrect ? "correct" : "wrong"];
    source.connect(audioContext.destination);
  }

  function play(isCorrect) {
    buffers[isCorrect ? "correct" : "wrong"]
      ? loadSoundFromExistingBuffer(isCorrect)
      : loadSound(isCorrect);

    source.start();
  }

  return {
    play
  };
}
