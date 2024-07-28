
const caminhoImagens = "../static/images/";
class InicializacaoSounds {    
    static soundEffectsStandby(){
    const soundEffectsStandby = [
        `${caminhoImagens}sound-effects/face_standby1.mp3`,
        `${caminhoImagens}sound-effects/face_standby2.mp3`,
        `${caminhoImagens}sound-effects/face_standby3.mp3`,
        `${caminhoImagens}sound-effects/face_standby4.mp3`,
        `${caminhoImagens}sound-effects/face_standby5.mp3`
      ];
      return soundEffectsStandby;
    }
    
    static soundEffectsPunch(){
      const soundEffectsPunch = [
        `${caminhoImagens}sound-effects/face_punch1.mp3`,
        `${caminhoImagens}sound-effects/face_punch2.mp3`,
        `${caminhoImagens}sound-effects/face_punch3.mp3`,
        `${caminhoImagens}sound-effects/face_punch4.mp3`,
        `${caminhoImagens}sound-effects/face_punch5.mp3`
      ]; 
      return soundEffectsPunch;
    }
    static soundEffectsDesbloqueio(){
      const soundEffectsDesbloqueio = [
        `${caminhoImagens}sound-effects/upgrade.mp3`
      ]; 
      return soundEffectsDesbloqueio;
    }
}

export default InicializacaoSounds;
