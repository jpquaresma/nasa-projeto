document.addEventListener('DOMContentLoaded', (event) => {
    initStarField();

    const enterButton = document.getElementById('enter-button');
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            enterButton.classList.add('zoom-in');
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
});

function initStarField() {
    const starField = document.getElementById('star-field');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    starField.appendChild(renderer.domElement);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 2,
        transparent: true
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 1;

    function animate() {
        requestAnimationFrame(animate);
        stars.rotation.y += 0.0002;
        stars.rotation.x += 0.0001;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
};

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});