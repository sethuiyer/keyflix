import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("About");
    }

    async getHtml(insight_dic) {
        let html = `
        <h1 align="center" class="recommend_link">About</h1>
        <div align="center">
        <p class="recommend_link" style="font-weight: 200;">
        I'm a hermit who got tired of spying from big corporations and want to watch videos in peace.<br>
        At first, I started off copying Youtube design, but Netflix design is more pleasant to the eyes. <br>
        So, enjoy! Over 1700 videos covering topics like Sprituality, Motivation, Workouts, Quantum Mechanics, Biology etc. <br><br>
        
        All these videos are taken from Youtube.
        
        If any video does not play, then you can search on Youtube</p>
        </div>

    `;
    
    return html;
    }
    
}