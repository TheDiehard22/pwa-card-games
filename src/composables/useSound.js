import { ref } from "@vue/composition-api";

export function useSound() {
  const audioContext = new AudioContext();
  const sounds = {
    correct: ["audio/ha-got-eeem.mp3"],
    wrong: ["audio/hitmarker_2.mp3"]
  };
  let source = ref(null);

  function getSound(isCorrect) {
    const soundToPlay = isCorrect ? sounds.correct[0] : sounds.wrong[0];
    let request = new XMLHttpRequest();
    source.value = audioContext.createBufferSource();

    request.open("GET", soundToPlay, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      let audioData = request.response;

      audioContext.decodeAudioData(
        audioData,
        buffer => {
          source.value.buffer = buffer;
          source.value.connect(audioContext.destination);
          source.value.loop = false;
        },
        err => console.log("Error with decoding audio data" + err.err)
      );
    };

    request.send();
  }

  function play(isCorrect) {
    getSound(isCorrect);
    console.log(source.value);
    source.value.start();
  }

  return {
    play
  };
}
