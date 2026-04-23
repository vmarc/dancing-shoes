import { PerspectiveCamera } from 'three';
import { Scene } from 'three';
import { WebGLRenderer } from 'three';
import { Object3D } from 'three';

export class Engine {

  constructor(
    private renderer: WebGLRenderer,
    private scene: Scene,
    private camera: PerspectiveCamera,
    private shoe1: Object3D
  ) {
  }

  up(): void {
    console.log('up');
    this.shoe1.rotation.z = 0;
    this.render();
  }

  down(): void {
    console.log('down');
    this.shoe1.rotation.z = -22.5 * Math.PI / 180;
    this.render();
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }
}
