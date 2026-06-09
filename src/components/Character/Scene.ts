import * as THREE from "three";

import type { TechNodeData } from "../../data/techStack";
import { getRelatedTechnologyIds } from "../../data/techStack";

interface MouseState {
  rawX: number;
  rawY: number;
  smoothX: number;
  smoothY: number;
  velX: number;
  velY: number;
  prevRawX: number;
  prevRawY: number;
}

interface RingState {
  baseAngularVelocity: number;
  momentumX: number;
  momentumY: number;
  momentumZ: number;
}

export interface HoveredTechNode {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

interface SceneOptions {
  techNodes: readonly TechNodeData[];
  onNodeSelect?: (nodeId: string) => void;
  onNodeHover?: (node: HoveredTechNode | null) => void;
  onCoreActivate?: () => void;
}

interface SceneConnection {
  line: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  glowLine: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
}

interface SceneTechNode {
  data: TechNodeData;
  group: THREE.Group;
  body: THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhysicalMaterial>;
  glow: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  connection: SceneConnection;
}

function damp(
  current: number,
  target: number,
  lambda: number,
  dt: number
): number {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

function organicDrift(time: number, axis: number, amplitude = 1): number {
  const phi = 1.6180339887;

  return (
    Math.sin(time * 0.7 + axis) * 0.6 +
    Math.sin(time * 0.7 * phi + axis * 2.1) * 0.25 +
    Math.sin(time * 0.7 * phi * phi + axis * 3.7) * 0.1 +
    Math.sin(time * 0.7 / phi + axis * 5.3) * 0.05
  ) * amplitude;
}

function asymmetricPulse(time: number, bpm = 60): number {
  const period = 60 / bpm;
  const beatTime = (time % period) / period;

  return beatTime < 0.2
    ? beatTime / 0.2
    : Math.exp(-4.5 * (beatTime - 0.2));
}

function disposeMaterial(material: THREE.Material | THREE.Material[]): void {
  if (Array.isArray(material)) {
    material.forEach((entry) => entry.dispose());
    return;
  }

  material.dispose();
}

function updatePointer(
  event: Pick<PointerEvent, "clientX" | "clientY">,
  domElement: HTMLCanvasElement,
  pointer: THREE.Vector2
): void {
  const rect = domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function createConnection(color: string): SceneConnection {
  const points = [new THREE.Vector3(), new THREE.Vector3()];

  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.18,
    })
  );

  const glowLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );

  return { line, glowLine };
}

function createTechNode(data: TechNodeData): SceneTechNode {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 32, 32),
    new THREE.MeshPhysicalMaterial({
      color: data.color,
      emissive: data.color,
      emissiveIntensity: 2.2,
      roughness: 0.18,
      metalness: 0.15,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.96,
    })
  );

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.26, 24, 24),
    new THREE.MeshBasicMaterial({
      color: data.color,
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );

  const connection = createConnection(data.color);

  body.userData.nodeId = data.id;
  glow.userData.nodeId = data.id;
  glow.renderOrder = 2;
  connection.glowLine.renderOrder = 1;

  group.add(glow);
  group.add(body);

  return { data, group, body, glow, connection };
}

function setLineEndpoints(
  geometry: THREE.BufferGeometry,
  start: THREE.Vector3,
  end: THREE.Vector3
): void {
  const position = geometry.attributes.position as THREE.BufferAttribute;
  position.setXYZ(0, start.x, start.y, start.z);
  position.setXYZ(1, end.x, end.y, end.z);
  position.needsUpdate = true;
}

function projectToCanvas(
  object: THREE.Object3D,
  camera: THREE.PerspectiveCamera,
  domElement: HTMLCanvasElement
): Pick<HoveredTechNode, "x" | "y"> {
  const rect = domElement.getBoundingClientRect();
  const projected = object.getWorldPosition(new THREE.Vector3()).project(camera);

  return {
    x: ((projected.x + 1) * 0.5) * rect.width,
    y: ((-projected.y + 1) * 0.5) * rect.height,
  };
}

