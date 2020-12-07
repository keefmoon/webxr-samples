
const axisKeyBox = function (boxLabel, scene) {

    const box = BABYLON.MeshBuilder.CreateBox(boxLabel, {height: 0.1, width: 0.1, depth: 0.1});

    //Create dynamic texture
    var texture = new BABYLON.DynamicTexture("dynamic texture", {width:256, height:256}, scene);   
    var material = new BABYLON.StandardMaterial("material", scene);    				
    material.diffuseTexture = texture;
    box.material = material;
    
    //Add text to dynamic texture
    var font = "bold 300px Arial";
    texture.drawText(boxLabel, 50, 250, font, "green", "white", true, true);

    return box;
}

const createScene = function () {
    
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    // Axis Helper
    const originBox = axisKeyBox("O", scene);
    const xAxisBox = axisKeyBox("X", scene);
    xAxisBox.position.x = 1;
    const yAxisBox = axisKeyBox("Y", scene);
    yAxisBox.position.y = 1;
    const zAxisBox = axisKeyBox("Z", scene);
    zAxisBox.position.z = 1;

    const thumbnailBox1 = BABYLON.MeshBuilder.CreateBox("thumbnailBox1", {height: 1, width: 1, depth: 0.05});
    thumbnailBox1.position.y = 2;

    const environment = scene.createDefaultEnvironment();

    var xr = scene.createDefaultXRExperienceAsync({
        // define the floor meshes
        floorMeshes: [environment.ground]
    });

    return scene;
};

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
// Add your code here matching the playground format
const scene = createScene(); //Call the createScene function
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
        scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
});