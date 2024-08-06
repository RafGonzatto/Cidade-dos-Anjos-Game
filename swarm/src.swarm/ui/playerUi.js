import { baseUiPlayer, baseUiHealth, baseUiXP, baseUiRafFace, baseUiSkill1Raf } from "../static/images.js";
import { context, canvas, camera } from "../gameConfig/gameConfig.js";

export default class PlayerInterface {
    constructor(champion) {
        this.base = baseUiPlayer;
        this.health = baseUiHealth;
        this.xp = baseUiXP; // XP necessário para o próximo nível
        this.displayedXp = 0;
        this.champion = champion
        this.championSelect = this.choseChampion(champion.champion);
        this.championSkill1 = this.choseChampionSkill1(champion.champion);
        this.x = 0;
        this.y = 0;
        this.healthPercentage = 1; 
        this.scale = 2; // Scale factor for doubling the size
        this.init();
    }

    init() {
        this.updatePosition();
    }

    updatePosition() {
        const cameraOffsetX = camera.x - canvas.width / 2;
        const cameraOffsetY = camera.y - canvas.height / 2;

        // Posição baseada na tela
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        // Centralizado horizontalmente, na parte inferior da tela
        this.x = cameraOffsetX + (this.canvasWidth - (this.base.width * this.scale)) / 2;
        this.y = cameraOffsetY + this.canvasHeight - (this.base.height * this.scale) - 25;
    }


    updateHealthBar(healthPercentage) {
        if (!healthPercentage){
            return
        }        
        if (healthPercentage < 0) healthPercentage = 0;
        if (healthPercentage > 1) healthPercentage = 1;
        this.healthPercentage = healthPercentage;
        
    }

    draw() {
        this.drawChampionSelect();
        this.drawBase();
        this.drawHealthBar();
        this.drawSkill();
        this.drawSkillCooldown();
        this.drawPlayerXP();
        this.drawLevel();
    }
    drawChampionSelect() {
        const radius = 28.5 * this.scale; // Raio da imagem circular aumentado em 1 px
        const x = this.x - 17
         + (55 * this.scale - radius) / 2; // Coordenada x do centro da imagem circular
        const y = this.y + 34 + (55 * this.scale - radius) / 2; // Coordenada y do centro da imagem circular
    
        context.save();
        context.beginPath();
        context.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
        context.clip();
        context.drawImage(this.championSelect, x, y, radius * 2, radius * 2);
        context.restore();
    }
    drawBase() {
        context.drawImage(
            this.base, 
            this.x, 
            this.y, 
            this.base.width * this.scale, 
            this.base.height * this.scale
        );
    }

    drawHealthBar() {
        const healthBarWidth = this.base.width * this.scale; 
        const healthHeight = this.health.height * this.scale; 
        const healthWidth = healthBarWidth * this.healthPercentage; 
    
        // Desenhe a barra de saúde
        context.drawImage(
            this.health, 
            0, 0, healthWidth / this.scale, this.health.height, 
            this.x, this.y, healthWidth, healthHeight 
        );
        this.drawHealthBarText(healthBarWidth, healthHeight);
    }
    
    drawHealthBarText(healthBarWidth, healthHeight){
        context.fillStyle = 'white'; // Cor do texto
        context.font = '16px Arial'; // Fonte e tamanho
        context.textAlign = 'center'; // Alinhar ao centro
        context.textBaseline = 'middle'; // Alinhar ao meio
    
        // Texto da vida atual e máxima
        const currentHealth = Math.round(this.champion.health);
        const maxHealth = Math.round(this.champion.maxHealth);
        const healthText = `${currentHealth} / ${maxHealth}`;
    
        // Ajuste a posição do texto
        const offsetX = 50; // Ajuste conforme necessário
        const offsetY = 40; // Ajuste conforme necessário
    
        // Posições para o texto
        const textX = this.x + healthBarWidth / 2 + offsetX;
        const textY = this.y + healthHeight / 2 + offsetY;
    
        // Desenhe o texto sobre a barra de saúde
        context.fillText(healthText, textX, textY);
    }
    drawSkill() {
        context.drawImage(this.championSkill1, this.x + 166, this.y + 56, 28 * this.scale, 28 * this.scale);
    }
    drawSkillCooldown() { 
        if (!this.champion.skill1Cooldown) {
            // Calcula o tempo decorrido desde o início do cooldown
            const elapsed = (Date.now() - this.champion.skill1CooldownStartTime) / 1000;
    
            // Calcula o tempo restante com base no cooldown atual
            const remainingTime = Math.max(0, this.champion.currentCooldownSkill1 - elapsed); 
    
            // Posições ajustadas para o cronômetro
            const rectX = this.x + 165;
            const rectY = this.y + 56;
            const rectWidth = (this.base.width * this.scale - ((this.base.width * this.scale) * 0.91));
            const rectHeight = (this.base.height * this.scale - ((this.base.height * this.scale) * 0.714));
        
            // Desenha o fundo para o cronômetro
            context.fillStyle = 'rgba(41, 52, 75, 0.8)';
            context.fillRect(rectX, rectY, rectWidth, rectHeight);
        
            // Ajusta a posição do texto para centralizá-lo dentro do quadrado
            const textX = rectX + (rectWidth / 2);
            const textY = rectY + (rectHeight / 2);
        
            // Desenha o texto
            context.fillStyle = 'white';
            context.font = '16px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(remainingTime.toFixed(1), textX, textY);
        }
    }
   drawPlayerXP() {
        const targetXpPercentage = Math.min(this.champion.xp / this.champion.nextLevelXp, 1); 
        const smoothingFactor = 0.1; 
        this.displayedXp += (targetXpPercentage - this.displayedXp) * smoothingFactor;

        const xpBarWidth = this.base.width * this.scale; 
        const xpHeight = this.xp.height * this.scale; 
        const xpWidth = xpBarWidth * this.displayedXp; 

        if (this.displayedXp > 0) { 
            context.drawImage(
                this.xp, 
                0, 0, xpWidth / this.scale, this.xp.height, 
                this.x, this.y, xpWidth, xpHeight 
            );
        }
    }
    drawLevel(){
        context.fillStyle = 'white';
        context.font = '16px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(this.champion.level, this.x + 119.5, this.y + 70);
    }
    choseChampion(champion) {
        let championIcon = null;
        if (champion === 0) {
            championIcon = baseUiRafFace;
        }
        return championIcon;
    }
    choseChampionSkill1(champion) {
        let championIcon = null;
        if (champion === 0) {
            championIcon = baseUiSkill1Raf;
        }
        return championIcon;
    }
}
