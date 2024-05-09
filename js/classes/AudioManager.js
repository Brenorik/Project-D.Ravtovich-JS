class AudioManager {
  constructor() {
    this.backgroundMusic = new Audio('../../audio/games.mp3');
    this.backgroundMusic.loop = true; // Позволяет фоновой музыке зацикливаться
    this.backgroundMusic.volume = 0.1; // Начальная громкость фоновой музыки
    this.soundEffects = {
      // Здесь можно объявить и хранить объекты звуковых эффектов
      // Например:
      jump: new Audio('../../audio/Jump.mp3'),
      attack: new Audio('../../audio/attack.mp3'),
      apple: new Audio('../../audio/Apple.mp3'),
      gameOver: new Audio('../../audio/GameOver.mp3'),
      damage: new Audio('../../audio/damage.mp3'),
      destruction: new Audio('../../audio/destruction.mp3'),
      drowning: new Audio('../../audio/drowning.mp3'),
    };
    Object.values(this.soundEffects).forEach((sound) => {
      sound.volume = 0.4; // Например, устанавливаем громкость на 50%
    });
    // Объект для отслеживания времени последнего воспроизведения звука
    this.lastPlayedTimes = {};
  }

  playBackgroundMusic() {
    this.backgroundMusic.play();
  }

  pauseBackgroundMusic() {
    this.backgroundMusic.pause();
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
      // Проверяем, прошло ли достаточно времени с последнего воспроизведения звука
      if (!this.lastPlayedTimes[effectName] || currentTime - this.lastPlayedTimes[effectName] >= 400) {
        // Если прошло достаточно времени, проигрываем звук и обновляем время последнего воспроизведения
        sound.currentTime = 0;
        sound.play();
        this.lastPlayedTimes[effectName] = currentTime;
      }
    }
  }
}
