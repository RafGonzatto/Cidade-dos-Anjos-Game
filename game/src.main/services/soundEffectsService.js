import InicializacaoSounds from "../inicializacaoSouds.js";

const soundEffects = {
  "audioElementsStandby": InicializacaoSounds.soundEffectsStandby(),
  "audioElementsPunch": InicializacaoSounds.soundEffectsPunch(),
  "audioElementsDesbloqueio": InicializacaoSounds.soundEffectsDesbloqueio()
};

let audioInitialized = false;

class SoundEffectsService {
    
    static audioElements = {
      "audioElementsStandby": [],
      "audioElementsPunch": [],
      "audioElementsDesbloqueio": []
    };

    static playRandomSound(audioElements) { 
        if (audioInitialized && audioElements.length > 0) {
            const randomIndex = Math.floor(Math.random() * audioElements.length);
            const randomSound = audioElements[randomIndex];
            randomSound.currentTime = 0; 
            randomSound.play().catch(error => {
                console.log("Erro ao tocar o som:", error);
            });
        }
    }  

    static initializeAudio() { 
        if (!audioInitialized) {
            for (const key in soundEffects) {
                if (soundEffects.hasOwnProperty(key)) {
                    soundEffects[key].forEach(function(src) {
                        const audio = new Audio(src);
                        SoundEffectsService.audioElements[key].push(audio);
                    });
                }
            }
            audioInitialized = true;
        }
    }
}

SoundEffectsService.initializeAudio();

export default SoundEffectsService;
