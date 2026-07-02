type MusicController = {
  pause: () => void;
  resume: () => void;
};

let controller: MusicController | null = null;

export function registerMusicController(ctrl: MusicController) {
  controller = ctrl;
}

export function pauseBackgroundMusic() {
  if (controller) {
    controller.pause();
  }
}

export function resumeBackgroundMusic() {
  if (controller) {
    controller.resume();
  }
}