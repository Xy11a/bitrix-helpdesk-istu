import React, {useEffect, useRef, useState} from 'react';
import {Image, Layer, Stage, Text} from "react-konva";
import useImage from "use-image";
import CanvasComponent from "./CanvasComponent";
import {getAllObjects} from "./CanvasCabinetLayout";
import DeviceService from "../../API/DeviceService";
import {parseDevices} from "./CanvasDeviceLayout";


let deviceTypes = [
    {
        type: "Computer",
        buttonIconLink: "../files/pc.svg",
        iconLink: "../files/pc-outline.svg",
        data: {ip: null, mac: null, inv: null},
        inputDataProps: {
            ip: {type: "text", name: "computer-ip-", placeholder: "0.0.0.0"},
            mac: {type: "text", name: "computer-mac-", placeholder: "MM:MM:MM:SS:SS:SS"},
            inv: {type: "text", name: "computer-inv-", placeholder: "Инвертарный номер"}
        }
    },
    {
        type: "Printer",
        buttonIconLink: "../files/printer.svg",
        iconLink: "../files/printer.svg",
        data: {ip: null, mac: null, inv: null},
        inputDataProps: {
            ip: {type: "text", name: "printer-ip-", placeholder: "0.0.0.0"},
            mac: {type: "text", name: "printer-mac-", placeholder: "MM:MM:MM:SS:SS:SS"},
            inv: {type: "text", name: "printer-inv-", placeholder: "Инвертарный номер"}
        }
    },
    {
        type: "Projector",
        buttonIconLink: "../files/projector.svg",
        iconLink: "../files/projector.svg",
        data: {inv: null},
        inputDataProps: {
            inv: {type: "text", name: "projector-inv-", placeholder: "Инвертарный номер"}
        }
    },
]


const CabinetDeviceLayoutSelect = ({cabinet, devices, setDevices,isReadOnly}) => {

    const divRef = useRef(null)
    const [selectedId, selectShape] = React.useState(null);
    const [containerWidth, setContainerWidth] = useState(300)
    const [backgroundImage] = useImage("http://xyla.istu.webappz.ru" + cabinet.cabinetLink)
    const [objectList, setObjectList] = useState([]);
    const [tooltipText, setTooltipText] = useState("")
    const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0})
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const [devicesList, setDevicesList] = React.useState([]);
    const [selectedDeviceList, setSelectedDeviceList] = useState([])


    useEffect(() => {
        getAll(cabinet, setDevicesList)
        getAllObjects(cabinet, objectList, setObjectList)
        if (divRef.current?.offsetWidth) {
            setContainerWidth(divRef.current.firstChild.offsetWidth)
        }
    }, [cabinet])


    const getAll = async (cabinet, setDevicesList) => {
        let allDevices = await DeviceService.getAllDevicesFromCabinet(cabinet.number)
        setDevicesList(parseDevices(allDevices))
    }

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };


    return (
        <div ref={divRef}>
            <Stage className='border border-black border-opacity-50' width={containerWidth} height={450}
                   onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
                <Layer>
                    <Image width={containerWidth} height={450} image={backgroundImage}/>
                </Layer>
                <Layer>
                    {objectList.map((object) => {
                        return (
                            <CanvasComponent
                                componentName={object.objectName}
                                imageUrl={"http://xyla.istu.webappz.ru/asu/kursach/files/rectangle.svg"}
                                key={object.canvasId}
                                dragAble={false}
                                shapeProps={object.shapeProps}
                            />
                        )
                    })}
                </Layer>
                <Layer>
                    {devicesList.map((rect) => {
                        return (
                            <CanvasComponent
                                dragAble={false}
                                componentName={rect.deviceName}
                                setTooltipText={setTooltipText}
                                setTooltipPosition={setTooltipPosition}
                                setTooltipVisible={setTooltipVisible}
                                imageUrl={deviceTypes.find((t) => t.type === rect.type).iconLink}
                                key={rect.canvasId}
                                shapeProps={rect.shapeProps}
                                onSelection={(flag) => {
                                    if (flag) {
                                            setSelectedDeviceList([...selectedDeviceList, rect.id])
                                            setDevices([...devices, rect.id])
                                    } else {
                                            let newSelection = [...selectedDeviceList]
                                            newSelection = newSelection.filter((el)=> el !== rect.id)
                                            setSelectedDeviceList([...newSelection])
                                            setDevices([...newSelection])
                                    }
                                    console.log(selectedDeviceList)
                                }}
                                strokable={!isReadOnly}
                                isStoke={isReadOnly ? devices.includes(rect.id) : undefined}
                            />
                        );
                    })}
                </Layer>
                <Layer>
                    <Text text={tooltipText} fontFamily='Calibri' fontSize={18} padding={5} fill='black'
                          stroke='black' visible={tooltipVisible} x={tooltipPosition.x} y={tooltipPosition.y}/>
                </Layer>
            </Stage>
            <div>
                <table className='w-100'>
                    <tbody>
                    {
                        (isReadOnly ? devicesList.filter((el)=> devices.includes(el.id)) : devicesList.filter((el)=> selectedDeviceList.includes(el.id))).map((device, i) =>
                            <tr className='border border-black border-opacity-50 w-100' key={device.deviceName + "i"}>
                                <td className='border border-black px-2'>{device.deviceName}</td>
                                {
                                    Object.keys(device.inputDataProps).map((input, j) =>
                                        <td className='border-start border-black border-opacity-50' key={j}>
                                            <input
                                                className='form-control'
                                                value={device.data[input] ? device.data[input] : ""}
                                                type={device.inputDataProps[input].type}
                                                name={device.inputDataProps[input].name + device.deviceName[device.deviceName.length - 1]}
                                                placeholder={device.inputDataProps[input].placeholder}
                                                required={true}
                                                readOnly={true}
                                            />
                                        </td>
                                    )
                                }
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};




export default CabinetDeviceLayoutSelect;