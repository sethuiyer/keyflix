import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Books");
    }

    async getHtml(insight_dic) {
        let html = `
        <h1 align="center" class="recommend_link">Recommendations</h1>
        <p class="recommend_link">
        Recommendations based on your watch history
        </p>
    `;
    if(insight_dic != undefined) {
        let i = 0;
        html += ` <input type="text" id="search-criteria" onkeyup="myFunction()" placeholder="Search the video"/> <br> <div class="link-black shadowy-box"> <br> <ul id="myUL">`
        if ('recommend' in insight_dic){
            for(i=0; i<insight_dic['recommend'].length; i++){
                if ([".m4v",".mp4",".mkv",".webm"].indexOf(insight_dic['File Extension'][i]) > -1){
                    html += `<li><a class="nav__link" href="/videos/${insight_dic['recommend'][i]}" class="nav__link" data-link>${insight_dic.fname[insight_dic['recommend'][i]]}</a></li>`;
                }
            }
            html+=`</ul></div>`
        }
        else{
            html += '<p class="nav__link">Nothing to recommend</p>';
        }
    }
    else{
        html += 'Loading..'
    }
    return html;
    }
    
}