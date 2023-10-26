import React, {useEffect, useRef, useState} from 'react';
import Block from "../Block/Block";
import {Image, Layer, Stage, Text} from "react-konva";
import CanvasComponent from "./CanvasComponent";
import useImage from "use-image";
import DeviceService from "../../API/DeviceService";
import Badge from "../Badge/Badge";
import Icon from "../Icon/Icon";

let imgLock = <img width={16} height={16} src={"/files/lock.svg"}/>
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

const getAll = async (cabinet,setDevicesList) => {
    let allDevices = await DeviceService.getAllDevicesFromCabinet(cabinet.number)
    setDevicesList(parseDevices(allDevices))
}


const CanvasDeviceLayout = ({cabinet,updateCabinets}) => {


//////////////////////////////////////////////////////////////////////////////////////////////
    const divRef = useRef(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const [devicesList, setDevicesList] = React.useState([]);
    const [selectedId, selectShape] = React.useState(null);


    useEffect(() => {
        getAll(cabinet,setDevicesList)
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


///////////////////////////////////////////////////////////////////////////////////


    const [backgroundImage] = useImage("http://xyla.istu.webappz.ru" + cabinet.cabinetLink)
    const [tooltipText, setTooltipText] = useState("")
    const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0})
    const [tooltipVisible, setTooltipVisible] = useState(false)

    const createNewDevice = (deviceType) => {
        let newDeviceName = deviceType.type + "-" + (devicesList.filter((el) => el.type === deviceType.type).length + 1)

        let newDevice = {
            id: null,
            canvasId: 'rect' + newDeviceName,
            deviceName: newDeviceName,
            cabinet: cabinet.number,
            type: deviceType.type,
            data: deviceType.data,
            inputDataProps: deviceType.inputDataProps,
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


        setDevicesList([...devicesList, newDevice])
    }

    const updateDeviceInputs = (deviceName, deviceDataKey, value) => {
        let newDeviceList = [...devicesList]


        newDeviceList.find((searchDevice) => searchDevice.deviceName === deviceName).data[deviceDataKey] = value

        setDevicesList(newDeviceList)
    }

    const deleteDevice = (id,devName) => {
      if(id){
          DeviceService.deleteDeviceFromCabinet(id)
      }

      let newDeviceList = [...devicesList]
        newDeviceList=newDeviceList.filter((device) => device.deviceName !== devName)

        setDevicesList(newDeviceList)
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
                            {devicesList.map((rect) => {
                                return (
                                    <CanvasComponent
                                        componentName={rect.deviceName}
                                        setTooltipText={setTooltipText}
                                        setTooltipPosition={setTooltipPosition}
                                        setTooltipVisible={setTooltipVisible}
                                        imageUrl={deviceTypes.find((t) => t.type === rect.type).iconLink}
                                        key={rect.canvasId}
                                        shapeProps={rect.shapeProps}
                                        isSelected={rect.canvasId === selectedId}
                                        onSelect={() => {
                                            selectShape(rect.canvasId);
                                        }}
                                        onChange={(newAttrs) => {
                                            let newDevicesList = [...devicesList];
                                            newDevicesList.find((d) => d.canvasId === rect.canvasId).shapeProps = newAttrs
                                            setDevicesList(newDevicesList);
                                        }}
                                    />
                                );
                            })}
                        </Layer>
                        <Layer>
                            <Text text={tooltipText} fontFamily='Calibri' fontSize={18} padding={5} fill='black'
                                  stroke='black' visible={tooltipVisible} x={tooltipPosition.x} y={tooltipPosition.y}/>
                        </Layer>
                    </Stage>
                </Block>
                <Block className='w-25 border border-dark bg-white rounded-3'>
                    <div
                        className='d-flex p-1 justify-content-center align-items-center border-bottom border-black border-opacity-50'>
                        <h4>Панель инструментов</h4></div>
                    <div className='d-flex p-1 justify-content-between align-items-stretch flex-wrap'>
                        {deviceTypes.map((deviceType, i) =>
                            <button key={i} className='my-1 p-1 border border-dark btn btn-primary'
                                    style={{width: "100px", height: "100px"}} onClick={() => {
                                createNewDevice(deviceType)
                            }}>
                                <div className='text-center'>{deviceType.type}</div>
                                <img width={50} height={50} src={deviceType.buttonIconLink}/>
                            </button>
                        )}
                        <Badge badgeContent={imgLock} badgeColor={"bg-dark"} translateMiddle={false}>
                            <button className='my-1 p-1 border border-dark btn btn-primary'
                                    style={{width: "100px", height: "100px"}} onClick={() => {
                            }}>
                                <div className='text-center'>Добавить устройство</div>
                            </button>
                        </Badge>
                    </div>
                </Block>
            </div>
            <Block>
                <form className='p-2' onSubmit={(e) => {
                    e.preventDefault()
                    console.log(devicesList)
                }}>
                    <table className='w-100'>
                        <tbody>
                        {devicesList.map((device, i) =>
                            <tr className='border border-black border-opacity-50 w-100' key={i}>
                                <td className='border border-black px-2'>{device.deviceName}</td>
                                {
                                    Object.keys(device.inputDataProps).map((input, j) =>
                                        <td className='border border-black border-opacity-50' key={j}>
                                            <input
                                                className='form-control'
                                                value={device.data[input] ? device.data[input] : ""}
                                                type={device.inputDataProps[input].type}
                                                name={device.inputDataProps[input].name + device.deviceName[device.deviceName.length - 1]}
                                                placeholder={device.inputDataProps[input].placeholder}
                                                required={true}
                                                onChange={(e) => {
                                                    updateDeviceInputs(device.deviceName, input, e.target.value)
                                                }}/></td>
                                    )}
                                {device.id ? <td colSpan={100}>
                                    <div className='d-flex w-100 justify-content-end'>
                                        <button type={"button"} className='btn btn-primary' onClick={()=> deleteDevice(device.id,device.deviceName)}>
                                            <Icon height={24} width={24} src={"/files/delete.svg"}/>
                                        </button>
                                    </div>
                                </td> :
                                    <td colSpan={100}>
                                        <div className='d-flex w-100 justify-content-end'>
                                            <button type={"button"} className='btn btn-primary' onClick={()=> deleteDevice(null,device.deviceName)}>
                                                <Icon height={24} width={24} src={"/files/eraser.svg"} />
                                            </button>
                                        </div>
                                    </td>}
                            </tr>
                        )}
                        </tbody>
                    </table>

                    <button className="btn btn-primary w-100 my-1" type={"submit"} onClick={()=> {DeviceService.addDeviceToCabinet(devicesList).then(()=>{updateCabinets(); getAll(cabinet,setDevicesList);})}}>Отправить</button>
                </form>
            </Block>
        </div>
    );
};


function parseDevices(list) {
    let deviceArr = []
    list.forEach((el) => {
        let newDeviceName = el.type + "-" + (deviceArr.filter((elem) => elem.type === el.type).length + 1)
        let deviceObj = {
            id: el.id,
            canvasId: 'rect' + el.id,
            deviceName: newDeviceName,
            cabinet: el.cabinet,
            type: el.type,
            data: JSON.parse(el.data),
            inputDataProps: deviceTypes.find((elem) => elem.type === el.type).inputDataProps,
            shapeProps: {
                x: parseFloat(el.x),
                y: parseFloat(el.y),
                width: 150,
                height: 100,
                rotation: parseFloat(el.rotation),
                scaleX: parseFloat(el.scaleX),
                scaleY: parseFloat(el.scaleY),
            }
        }
        deviceArr.push(deviceObj)
    })
    return deviceArr
}


export default CanvasDeviceLayout;