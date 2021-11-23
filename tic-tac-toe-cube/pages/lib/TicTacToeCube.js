import * as THREE from "three";

export default class TicTacToeCube {
  constructor() {
    this.board = new THREE.Group();
    this.spheres = new THREE.Group();
    this.asterisks = new THREE.Group();
    this.boardLines = new THREE.Group();
    this.hiddenCubes = new THREE.Group();
    this.currentPlayer = "sphere";

    this.board.add(this.spheres);
    this.board.add(this.asterisks);
    this.board.add(this.boardLines);
    this.board.add(this.hiddenCubes);

    this._createBoard();
  }

  _createBoard() {
    // add vertical lines
    const verticalDimensions = { x: 4, y: 64, z: 4 };
    const verticalLeftFront = { x: -12, y: 0, z: 12 };
    const verticalLeftBack = { x: -12, y: 0, z: -12 };
    const verticalRightFront = { x: 12, y: 0, z: 12 };
    const verticalRightBack = { x: 12, y: 0, z: -12 };
    const verticalLineOffsets = [
      verticalLeftFront,
      verticalLeftBack,
      verticalRightFront,
      verticalRightBack,
    ];
    verticalLineOffsets.forEach((verticalLineOffset) => {
      const verticalBoardLine = this._boardLine({
        dimensions: verticalDimensions,
        offsets: verticalLineOffset,
      });
      this.boardLines.add(verticalBoardLine);
    });

    // add horizontal lines
    const horizontalDimensions = { x: 64, y: 4, z: 4 };
    const horizontalTopFront = { x: 0, y: 12, z: 12 };
    const horizontalTopBack = { x: 0, y: 12, z: -12 };
    const horizontalBottomFront = { x: 0, y: -12, z: 12 };
    const horizontalBottomBack = { x: 0, y: -12, z: -12 };
    const horizontalLineOffsets = [
      horizontalTopFront,
      horizontalTopBack,
      horizontalBottomFront,
      horizontalBottomBack,
    ];
    horizontalLineOffsets.forEach((horizontalLineOffset) => {
      const horizontalBoardLine = this._boardLine({
        dimensions: horizontalDimensions,
        offsets: horizontalLineOffset,
      });
      this.boardLines.add(horizontalBoardLine);
    });

    // add z-axis lines
    const zAxisDimensions = { x: 4, y: 4, z: 64 };
    const zAxisTopLeft = { x: -12, y: 12, z: 0 };
    const zAxisTopRight = { x: 12, y: 12, z: 0 };
    const zAxisBottomLeft = { x: -12, y: -12, z: 0 };
    const zAxisBottomRight = { x: 12, y: -12, z: 0 };
    const zAxisLineOffsets = [
      zAxisTopLeft,
      zAxisTopRight,
      zAxisBottomLeft,
      zAxisBottomRight,
    ];
    zAxisLineOffsets.forEach((zAxisLineOffset) => {
      const zAxisBoardLine = this._boardLine({
        dimensions: zAxisDimensions,
        offsets: zAxisLineOffset,
      });
      this.boardLines.add(zAxisBoardLine);
    });

    // add hidden cubes
    const topBackLeft = { x: -24, y: 24, z: -24 };
    const topBackMiddle = { x: 0, y: 24, z: -24 };
    const topBackRight = { x: 24, y: 24, z: -24 };
    const topMiddleLeft = { x: -24, y: 24, z: 0 };
    const topMiddleMiddle = { x: 0, y: 24, z: 0 };
    const topMiddleRight = { x: 24, y: 24, z: 0 };
    const topFrontLeft = { x: -24, y: 24, z: 24 };
    const topFrontMiddle = { x: 0, y: 24, z: 24 };
    const topFrontRight = { x: 24, y: 24, z: 24 };

    const middleBackLeft = { x: -24, y: 0, z: -24 };
    const middleBackMiddle = { x: 0, y: 0, z: -24 };
    const middleBackRight = { x: 24, y: 0, z: -24 };
    const middleMiddleLeft = { x: -24, y: 0, z: 0 };
    const middleMiddleMiddle = { x: 0, y: 0, z: 0 };
    const middleMiddleRight = { x: 24, y: 0, z: 0 };
    const middleFrontLeft = { x: -24, y: 0, z: 24 };
    const middleFrontMiddle = { x: 0, y: 0, z: 24 };
    const middleFrontRight = { x: 24, y: 0, z: 24 };

    const bottomBackLeft = { x: -24, y: -24, z: -24 };
    const bottomBackMiddle = { x: 0, y: -24, z: -24 };
    const bottomBackRight = { x: 24, y: -24, z: -24 };
    const bottomMiddleLeft = { x: -24, y: -24, z: 0 };
    const bottomMiddleMiddle = { x: 0, y: -24, z: 0 };
    const bottomMiddleRight = { x: 24, y: -24, z: 0 };
    const bottomFrontLeft = { x: -24, y: -24, z: 24 };
    const bottomFrontMiddle = { x: 0, y: -24, z: 24 };
    const bottomFrontRight = { x: 24, y: -24, z: 24 };

    const hiddenCubeOffsets = [
      topBackLeft,
      topBackMiddle,
      topBackRight,
      topMiddleLeft,
      topMiddleMiddle,
      topMiddleRight,
      topFrontLeft,
      topFrontMiddle,
      topFrontRight,

      middleBackLeft,
      middleBackMiddle,
      middleBackRight,
      middleMiddleLeft,
      middleMiddleMiddle,
      middleMiddleRight,
      middleFrontLeft,
      middleFrontMiddle,
      middleFrontRight,

      bottomBackLeft,
      bottomBackMiddle,
      bottomBackRight,
      bottomMiddleLeft,
      bottomMiddleMiddle,
      bottomMiddleRight,
      bottomFrontLeft,
      bottomFrontMiddle,
      bottomFrontRight,
    ];
    hiddenCubeOffsets.forEach((hiddenCubeOffset) => {
      const hiddenCube = this._hiddenCube({
        offsets: hiddenCubeOffset,
      });
      this.hiddenCubes.add(hiddenCube);
    });

    // testing spheres
    // this.spheres.add(this._sphere());

    // testing asterisks
    // this.asterisks.add(this._asterisk());
  }

