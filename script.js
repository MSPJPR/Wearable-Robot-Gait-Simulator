let scene, camera, renderer, robot;
let speed = 0.05;
let jointFlexibility = 0.5;
let walkingAngle = 0;
let angleIncrement = 0.1;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gaitCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let light = new THREE.AmbientLight(0x404040, 2);
    scene.add(light);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    robot = new THREE.Group();
    createRobot(robot);
    scene.add(robot);

    camera.position.z = 5;

    animate();
}

function createRobot(robot) {
    let body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1, 12), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    body.position.y = 1.5;
    robot.add(body);

    let leftLeg = createLeg(-0.25);
    let rightLeg = createLeg(0.25);

    robot.add(leftLeg);
    robot.add(rightLeg);
}

function createLeg(offset) {
    let upperLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1, 12), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
    upperLeg.position.y = 0.5;
    upperLeg.rotation.z = Math.PI / 4;

    let lowerLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1, 12), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    lowerLeg.position.y = -0.5;
    lowerLeg.rotation.z = Math.PI / 4;

    let leg = new THREE.Group();
    leg.add(upperLeg);
    leg.add(lowerLeg);
    leg.position.x = offset;

    return leg;
}

function animate() {
    requestAnimationFrame(animate);

    walkingAngle += speed;

    robot.rotation.y += 0.01;
    updateLegs(walkingAngle);

    renderer.render(scene, camera);
}

function updateLegs(angle) {
    let leftLeg = robot.children[1];
    let rightLeg = robot.children[2];

    leftLeg.rotation.x = Math.sin(angle) * jointFlexibility;
    rightLeg.rotation.x = -Math.sin(angle) * jointFlexibility;
}

document.getElementById('speedSlider').addEventListener('input', function (event) {
    speed = parseFloat(event.target.value);
    document.getElementById('speedValue').innerText = speed.toFixed(2);
});

document.getElementById('jointSlider').addEventListener('input', function (event) {
    jointFlexibility = parseFloat(event.target.value);
    document.getElementById('jointValue').innerText = jointFlexibility.toFixed(2);
});

init();