export function initScene(
  container: HTMLDivElement,
  options: SceneOptions
): () => void {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 3.7;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.75, 128, 128),
    new THREE.MeshPhysicalMaterial({
      color: "#00E5FF",
      emissive: "#00E5FF",
      emissiveIntensity: 3,
      roughness: 0.05,
      metalness: 0.9,
      transmission: 0.25,
      clearcoat: 1,
      clearcoatRoughness: 0,
    })
  );
  core.userData.kind = "core";
  scene.add(core);

  const coreMaterial = core.material;

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.28, 0.024, 24, 160),
    new THREE.MeshBasicMaterial({ color: "#00E5FF" })
  );
  ring.rotation.x = Math.PI / 2.5;
  ring.rotation.y = 0.3;
  scene.add(ring);

  const sceneTechNodes = options.techNodes.map(createTechNode);
  sceneTechNodes.forEach(({ group, connection }) => {
    scene.add(connection.glowLine);
    scene.add(connection.line);
    scene.add(group);
  });

  const interactiveObjects = sceneTechNodes.flatMap(({ body, glow }) => [
    body,
    glow,
  ]);

  const relatedNodeIdsByNode = new Map(
    options.techNodes.map((techNode) => [
      techNode.id,
      new Set(getRelatedTechnologyIds(techNode.id)),
    ])
  );

  const ambient = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambient);

  const keyLight = new THREE.PointLight(0x00e5ff, 30, 20);
  keyLight.position.set(3, 3, 3);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x0077ff, 18, 20);
  rimLight.position.set(-3, 2, 3);
  scene.add(rimLight);

  const pulseLight = new THREE.PointLight(0x00ffcc, 0, 15);
  pulseLight.position.set(0, 0, 3);
  scene.add(pulseLight);

  const mouse: MouseState = {
    rawX: 0,
    rawY: 0,
    smoothX: 0,
    smoothY: 0,
    velX: 0,
    velY: 0,
    prevRawX: 0,
    prevRawY: 0,
  };

  const ringState: RingState = {
    baseAngularVelocity: 0.0015,
    momentumX: 0,
    momentumY: 0,
    momentumZ: 0,
  };

  let coreRotXTarget = 0;
  let coreRotYTarget = 0;
  let coreRotXCurrent = 0;
  let coreRotYCurrent = 0;
  let emissiveCurrent = 3;
  let hoveredNodeId: string | null = null;
  let frameId = 0;

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(2, 2);
  const clock = new THREE.Clock();
  let lastTime = 0;

  const getHoveredNode = (): SceneTechNode | undefined => {
    raycaster.setFromCamera(pointer, camera);
    const [intersection] = raycaster.intersectObjects(interactiveObjects, false);
    const nodeId = intersection?.object.userData.nodeId as string | undefined;

    return sceneTechNodes.find((techNode) => techNode.data.id === nodeId);
  };

  const isCoreHit = (): boolean => {
    raycaster.setFromCamera(pointer, camera);
    const [intersection] = raycaster.intersectObject(core, false);
    return Boolean(intersection);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const nx = (event.clientX / window.innerWidth) * 2 - 1;
    const ny = -(event.clientY / window.innerHeight) * 2 + 1;

    mouse.rawX = nx;
    mouse.rawY = ny;
  };

  const handlePointerMove = (event: PointerEvent) => {
    updatePointer(event, renderer.domElement, pointer);
  };

  const handlePointerLeave = () => {
    pointer.set(2, 2);
    hoveredNodeId = null;
    renderer.domElement.style.cursor = "default";
    options.onNodeHover?.(null);
  };

  const handleClick = (event: MouseEvent) => {
    updatePointer(event, renderer.domElement, pointer);
    const clickedNode = getHoveredNode();

    if (clickedNode) {
      options.onNodeSelect?.(clickedNode.data.id);
      return;
    }

    if (isCoreHit()) {
      options.onCoreActivate?.();
    }
  };

  const handleResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", handleResize);
  renderer.domElement.addEventListener("pointermove", handlePointerMove);
  renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
  renderer.domElement.addEventListener("click", handleClick);

  const animate = () => {
    frameId = requestAnimationFrame(animate);

    const time = clock.getElapsedTime();
    const dt = Math.min(time - lastTime, 0.05);
    lastTime = time;

    mouse.velX = (mouse.rawX - mouse.prevRawX) / (dt + 0.001);
    mouse.velY = (mouse.rawY - mouse.prevRawY) / (dt + 0.001);
    mouse.prevRawX = mouse.rawX;
    mouse.prevRawY = mouse.rawY;

    mouse.smoothX = damp(mouse.smoothX, mouse.rawX, 3.5, dt);
    mouse.smoothY = damp(mouse.smoothY, mouse.rawY, 3.5, dt);

    const driftX = organicDrift(time, 0, 0.11);
    const driftY = organicDrift(time, 1.57, 0.08);
    const driftZ = organicDrift(time, 3.14, 0.045);

    core.position.set(driftX, driftY, driftZ);

    const heartbeat = asymmetricPulse(time, 50);
    const breatheY = 1 + heartbeat * 0.045;
    const breatheXZ = 1 + heartbeat * 0.02;
    core.scale.set(breatheXZ, breatheY, breatheXZ);

    const targetEmissive = 2.5 + heartbeat * 3.5;
    emissiveCurrent = damp(emissiveCurrent, targetEmissive, 8, dt);
    coreMaterial.emissiveIntensity = emissiveCurrent;
    pulseLight.intensity = heartbeat * 22;

    keyLight.position.x = 3 + Math.sin(time * 0.4) * 0.8;
    keyLight.position.y = 3 + Math.cos(time * 0.3) * 0.6;

    const awarenessLimit = 0.26;
    coreRotXTarget = mouse.smoothY * awarenessLimit;
    coreRotYTarget = mouse.smoothX * awarenessLimit;

    const microRotX = Math.sin(time * 1.3 + 1.1) * 0.008;
    const microRotY = Math.cos(time * 0.9 + 2.4) * 0.006;
    const intrinsicSpin = time * 0.06;

    coreRotXCurrent = damp(coreRotXCurrent, coreRotXTarget + microRotX, 4.5, dt);
    coreRotYCurrent = damp(
      coreRotYCurrent,
      coreRotYTarget + microRotY + intrinsicSpin,
      4.5,
      dt
    );

    core.rotation.x = coreRotXCurrent;
    core.rotation.y = coreRotYCurrent;

    ringState.momentumX += mouse.velY * 0.0008;
    ringState.momentumY += mouse.velX * 0.0008;

    const momentumDecay = 0.92;
    ringState.momentumX *= Math.pow(momentumDecay, dt * 60);
    ringState.momentumY *= Math.pow(momentumDecay, dt * 60);

    ring.rotation.z +=
      (ringState.baseAngularVelocity + ringState.momentumZ) * dt * 60;
    ring.rotation.x += ringState.momentumX * dt * 60;
    ring.rotation.y += ringState.momentumY * dt * 60;

    const naturalTiltX = Math.PI / 2.5;
    const naturalTiltY = 0.3 + Math.sin(time * 0.18) * 0.08;
    ring.rotation.x = damp(
      ring.rotation.x,
      naturalTiltX + ringState.momentumX * 0.4,
      0.8,
      dt
    );
    ring.rotation.y = damp(ring.rotation.y, naturalTiltY, 0.3, dt);
    ring.position.copy(core.position);

    sceneTechNodes.forEach((techNode) => {
      const orbitAngle = time * techNode.data.orbitSpeed + techNode.data.angleOffset;
      const orbitTilt = techNode.data.orbitRadius > 1.5 ? 0.12 : -0.08;
      const verticalOffset =
        Math.sin(orbitAngle * 1.7 + techNode.data.angleOffset) * 0.09 +
        Math.sin(time * 0.6 + techNode.data.angleOffset) * 0.03;
      const depthOffset = Math.sin(orbitAngle * 0.85) * 0.1;

      techNode.group.position.set(
        core.position.x + Math.cos(orbitAngle) * techNode.data.orbitRadius,
        core.position.y + verticalOffset + orbitTilt,
        core.position.z +
          Math.sin(orbitAngle) * techNode.data.orbitRadius +
          depthOffset
      );

      techNode.group.rotation.y = orbitAngle;

      setLineEndpoints(techNode.connection.line.geometry, core.position, techNode.group.position);
      setLineEndpoints(
        techNode.connection.glowLine.geometry,
        core.position,
        techNode.group.position
      );
    });

    const hoveredNode = getHoveredNode();
    hoveredNodeId = hoveredNode?.data.id ?? null;
    const coreHovered = !hoveredNode && isCoreHit();
    renderer.domElement.style.cursor = hoveredNodeId || coreHovered ? "pointer" : "default";

    if (hoveredNode) {
      const position = projectToCanvas(hoveredNode.group, camera, renderer.domElement);
      options.onNodeHover?.({
        id: hoveredNode.data.id,
        name: hoveredNode.data.name,
        color: hoveredNode.data.color,
        x: position.x,
        y: position.y,
      });
    } else {
      options.onNodeHover?.(null);
    }

    const relatedNodeIds = hoveredNodeId
      ? relatedNodeIdsByNode.get(hoveredNodeId) ?? new Set<string>()
      : new Set<string>();

    sceneTechNodes.forEach((techNode) => {
      const isHovered = techNode.data.id === hoveredNodeId;
      const isRelated = relatedNodeIds.has(techNode.data.id);
      const isPrimary = isHovered || isRelated;
      const dimTarget = hoveredNodeId ? (isPrimary ? 0.98 : 0.45) : 0.96;
      const scaleTarget = isHovered ? 1.28 : isRelated ? 1.08 : 1;
      const glowScaleTarget = isHovered ? 1.64 : isRelated ? 1.2 : 1;
      const glowOpacityTarget = isHovered ? 0.66 : isRelated ? 0.3 : hoveredNodeId ? 0.1 : 0.24;
      const emissiveTarget = isHovered ? 5.2 : isRelated ? 3.2 : 2.2 + heartbeat * 0.5;
      const lineOpacityTarget = isHovered ? 0.7 : isRelated ? 0.3 : hoveredNodeId ? 0.08 : 0.18;
      const lineGlowOpacityTarget = isHovered
        ? 0.78
        : isRelated
          ? 0.18
          : hoveredNodeId
            ? 0.04
            : 0.08;

      const nextScale = damp(techNode.group.scale.x, scaleTarget, 10, dt);
      const nextGlowScale = damp(techNode.glow.scale.x, glowScaleTarget, 8, dt);
      const nextGlowOpacity = damp(
        techNode.glow.material.opacity,
        glowOpacityTarget,
        8,
        dt
      );
      const nextOpacity = damp(techNode.body.material.opacity, dimTarget, 10, dt);
      const nextEmissive = damp(
        techNode.body.material.emissiveIntensity,
        emissiveTarget,
        10,
        dt
      );
      const nextLineOpacity = damp(
        techNode.connection.line.material.opacity,
        lineOpacityTarget,
        8,
        dt
      );
      const nextGlowLineOpacity = damp(
        techNode.connection.glowLine.material.opacity,
        lineGlowOpacityTarget,
        8,
        dt
      );

      techNode.group.scale.setScalar(nextScale);
      techNode.glow.scale.setScalar(nextGlowScale);
      techNode.glow.material.opacity = nextGlowOpacity;
      techNode.body.material.opacity = nextOpacity;
      techNode.body.material.emissiveIntensity = nextEmissive;
      techNode.connection.line.material.opacity = nextLineOpacity;
      techNode.connection.glowLine.material.opacity = nextGlowLineOpacity;
    });

    renderer.render(scene, camera);
  };

  animate();

  return () => {
    cancelAnimationFrame(frameId);

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("resize", handleResize);
    renderer.domElement.removeEventListener("pointermove", handlePointerMove);
    renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
    renderer.domElement.removeEventListener("click", handleClick);
    renderer.domElement.style.cursor = "default";
    options.onNodeHover?.(null);

    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        disposeMaterial(object.material);
      }

      if (object instanceof THREE.Line) {
        object.geometry.dispose();
        disposeMaterial(object.material);
      }
    });

    renderer.dispose();
    renderer.domElement.parentNode?.removeChild(renderer.domElement);
  };
}
