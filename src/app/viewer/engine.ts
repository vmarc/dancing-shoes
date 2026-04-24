import { Scene } from 'three';
import { WebGLRenderer } from 'three';
import { Object3D } from 'three';
import { PerspectiveCamera } from 'three';

const SHOE_DOWN_ANGLE = -22.5 * (Math.PI / 180);

export class Engine {

  private down = false;

  constructor(
    private renderer: WebGLRenderer,
    private scene: Scene,
    private camera: PerspectiveCamera,
    private shoe1: Object3D
  ) {}

  toggleShoe(): void {
    this.down = !this.down;
    this.render();
  }

  render(): void {
    this.shoe1.rotation.z = this.down ? SHOE_DOWN_ANGLE : 0;
    this.renderer.render(this.scene, this.camera);
  }
}
