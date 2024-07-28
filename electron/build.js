const { execSync } = require('child_process');
const os = require('os');

const icon = os.platform() === 'darwin' ? '/static/images/icone.icns' : 'game/static/images/icone.ico';
const command = `npx electron-packager . --icon ${icon} --out=packages`;

try {
    execSync(command);
    console.log('Build successful');
} catch (error) {
    console.error('Error during build:', error.message);
}
