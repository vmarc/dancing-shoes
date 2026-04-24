import { PerspectiveCamera } from 'three';
import { Scene } from 'three';
import { WebGLRenderer } from 'three';
import { Mesh } from 'three';
import { AmbientLight } from 'three';
import { AxesHelper } from 'three';
import { GridHelper } from 'three';
import { Object3D } from 'three';
import { MeshPhongMaterial } from 'three';
import { HemisphereLight } from 'three';
import { DirectionalLight } from 'three';
import { GLTFLoader } from 'three/addons';
import { GLTF } from 'three/addons';
import { PlaneGeometry } from 'three';
import { ShadowMaterial } from 'three';
import { Injectable } from '@angular/core';
import { Engine } from './engine';

@Injectable()
export class ViewerService {

  private engine: Engine | undefined = undefined;

  init(canvas: HTMLCanvasElement): void {
    this.loadShoe((gltf) => {
        this.initView(canvas, gltf.scene);
      }
    );
  }

  toggleShoe(): void {
    if (this.engine) {
      this.engine.toggleShoe();
    }
  }

  private initView(canvas: HTMLCanvasElement, shoe: Object3D): void {

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const camera = this.buildCamera(width, height);
    const scene = this.buildScene();

    this.applyShinyRedMaterial(shoe);
    scene.add(shoe);

    const renderer = this.buildRenderer(canvas, width, height);

    this.engine = new Engine(renderer, scene, camera, shoe);
    this.engine.render();
  }

  private loadShoe(onLoad: (data: GLTF) => void): void {
    const loader = new GLTFLoader();
    loader.load(
      'shoe.glb',
      (gltf) => {
        console.log('loaded shoe gltf', gltf);
        onLoad(gltf);
      },
      (event: ProgressEvent) => {
        console.log(`load shoe progress: ${event.loaded * 100 / event.total}%, ${event.loaded} bytes`, event);
      },
      (err: unknown) => {
        console.error('load shoe error', err);
      }
    );
  }

  private buildCamera(width: number, height: number): PerspectiveCamera {
    const camera = new PerspectiveCamera(45, width / height, 0.0001, 1000);
    camera.position.set(0.02, 0.05, 0.1);
    camera.lookAt(0, 0, 0);
    return camera;
  }

  private buildScene(): Scene {
    const scene = new Scene();
    this. initLights(scene);
    scene.add(this.buildFloor());
    scene.add(this.buildGrid());
    scene.add(new AxesHelper(1));
    return scene;
  }

  private buildRenderer(canvas: HTMLCanvasElement, width: number, height: number): WebGLRenderer {
    const renderer = new WebGLRenderer({antialias: true, canvas: canvas});
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    return renderer;
  }

  private applyShinyRedMaterial(object: Object3D): void {
    const material = new MeshPhongMaterial({
      color: 0xFF0000,
      shininess: 150
    });

    object.traverse((child: Object3D) => {
      if (child instanceof Mesh) {
        child.material = material;
        child.castShadow = true;
      }
    });
  }

  private initLights(scene: Scene): void {

    scene.add(new AmbientLight());
    scene.add(new HemisphereLight());

    const light = new DirectionalLight(0xFFFFFF, 3);
    light.position.set(0, 10, 0);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    scene.add(light);
    scene.add(light.target);
  }

  private buildFloor(): Object3D {
    const floorGeometry = new PlaneGeometry(0.5, 0.5);
    const floorMaterial = new ShadowMaterial({opacity: 0.3});
    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    return floor;
  }

  private buildGrid(): Object3D {
    const size = 0.1;
    const divisions = 10;
    return new GridHelper(size, divisions);
  }
}
