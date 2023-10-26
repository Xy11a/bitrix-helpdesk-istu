



//////////////////////////////Conva Setup///////////////////////////////////////////////////









function fitStageIntoParentContainer() {

    var containerWidth = canvasParent.offsetWidth;

    screenScale = containerWidth / width;

    stage.width(width * screenScale);
    stage.height(height * screenScale);
    stage.scale({ x: screenScale, y: screenScale });
}

// fitStageIntoParentContainer();

window.addEventListener('resize', fitStageIntoParentContainer);


////////////////////////////////////////////////////////////////////////////////////////////
