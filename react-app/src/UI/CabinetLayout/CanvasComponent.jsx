import React, {useState} from 'react';
import {Image, Rect, Transformer} from "react-konva";
import useImage from "use-image";

const CanvasComponent = ({ shapeProps, isSelected, onSelect, onChange, imageUrl,setTooltipText,setTooltipPosition, setTooltipVisible, componentName, dragAble,strokable, onSelection,isStoke}) => {

    const [image] = useImage(imageUrl);
    const [stroke,setStroke] = useState(isStoke === undefined ? false : isStoke);

    const shapeRef = React.useRef();
    const trRef = React.useRef();

    const onClick = () => {
        if(onSelect !== undefined) onSelect()
        if (strokable !== undefined){
            if(isStoke === undefined){
                onSelection(!stroke)
                setStroke(!stroke)
            }
        }
    }

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Image
                width={15}
                height={0}
                onClick={onClick}
                onTap={onClick}
                stroke={stroke ? "green" : ""}
                strokeWidth={stroke ? 5 : 0}
                ref={shapeRef}
                {...shapeProps}
                draggable={dragAble}
                image={image}
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    const rotation = node.rotation();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        // sX: Math.max(5, node.width() * scaleX),
                        // sY: Math.max(node.height() * scaleY),
                        scaleX:scaleX,
                        scaleY:scaleY,
                        rotation: rotation
                    });
                }}

                onMouseMove={(e)=>{
                    if(setTooltipText!== undefined || setTooltipVisible !== undefined || setTooltipPosition !== undefined)
                    {
                        let mousePos = e.target.getStage().getPointerPosition();
                        let scale = e.target.getStage().getAbsoluteScale()
                        setTooltipVisible(true)
                        setTooltipPosition({x: mousePos.x/scale.x+10,y:mousePos.y-10})
                        setTooltipText(componentName)
                    }

                }}

                onMouseOut={evt => {
                    if(setTooltipVisible!== undefined){
                        setTooltipVisible(false)
                    }
                }}

                onDragMove={evt => {
                    if(setTooltipVisible!== undefined){
                        setTooltipVisible(false)
                    }
                }}


            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
};


export default CanvasComponent;