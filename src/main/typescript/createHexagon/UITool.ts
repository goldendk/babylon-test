module UITool{
    var TILE_COUNT:number = 0;

    export function createTile(scene:BABYLON.Scene, texture:String, size:number, color:BABYLON.Color3):BABYLON.Mesh{
        TILE_COUNT ++;
        var center_x:number = 0;
        var center_y:number = 0;
        var points:Array<any> = [];
        for (var i = 5; i >= 0; i--) {
            var _angle:number = 2 * Math.PI / 6 * (i+0.5);
            var x_i:number = center_x + size * Math.cos(_angle);
            var y_i:number = center_y + size * Math.sin(_angle);
            points[i] = {
                x: x_i,
                y: y_i,
                angle: _angle % Math.PI
            };
            console.log(JSON.stringify(points[i]));
        }
        var meshs:Array<BABYLON.Mesh> = [];
        for (var j = 5; j >= 0; j--){
            var props = {
                "width": size * 1.21,
                "height": 0.1 * size,
                "updatable": true,
                "depth": 0.15 * size
            };
            var box:BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox("box"  + j + "_" + TILE_COUNT, props, scene);
            box.edgesWidth = 2;
            box.rotation.z =<number> points[j].angle + (0.5 * Math.PI);
            box.position.x =<number> points[j].x;
            box.position.y =<number> points[j].y;
            meshs.push(box);
        }

        var tileMesh:BABYLON.Mesh = BABYLON.Mesh.MergeMeshes(meshs);
        tileMesh.name = "Tile" + TILE_COUNT;
        var tileColor =  new BABYLON.StandardMaterial("tileColor" + TILE_COUNT, scene);
        tileColor.diffuseColor = color;
        tileColor.emissiveColor = new BABYLON.Color3(color.r /3 , color.g / 2, color.g / 2);
        tileMesh.material = tileColor;

        var disc = BABYLON.Mesh.CreateDisc("disc", 1.2 * size, 6, scene, false, BABYLON.Mesh.DEFAULTSIDE);
        disc.translate(new BABYLON.Vector3(0, 0 , 1), size * 0.15 / 2);

        var tileFace = new BABYLON.StandardMaterial("aTileFace" + TILE_COUNT, scene);
        tileFace.diffuseTexture = new BABYLON.Texture("/resources/img/" + texture, scene);
        disc.material = tileFace;
        disc.parent = tileMesh;
        return tileMesh
    }


}