  _boardLine({ dimensions, offsets }) {
    const boardLineGeometry = new THREE.BoxGeometry(
      dimensions.x,
      dimensions.y,
      dimensions.z
    );
    const boardLineMaterial = new THREE.MeshNormalMaterial();
    const boardLine = new THREE.Mesh(boardLineGeometry, boardLineMaterial);
    boardLine.position.x = offsets.x;
    boardLine.position.y = offsets.y;
    boardLine.position.z = offsets.z;
    return boardLine;
  }

  _hiddenCube({ offsets }) {
    const cubeGeometry = new THREE.BoxGeometry(12, 12, 12);
    const cubeMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = offsets.x;
    cube.position.y = offsets.y;
    cube.position.z = offsets.z;
    return cube;
  }

  addSphereOrAsterisk(offset) {
    if (this.currentPlayer === "sphere") {
      const sphere = this._sphere(offset);
      this.spheres.add(sphere);
      this.currentPlayer = "asterisk";
    } else if (this.currentPlayer === "asterisk") {
      const asterisk = this._asterisk(offset);
      this.asterisks.add(asterisk);
      this.currentPlayer = "sphere";
    }
  }

  _sphere(offset) {
    const sphereGeometry = new THREE.SphereGeometry(8);
    const sphereMaterial = new THREE.MeshNormalMaterial();
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = offset.x;
    sphere.position.y = offset.y;
    sphere.position.z = offset.z;
    return sphere;
  }

  _asterisk(offset) {
    const asteriskGroup = new THREE.Group();
    const asteriskGeometry = new THREE.BoxGeometry(4, 16, 4);
    const asteriskMaterial = new THREE.MeshNormalMaterial();
    const a1 = new THREE.Mesh(asteriskGeometry, asteriskMaterial);
    const a2 = new THREE.Mesh(asteriskGeometry, asteriskMaterial);
    const a3 = new THREE.Mesh(asteriskGeometry, asteriskMaterial);
    const a4 = new THREE.Mesh(asteriskGeometry, asteriskMaterial);
    const a5 = new THREE.Mesh(asteriskGeometry, asteriskMaterial);
    a2.rotation.z = Math.PI / 3;
    a2.rotation.y = Math.PI / 4;
    a3.rotation.z = -Math.PI / 3;
    a3.rotation.y = -Math.PI / 4;
    a4.rotation.z = -Math.PI / 3;
    a4.rotation.y = Math.PI / 4;
    a5.rotation.z = Math.PI / 3;
    a5.rotation.y = -Math.PI / 4;
    asteriskGroup.add(a1, a2, a3, a4, a5);
    asteriskGroup.position.x = offset.x;
    asteriskGroup.position.y = offset.y;
    asteriskGroup.position.z = offset.z;
    return asteriskGroup;
  }
}
