import { Scene } from 'three';
import { WebGLRenderer } from 'three';
import { Object3D } from 'three';
import { PerspectiveCamera } from 'three';

const SHOE_DOWN_ANGLE = -22.5 * (Math.PI / 180);

export class Engine {

  constructor(
    private renderer: WebGLRenderer,
    private scene: Scene,
    private camera: PerspectiveCamera,
    private shoe1: Object3D,
    private shoe2: Object3D,
  ) {
  }

  render(leftDown: boolean, rightDown: boolean): void {
    this.shoe1.rotation.z = leftDown ? SHOE_DOWN_ANGLE : 0;
    this.shoe2.rotation.z = rightDown ? SHOE_DOWN_ANGLE : 0;
    this.renderer.render(this.scene, this.camera);
  }
}
