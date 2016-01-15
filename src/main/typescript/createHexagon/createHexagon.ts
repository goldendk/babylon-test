var camera:BABYLON.FreeCamera = null;
window.addEventListener('DOMContentLoaded', function(){
    // get the canvas DOM element
    var canvas:HTMLCanvasElement  = <HTMLCanvasElement>document.getElementById('renderCanvas');

    // load the 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    // call the createScene function
    var createScene =function(){
            // This creates a basic Babylon Scene object (non-mesh)
            var scene = new BABYLON.Scene(engine);

            // This creates and positions a free camera (non-mesh)
            camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3( 15.527396785231963, -33.445421540172354, -42.370168929828516), scene);

            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());

            // This attaches the camera to the canvas
            camera.attachControl(canvas, true);

        camera.rotation = new BABYLON.Vector3(-0.63, 0.02,-0);

        var spot = new BABYLON.PointLight("spot", new BABYLON.Vector3(19, 0, -50), scene);
        spot.intensity = 0.55;
        spot.diffuse = new BABYLON.Color3(1, 1, 1);
       // spot.specular = new BABYLON.Color3(0, 0, 0);


        var tile:BABYLON.Mesh = UITool.createTile(scene, "HighLand01_5.png", 2, new BABYLON.Color3(0.79, 0.15, 0.15));


        window.addEventListener("click", function (evt) {
                var pickResult = scene.pick(scene.pointerX, scene.pointerY);
                if (pickResult.hit) {
                    console.log(pickResult.pickedMesh.name);
                }
            });




            return scene;
    };

    // call the createScene function
    var scene = createScene();

    // run the render loop
    engine.runRenderLoop(function(){
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
});






