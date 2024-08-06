// function insertObjectsIntoQuadtree() {
//     const boundary = { x: 0, y: 0, width: canvas.width * 2, height: canvas.height * 2 };
//     quadtree = new Quadtree(boundary, capacity); // Reset the quadtree

//     mapObjects.forEach(mapObject => {
//         quadtree.insert(mapObject);
//     });

//     objects.forEach(object => {
//         quadtree.insert(object);
//     });

//     xpDropped.forEach(xp => {
//         quadtree.insert(xp);
//     });
// }
// function queryVisibleObjects() {
//     const range = {
//         x: camera.x - canvas.width / 2,
//         y: camera.y - canvas.height / 2,
//         width: canvas.width,
//         height: canvas.height
//     };

//     const visibleMapObjects = quadtree.query(range);
//     const visibleObjects = quadtree.query(range);
//     const visibleXp = quadtree.query(range);

//     return { visibleMapObjects, visibleObjects, visibleXp };
// }
// function updateDynamicObjects() {
//     objects.forEach(object => {
//         if (object.needsUpdate) { // Check if the object needs to be updated in the quadtree
//             quadtree.insert(object); // Re-insert object in the quadtree
//         }
//     });
// }
