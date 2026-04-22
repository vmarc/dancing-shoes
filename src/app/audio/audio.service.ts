import { Injectable } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Injectable()
export class AudioService {

  private wavesurfer: WaveSurfer | undefined;

  init(): void {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#0000ff',
      progressColor: '#000055',
      dragToSeek: true,
    });


    /** When audio starts loading */
    this.wavesurfer.on('load', (url) => {
      console.log('Load', url);
    });

    /** During audio loading */
    this.wavesurfer.on('loading', (percent) => {
      console.log('Loading', percent + '%');
    });

    /** When the audio has been decoded */
    this.wavesurfer.on('decode', (duration) => {
      console.log('Decode', duration + 's');
    });

    /** When the audio is both decoded and can play */
    this.wavesurfer.on('ready', (duration) => {
      console.log('Ready', duration + 's');
    });

    /** When visible waveform is drawn */
    this.wavesurfer.on('redraw', () => {
      console.log('Redraw began');
    });

    /** When all audio channel chunks of the waveform have drawn */
    this.wavesurfer.on('redrawcomplete', () => {
      console.log('Redraw complete');
    });

    /** When the audio starts playing */
    this.wavesurfer.on('play', () => {
      console.log('Play');
    });

    /** When the audio pauses */
    this.wavesurfer.on('pause', () => {
      console.log('Pause');
    });

    /** When the audio finishes playing */
    this.wavesurfer.on('finish', () => {
      console.log('Finish');
    });

    /** On audio position change, fires continuously during playback */
    this.wavesurfer.on('timeupdate', (currentTime) => {
      console.log('Time', currentTime + 's');
    });

    /** When the user seeks to a new position */
    this.wavesurfer.on('seeking', (currentTime) => {
      console.log('Seeking', currentTime + 's');
    });

    /** When the user interacts with the waveform (i.g. clicks or drags on it) */
    this.wavesurfer.on('interaction', (newTime) => {
      console.log('Interaction', newTime + 's');
    });

    /** When the user clicks on the waveform */
    this.wavesurfer.on('click', (relativeX) => {
      console.log('Click', relativeX);
    });

    /** When the user drags the cursor */
    this.wavesurfer.on('drag', (relativeX) => {
      console.log('Drag', relativeX);
    });

    /** When the waveform is scrolled (panned) */
    this.wavesurfer.on('scroll', (visibleStartTime, visibleEndTime) => {
      console.log('Scroll', visibleStartTime + 's', visibleEndTime + 's');
    });

    /** When the zoom level changes */
    this.wavesurfer.on('zoom', (minPxPerSec) => {
      console.log('Zoom', minPxPerSec + 'px/s');
    });

    /** Just before the waveform is destroyed so you can clean up your events */
    this.wavesurfer.on('destroy', () => {
      console.log('Destroy');
    });

    this.wavesurfer.load('dance.mp3');
  }

  playPause(): void {
    this.wavesurfer?.playPause();
  }

  zoom(minPxPerSec: number) {
    this.wavesurfer?.zoom(minPxPerSec);
  }
}

