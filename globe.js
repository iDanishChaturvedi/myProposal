// Load Three.js Globe
// Import Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("globeCanvas") });

renderer.setSize(500, 500);
document.body.appendChild(renderer.domElement);

// Create a Sphere for the Globe
const geometry = new THREE.SphereGeometry(2, 32, 32);
const material = new THREE.MeshBasicMaterial({ 
    map: new THREE.TextureLoader().load("images/globe.jpg") 
});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

camera.position.z = 5;

// Convert Lat/Lon to 3D Coordinates
function latLonToXYZ(lat, lon, radius = 2) {
    let phi = (90 - lat) * (Math.PI / 180);
    let theta = (lon + 180) * (Math.PI / 180);

    let x = -radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.cos(phi);
    let z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
}

// Create a Glowing Dot for Hyderabad (17.3850°N, 78.4867°E)
const hyderabadPos = latLonToXYZ(17.3850, 78.4867);
const hyderabadDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff0000, emissive: 0xff0000 })
);
hyderabadDot.position.copy(hyderabadPos);
scene.add(hyderabadDot);

// Create a Glowing Dot for Chittagong (22.3569°N, 91.7832°E)
const chittagongPos = latLonToXYZ(22.3569, 91.7832);
const chittagongDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, emissive: 0x00ff00 })
);
chittagongDot.position.copy(chittagongPos);
scene.add(chittagongDot);

// Create a Flight Path (Curved Line)
const flightCurve = new THREE.CatmullRomCurve3([
    hyderabadPos,
    new THREE.Vector3(0, 3, 0),  // Midpoint (curved path)
    chittagongPos
]);

const flightGeometry = new THREE.TubeGeometry(flightCurve, 100, 0.02, 8, false);
const flightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const flightPath = new THREE.Mesh(flightGeometry, flightMaterial);
scene.add(flightPath);

// Animate the Globe Rotation
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.005; // Slow rotation
    renderer.render(scene, camera);
}
animate();