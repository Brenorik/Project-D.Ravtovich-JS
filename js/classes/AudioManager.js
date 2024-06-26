class AudioManager {
  constructor() {
    this.backgroundMusic = new Audio('./audio/games.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3;

    this.menuMusic = new Audio('./audio/menu.mp3');
    this.menuMusic.loop = true;
    this.menuMusic.volume = 0.3;

    this.soundEffects = {
      jump: new Audio('./audio/Jump.mp3'),
      attack: new Audio('./audio/attack.mp3'),
      apple: new Audio('./audio/Apple.mp3'),
      gameOver: new Audio('./audio/GameOver.mp3'),
      damage: new Audio('./audio/damage.mp3'),
      destruction: new Audio('./audio/destruction.mp3'),
      drowning: new Audio('./audio/drowning.mp3'),
      victory: new Audio('./audio/victory.mp3'),
    };
    Object.values(this.soundEffects).forEach((sound) => {
      sound.volume = 0.6;
    });
    // Объект для отслеживания времени последнего воспроизведения звука
    this.lastPlayedTimes = {};
  }

  playBackgroundMusic() {
    this.backgroundMusic.play();
  }

  stopBackgroundMusic() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  setBackgroundMusicVolume(volume) {
    this.backgroundMusic.volume = volume;
  }
  setVolume(effectName, volume) {
    if (this.soundEffects[effectName]) {
      this.soundEffects[effectName].volume = volume;
    }
  }

  playSoundEffect(effectName) {
    if (this.soundEffects[effectName]) {
      const sound = this.soundEffects[effectName];
      const currentTime = Date.now();
      if (!this.lastPlayedTimes[effectName] || currentTime - this.lastPlayedTimes[effectName] >= 400) {
        sound.currentTime = 0;
        sound.play();
        this.lastPlayedTimes[effectName] = currentTime;
      }
    }
  }

  playMenuMusic() {
    this.menuMusic.play();
  }

  stopMenuMusic() {
    this.menuMusic.pause();
    this.menuMusic.currentTime = 0;
  }

  setMenuMusicVolume(volume) {
    this.menuMusic.volume = volume;
  }

  setMusicVolume(volume) {
    this.backgroundMusic.volume = volume;
    this.menuMusic.volume = volume;
  }

  setSoundEffectsVolume(volume) {
    Object.values(this.soundEffects).forEach((sound) => {
      sound.volume = volume;
    });
  }
}
