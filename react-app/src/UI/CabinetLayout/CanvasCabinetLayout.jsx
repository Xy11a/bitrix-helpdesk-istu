import React, {useRef, useState,useEffect} from 'react';
import Block from "../Block/Block";
import {Image, Layer, Stage, Text} from "react-konva";
import CanvasComponent from "./CanvasComponent";
import useImage from "use-image";
import Icon from "../Icon/Icon";
import CanvasObjectService from "../../API/CanvasObjectService";


export const getAllObjects = async (cabinet,objectList,setObjectList) => {
    let allObjects = await CanvasObjectService.getAllCanvasObjectFromCabinet(cabinet.number)
    setObjectList(parseObjects(allObjects,objectList))
}


const CanvasCabinetLayout = ({cabinet,updateCabinets}) => {
    const divRef = useRef(null)
    const [containerWidth,setContainerWidth] = useState(0)
    const [objectList, setObjectList] = useState([]);
    const [selectedId, selectShape] = useState(null);

    ///////////////////////////////////////////////////////////////////////

    useEffect(() => {
        getAllObjects(cabinet,objectList,setObjectList)
        if (divRef.current?.offsetWidth) {
            setContainerWidth(divRef.current.firstChild.offsetWidth)
        }
    }, [cabinet])

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    ///////////////////////////////////////////////////////////////////////
    const [backgroundImage] = useImage("http://xyla.istu.webappz.ru" + cabinet.cabinetLink)
    const [tooltipText, setTooltipText] = useState("")
    const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0})
    const [tooltipVisible, setTooltipVisible] = useState(false)

    const createObject = (objectType) => {
        let newObjectName = objectType + "-" + (objectList.length + 1)

        let newObject = {
            id: null,
            canvasId: 'rect' + newObjectName,
            objectName: newObjectName,
            cabinet: cabinet.number,
            type:objectType,
            shapeProps: {
                x: 150,
                y: 150,
                width: 150,
                height: 100,
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
            }
        }
        setObjectList([...objectList, newObject])
    }

    const deleteObject = (id,devName) => {
        if(id){
            CanvasObjectService.deleteCanvasObjectFromCabinet(id)
        }

        let newObjectList = [...objectList]
        newObjectList=newObjectList.filter((object) => object.objectName !== devName)

        setObjectList(newObjectList)
    }


    return (
        <div>
            <div ref={divRef} className='d-flex align-items-stretch justify-content-between'>
                <Block className='w-75 border border-dark bg-white rounded-3 overflow-x-hidden'>
                    <Stage className='border border-black border-opacity-50' width={containerWidth} height={450}
                           onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
                        <Layer>
                            <Image width={containerWidth} height={450} image={backgroundImage}/>
                        </Layer>
                        <Layer>
                            {objectList.map((rect) => {
                                return (
                                    <CanvasComponent
                                        componentName={rect.objectName}
                                        setTooltipText={setTooltipText}
                                        setTooltipPosition={setTooltipPosition}
                                        setTooltipVisible={setTooltipVisible}
                                        imageUrl={"http://xyla.istu.webappz.ru/asu/kursach/files/rectangle.svg"}
                                        dragAble={true}
                                        key={rect.canvasId}
                                        shapeProps={rect.shapeProps}
                                        isSelected={rect.canvasId === selectedId}
                                        onSelect={() => {
                                            selectShape(rect.canvasId);
                                        }}
                                        onChange={(newAttrs) => {
                                            let newObjectList = [...objectList];
                                            newObjectList.find((d) => d.canvasId === rect.canvasId).shapeProps = newAttrs
                                            setObjectList(newObjectList);
                                        }}
                                    />
                                );
                            })}
                        </Layer>
                        <Layer>
                            <Text text={tooltipText} fontFamily='Calibri' fontSize={18} padding={5} fill='black' stroke='black' visible={tooltipVisible} x={tooltipPosition.x} y={tooltipPosition.y}/>
                        </Layer>
                    </Stage>
                </Block>
                <Block className='w-25 border border-dark bg-white rounded-3'>
                    <div
                        className='d-flex p-1 justify-content-center align-items-center border-bottom border-black border-opacity-50'>
                        <h4>Панель инструментов</h4></div>
                    <div className='d-flex p-1 justify-content-between align-items-stretch flex-wrap'>
                        <button className='my-1 p-1 border border-dark btn btn-primary'
                                style={{width: "100px", height: "100px"}} onClick={() => { createObject("Rectangle")
                        }}>
                            <div className='text-center'>Rectangle</div>
                        </button>
                    </div>
                </Block>
            </div>
            <Block>
                <form className='p-2' onSubmit={(e) => {
                    e.preventDefault()
                    console.log(objectList)
                }}>
                    <table className='w-100'>
                        <tbody>
                        {objectList.map((object, i) =>
                            <tr className='border border-black border-opacity-50 w-100 rounded-3' key={i}>
                                <td className='px-2'>{object.objectName}</td>
                                {object.id ? <td colSpan={100}>
                                        <div className='d-flex w-100 justify-content-end'>
                                            <button type={"button"} className='btn btn-danger' onClick={()=> deleteObject(object.id,object.objectName)}>
                                                <Icon height={24} width={24} src={"/files/delete.svg"}/>
                                            </button>
                                        </div>
                                    </td> :
                                    <td colSpan={100}>
                                        <div className='d-flex w-100 justify-content-end'>
                                            <button type={"button"} className='btn btn-primary' onClick={()=> deleteObject(null,object.objectName)}>
                                                <Icon height={24} width={24} src={"/files/eraser.svg"} />
                                            </button>
                                        </div>
                                    </td>}
                            </tr>
                        )}
                        </tbody>
                    </table>

                    <button className="btn btn-primary w-100 my-1" type={"submit"} onClick={()=> {CanvasObjectService.addCanvasObjectToCabinet(objectList).then(()=>{updateCabinets(); getAllObjects(cabinet,objectList,setObjectList);})}}>Отправить</button>
                </form>
            </Block>
        </div>
    );
};

export function parseObjects(newElements) {
    let newArr = []
    newElements.forEach((elem) => {
        let newObjectName = elem.type + "-" + (newArr.filter((el) => elem.type === el.type).length + 1)
        let newObject = {
            id: elem.id,
            canvasId: 'rect' + newObjectName,
            objectName: newObjectName,
            cabinet: elem.cabinet,
            type: elem.type,
            shapeProps: {
                x: parseFloat(elem.x),
                y:  parseFloat(elem.y),
                width: 150,
                height: 100,
                rotation:  parseFloat(elem.rotation),
                scaleX:  parseFloat(elem.scaleX),
                scaleY:  parseFloat(elem.scaleY),
            }
        }
        newArr.push(newObject)
    })
    return newArr
}

export default CanvasCabinetLayout;