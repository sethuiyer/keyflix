import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Random Video");
    }

    async getHtml(insight_dic) {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        this.postId = getRandomInt(0, 806);
        let mime_dict = {'m4v': 'mp4','mp4': 'mp4', 'webm': 'webm', 'mkv': 'webm'}
        if(['.mkv','.mp4','.webm','.m4v'].indexOf(insight_dic['File Extension'][this.postId]) == -1){
            window.open(insight_dic['link'][this.postId], '_blank');
        }
        let a = insight_dic.fname[this.postId]
        let b = a.slice(a.lastIndexOf('/')+1, a.lastIndexOf('.'))
        let local_insights = insights['SimMatrix'][this.postId].map((value, idx) => { return { value, idx }; });
        local_insights.sort((a,b) => {
            if (a.value < b.value){
                return 1;
            }
            if(a.value > b.value){
                return -1;
            }
            return 0;
        });
        let argindices = local_insights.map(data => data.idx);
        let local_recommends = argindices.slice(0,5);
        let other_recommends = argindices.slice(300,305);
        if(!(localStorage.watch_history.includes('||'+this.postId.toString() + '||'))){
          localStorage.watch_history += this.postId.toString() + '||'
        }
        
        return `
      <div class="link-black">
            <h4 class="recommend_link" id="vid_heading" align="center">${insight_dic['fname'][this.postId]}</h4>
        <div height="70vh" class="video-container">
            <video>
            <source src="${insight_dic.link[this.postId]}" type="video/${mime_dict[insight_dic['File Extension'][this.postId].slice(1)]}"/>
            </video>
        <div class="controls-container">
          <div class="progress-controls">
            <div class="progress-bar">
              <div class="watched-bar"></div>
              <div class="playhead"></div>
            </div>
            <div class="time-remaining">
            00:00:00
            </div>
          </div>
          <div class="controls">
            <button class="play-pause">
              <svg class="playing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <svg class="paused" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            </button>
            <button class="rewind">
              <svg viewBox="0 0 24 24">
                <path fill="#ffffff"
                  d="M12.5,3C17.15,3 21.08,6.03 22.47,10.22L20.1,11C19.05,7.81 16.04,5.5 12.5,5.5C10.54,5.5 8.77,6.22 7.38,7.38L10,10H3V3L5.6,5.6C7.45,4 9.85,3 12.5,3M10,12V22H8V14H6V12H10M18,14V20C18,21.11 17.11,22 16,22H14A2,2 0 0,1 12,20V14A2,2 0 0,1 14,12H16C17.11,12 18,12.9 18,14M14,14V20H16V14H14Z" />
              </svg>
            </button>
            <button class="fast-forward">
              <svg viewBox="0 0 24 24">
                <path fill="#ffffff"
                  d="M10,12V22H8V14H6V12H10M18,14V20C18,21.11 17.11,22 16,22H14A2,2 0 0,1 12,20V14A2,2 0 0,1 14,12H16C17.11,12 18,12.9 18,14M14,14V20H16V14H14M11.5,3C14.15,3 16.55,4 18.4,5.6L21,3V10H14L16.62,7.38C15.23,6.22 13.46,5.5 11.5,5.5C7.96,5.5 4.95,7.81 3.9,11L1.53,10.22C2.92,6.03 6.85,3 11.5,3Z" />
              </svg>
            </button>
            <button class="volume">
              <svg class="full-volume" viewBox="0 0 24 24">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <svg class="muted" viewBox="0 0 24 24">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            </button>
            <div class="volume-bar">
            <div class="current-volume"></div>
            <div class="volhead"></div>
          </div>
            <p class="title">
              <span class="series">&nbsp;&nbsp; ${insight_dic['Series'][this.postId]}</span><span class="episode">&nbsp;&nbsp; ${insight_dic['episodes'][this.postId]}</span>
            </p>
            <button class="next">
              <svg viewBox="0 0 24 24">
                <polygon points="5 4 15 12 5 20 5 4"></polygon>
                <line x1="19" y1="5" x2="19" y2="19"></line>
              </svg>
            </button>
            <button class="full-screen">
              <svg class="maximize" viewBox="0 0 24 24">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3">
                </path>
              </svg>
              <svg class="minimize" viewBox="0 0 24 24">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3">
                </path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div style="margin-top: 10vh;">
        <p class="recommend_link center"> Videos Like this 
        <a class="nav__link center" href="/videos/${local_recommends[0]}" class="nav__link" data-link>${insight_dic.fname[local_recommends[0]]}</a>
        <a class="nav__link center" href="/videos/${local_recommends[1]}" class="nav__link" data-link>${insight_dic.fname[local_recommends[1]]}</a>
        <a class="nav__link center" href="/videos/${local_recommends[2]}" class="nav__link" data-link>${insight_dic.fname[local_recommends[2]]}</a>
        <a class="nav__link center" href="/videos/${local_recommends[3]}" class="nav__link" data-link>${insight_dic.fname[local_recommends[3]]}</a>
        <a class="nav__link center" href="/videos/${local_recommends[4]}" class="nav__link" data-link>${insight_dic.fname[local_recommends[4]]}</a>

        <br>
        <p class="recommend_link center"> Other Videos
        <a class="nav__link center" href="/videos/${other_recommends[0]}" class="nav__link" data-link>${insight_dic.fname[other_recommends[0]]}</a>
        <a class="nav__link center" href="/videos/${other_recommends[1]}" class="nav__link" data-link>${insight_dic.fname[other_recommends[1]]}</a>
        <a class="nav__link center" href="/videos/${other_recommends[2]}" class="nav__link" data-link>${insight_dic.fname[other_recommends[2]]}</a>
        <a class="nav__link center" href="/videos/${other_recommends[3]}" class="nav__link" data-link>${insight_dic.fname[other_recommends[3]]}</a>
        <a class="nav__link center" href="/videos/${other_recommends[4]}" class="nav__link" data-link>${insight_dic.fname[other_recommends[4]]}</a>
        </div>
        `;
    }

    async loadVideo(){
      const videoContainer = document.querySelector('.video-container');
        const video = document.querySelector('.video-container video');

        const controlsContainer = document.querySelector('.video-container .controls-container');

        const playPauseButton = document.querySelector('.video-container .controls button.play-pause');
        const rewindButton = document.querySelector('.video-container .controls button.rewind');
        const fastForwardButton = document.querySelector('.video-container .controls button.fast-forward');
        const volumeButton = document.querySelector('.video-container .controls button.volume');
        const fullScreenButton = document.querySelector('.video-container .controls button.full-screen');
        const playButton = playPauseButton.querySelector('.playing');
        const pauseButton = playPauseButton.querySelector('.paused');
        const fullVolumeButton = volumeButton.querySelector('.full-volume');
        const mutedButton = volumeButton.querySelector('.muted');
        const maximizeButton = fullScreenButton.querySelector('.maximize');
        const minimizeButton = fullScreenButton.querySelector('.minimize');


        const progressBar = document.querySelector('.video-container .progress-controls .progress-bar');
        const volumeBar = document.querySelector('.video-container .controls .volume-bar');
        const currVolBar = document.querySelector('.video-container .controls .volume-bar .current-volume');
        const watchedBar = document.querySelector('.video-container .progress-controls .progress-bar .watched-bar');
        const timeLeft = document.querySelector('.video-container .progress-controls .time-remaining');

        let controlsTimeout;
        controlsContainer.style.opacity = '0';
        watchedBar.style.width = '0px';
        pauseButton.style.display = 'none';
        minimizeButton.style.display = 'none';
        mutedButton.style.display = 'none';
        volumeBar.style.display = 'none';
        video.volume = 0.5;
        currVolBar.style.width = 50 + '%';

        const displayControls = () => {
          controlsContainer.style.opacity = '1';
          document.body.style.cursor = 'initial';
          if (controlsTimeout) {
            clearTimeout(controlsTimeout);
          }
          controlsTimeout = setTimeout(() => {
            controlsContainer.style.opacity = '0';
            document.body.style.cursor = 'none';
          }, 5000);
        };

        const playPause = () => {
          const video = document.querySelector('.video-container video');
          if (video.paused) {
            video.play();
            playButton.style.display = 'none';
            pauseButton.style.display = '';
          } else {
            video.pause();
            playButton.style.display = '';
            pauseButton.style.display = 'none';
          }
        };

        const toggleMute = () => {
          const video = document.querySelector('.video-container video');
          if(video.volume !=0 || video.volume != 1){
            localStorage.curr_vol = video.volume;
          }
          video.muted = !video.muted;
          if (video.muted) {
            fullVolumeButton.style.display = 'none';
            mutedButton.style.display = '';
            currVolBar.style.width = 0;
          
          } else {
            fullVolumeButton.style.display = '';
            mutedButton.style.display = 'none';
            video.volume = parseFloat(localStorage.curr_vol);
            currVolBar.style.width = video.volume * 100 + '%';
          }
        };

        const toggleFullScreen = () => {
          if (!document.fullscreenElement) {
            videoContainer.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        };

        document.addEventListener('fullscreenchange', () => {
          if (!document.fullscreenElement) {
            maximizeButton.style.display = '';
            minimizeButton.style.display = 'none';

          } else {
            maximizeButton.style.display = 'none';
            minimizeButton.style.display = '';
          }
        });

        document.addEventListener('keyup', (event) => {
          if (event.code === 'Space') {
            playPause(); 
          }

          if (event.code === 'KeyM') {
            toggleMute();
          }

          if (event.code === 'KeyF') {
            toggleFullScreen();
          }

          displayControls();
        });

        document.addEventListener('mousemove', () => {
          displayControls();
        });

        video.addEventListener('timeupdate', () => {
          watchedBar.style.width = ((video.currentTime / video.duration) * 100) + '%';
          // TODO: calculate hours as well...
          const totalSecondsRemaining = video.duration - video.currentTime;
          // THANK YOU: BEGANOVICH
          const time = new Date(null);
          var offset = time.getTimezoneOffset();
          var offset_hours = parseInt(offset / 60);
          var offset_minutes = parseInt(offset % 60);
          time.setSeconds(totalSecondsRemaining + offset_hours*3600 + offset_minutes*60);
          let hours = null;
          let minutes = null;
          if(totalSecondsRemaining >= 3600) {
            hours = ((time.getHours()).toString()).padStart('2', '0');
          }
          if(totalSecondsRemaining >= 60){
            minutes = ((time.getMinutes()).toString()).padStart('2', '0');
          }
          let seconds = (time.getSeconds().toString()).padStart('2', '0');
          timeLeft.textContent = `${hours ? hours : '00'}:${minutes ? minutes : '00'}:${seconds}`;
        });

        progressBar.addEventListener('click', (event) => {
          const pos = (event.pageX  - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
          video.currentTime = pos * video.duration;
        });

        volumeBar.addEventListener('click', (event) => {
          const pos = (event.pageX  - (volumeBar.offsetLeft + volumeBar.offsetParent.offsetLeft)) / volumeBar.offsetWidth;
          video.volume = pos;
          currVolBar.style.width = pos*100 + '%';
        });

        playPauseButton.addEventListener('click', playPause);

        rewindButton.addEventListener('click', () => {
          video.currentTime -= 10;
        });

        fastForwardButton.addEventListener('click', () => {
          video.currentTime += 10;
        });

        volumeButton.addEventListener('click', toggleMute);
        volumeButton.addEventListener('mouseover', () => {
          volumeBar.style.display = '';
        });
       
        volumeBar.addEventListener('mouseover', () => {
          volumeBar.style.display = '';
        });
        volumeBar.addEventListener('mouseout', () => {
          setTimeout(() => {
            volumeBar.style.display = 'none';
          }, 8000);
        });

        fullScreenButton.addEventListener('click', toggleFullScreen);
        
    }

}