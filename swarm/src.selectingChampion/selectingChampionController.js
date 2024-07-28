import {configureGoBackButton} from "./utils/utils.js";
import {configureSeller} from "../src.selectingChampion/seller.js";
import { configureSelectChampionTab } from "./selectChampionTab.js";
import { configurePlayButton } from "./startButton.js";
class selectingChampionController {
  constructor() {
    configureGoBackButton();
    configureSeller()
    configureSelectChampionTab()
    configurePlayButton();
  }

 
}

window.selectingChampionController = new selectingChampionController();
export default selectingChampionController;
