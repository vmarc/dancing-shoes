import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/plugins/regions';
import { ModelService } from '../../../model/model.service';
import { TimeLineEvent } from '../../../model/time-line-event';

export class AudioEngine {

  private readonly regions: RegionsPlugin;
  private readonly waveSurfer: WaveSurfer;

  constructor(private modelService: ModelService, private minPxPerSec: number){
    this.regions = RegionsPlugin.create()
    this.waveSurfer = this.buildWaveSurfer();
    // this.initLogging();
    this.waveSurfer.load('dance.mp3');
    this.waveSurfer.on('decode', () => {
      this.buildMarkers();
    });

    this.waveSurfer.on('timeupdate', (currentTime) => {
      this.modelService.model.tick(currentTime);
    });
  }

  playPause(): void {
    this.waveSurfer.playPause();
  }

  zoom(minPxPerSec: number) {
    this.waveSurfer.zoom(minPxPerSec);
  }

  private buildWaveSurfer(): WaveSurfer {
    return WaveSurfer.create({
      container: '#waveform',
      waveColor: '#0000ff',
      progressColor: '#000055',
      cursorColor: '#ff0000',
      cursorWidth: 3,
      dragToSeek: true,
      minPxPerSec: this.minPxPerSec,
      plugins: [
        this.regions
      ]
    });
  }

  private initLogging(): void {
    /** When audio starts loading */
    this.waveSurfer.on('load', (url) => {
      console.log('Load', url);
    });

    /** During audio loading */
    this.waveSurfer.on('loading', (percent) => {
      console.log('Loading', percent + '%');
    });

    /** When the audio has been decoded */
    this.waveSurfer.on('decode', (duration) => {
      console.log('Decode', duration + 's');
    });

    /** When the audio is both decoded and can play */
    this.waveSurfer.on('ready', (duration) => {
      console.log('Ready', duration + 's');
    });

    /** When visible waveform is drawn */
    this.waveSurfer.on('redraw', () => {
      console.log('Redraw began');
    });

    /** When all audio channel chunks of the waveform have drawn */
    this.waveSurfer.on('redrawcomplete', () => {
      console.log('Redraw complete');
    });

    /** When the audio starts playing */
    this.waveSurfer.on('play', () => {
      console.log('Play');
    });

    /** When the audio pauses */
    this.waveSurfer.on('pause', () => {
      console.log('Pause');
    });

    /** When the audio finishes playing */
    this.waveSurfer.on('finish', () => {
      console.log('Finish');
    });

    /** On audio position change, fires continuously during playback */
    this.waveSurfer.on('timeupdate', (currentTime) => {
      console.log('Time', currentTime + 's');
    });

    /** When the user seeks to a new position */
    this.waveSurfer.on('seeking', (currentTime) => {
      console.log('Seeking', currentTime + 's');
    });

    /** When the user interacts with the waveform (i.g. clicks or drags on it) */
    this.waveSurfer.on('interaction', (newTime) => {
      console.log('Interaction', newTime + 's');
    });

    /** When the user clicks on the waveform */
    this.waveSurfer.on('click', (relativeX) => {
      console.log('Click', relativeX);
    });

    /** When the user drags the cursor */
    this.waveSurfer.on('drag', (relativeX) => {
      console.log('Drag', relativeX);
    });

    /** When the waveform is scrolled (panned) */
    this.waveSurfer.on('scroll', (visibleStartTime, visibleEndTime) => {
      console.log('Scroll', visibleStartTime + 's', visibleEndTime + 's');
    });

    /** When the zoom level changes */
    this.waveSurfer.on('zoom', (minPxPerSec) => {
      console.log('Zoom', minPxPerSec + 'px/s');
    });

    /** Just before the waveform is destroyed so you can clean up your events */
    this.waveSurfer.on('destroy', () => {
      console.log('Destroy');
    });
  }

  private buildMarkers(): void {
    this.buildEventMarkers(this.modelService.model.timeLine.eventsLeft, 'rgba(255, 0, 0, 0.1)');
    this.buildEventMarkers(this.modelService.model.timeLine.eventsRight, 'rgba(0, 255, 0, 0.1)');
  }

  private buildEventMarkers(events: TimeLineEvent[], color: string): void {
    events.forEach((event) => {
      this.regions.addRegion({
        start: event.time1,
        end: event.time2,
        content: event.label,
        color: color,
      })
    });
  }
}
