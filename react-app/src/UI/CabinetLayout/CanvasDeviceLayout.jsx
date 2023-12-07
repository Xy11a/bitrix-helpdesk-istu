import React, {useEffect, useRef, useState} from 'react';
import Block from "../Block/Block";
import {Image, Layer, Stage, Text} from "react-konva";
import CanvasComponent from "./CanvasComponent";
import useImage from "use-image";
import DeviceService from "../../API/DeviceService";
import Badge from "../Badge/Badge";
import {getAllObjects} from "./CanvasCabinetLayout";
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

const getAll = async (cabinet, setDevicesList) => {
    let allDevices = await DeviceService.getAllDevicesFromCabinet(cabinet.number)
    setDevicesList(parseDevices(allDevices))
}

const CanvasDeviceLayout = ({cabinet, updateCabinets}) => {


//////////////////////////////////////////////////////////////////////////////////////////////
    const divRef = useRef(null)
    const [containerWidth, setContainerWidth] = useState(700)
    const [containerHeight, setContainerHeight] = useState(450)
    const [devicesList, setDevicesList] = React.useState([]);
    const [selectedId, selectShape] = React.useState(null);
    const [objectList, setObjectList] = useState([]);
    const [scale, setScale] = useState({x:1,y:1})


    useEffect(() => {
        getAll(cabinet, setDevicesList)
        getAllObjects(cabinet, objectList, setObjectList)
        if (divRef.current?.offsetWidth) {
            // let sX = divRef.current.offsetWidth/divRef.current.firstChild.offsetWidth
            // let sY = divRef.current.offsetHeight/divRef.current.firstChild.offsetHeight
            //
            // setContainerWidth(divRef.current.firstChild.offsetWidth * sX)
            // setContainerHeight(divRef.current.firstChild.offsetHeight * sY)
            // setScale({x:sX,y:sY})
            setContainerWidth(divRef.current.firstChild.offsetWidth)

        }



    }, [cabinet,divRef.current?.firstChild.offsetWidth])


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
    const [canCreateDevice,setCanCreateDevice] = useState(true)
    const [successMessage,setSuccessMessage] = useState(false)
    const [errorMessage,setErrorMessage] = useState(false)


    const createNewDevice = (deviceType) => {
        setSuccessMessage(false)
        if(canCreateDevice) {
            setCanCreateDevice(false)
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
        } else { setErrorMessage(true)}
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

    const submitForm = (e) => {
        e.preventDefault()
        DeviceService.addDeviceToCabinet(devicesList).then(()=>{
            setErrorMessage(false)
            setSuccessMessage(true)
            updateCabinets();
            setCanCreateDevice(true);
            getAll(cabinet,setDevicesList);
            setTimeout(()=>{ setSuccessMessage(false)}, 2000)
        })
    }


    return (
        <div>
            <div ref={divRef} className='d-flex align-items-stretch justify-content-between'>
                <Block className='w-75 border border-dark bg-white rounded-3 overflow-x-hidden'>
                    <Stage  scale={scale} className='border border-black border-opacity-50' width={containerWidth} height={containerHeight}
                           onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
                        <Layer>
                            <Image width={containerWidth} height={containerHeight} image={backgroundImage}/>
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
                                        dragAble={true}
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
                                  stroke='black' visible={tooltipVisible} x={tooltipPosition.x} y={tooltipPosition.y*scale.x}/>
                        </Layer>
                    </Stage>
                </Block>
                <Block className='w-25 border border-dark bg-white rounded-3'>
                    <div
                        className='d-flex p-1 justify-content-center align-items-center border-bottom border-black border-opacity-50'>
                        <h4>Панель ИТ-техники</h4></div>
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
                    <div>{ errorMessage ? <div className='p-2 bg-warning text-white rounded-3 text-center'>Внимание! На плане есть не заполненое устройство.</div> : ""}</div>
                </Block>
            </div>
            <Block>
                <form className='p-2' onSubmit={(e) => {
                    submitForm(e)
                }}>
                    <table className='w-100'>
                        <tbody>
                        {devicesList.map((device, i) =>
                            <tr className='border border-black border-opacity-50 w-100' key={device.deviceName+"i"}>
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
                                                onChange={(e) => {
                                                    updateDeviceInputs(device.deviceName, input, e.target.value)
                                                }}/></td>
                                    )}
                                {device.id ? <td colSpan={100}>
                                    <div className='d-flex w-100 justify-content-end'>
                                        <button type={"button"} className='btn btn-danger' onClick={()=> deleteDevice(device.id,device.deviceName)}>
                                            <Icon height={24} width={24} src={"/files/delete.svg"}/>
                                        </button>
                                    </div>
                                </td> :
                                    <td colSpan={100}>
                                        <div className='d-flex w-100 justify-content-end'>
                                            <button type={"button"} className='btn btn-primary' onClick={()=> {deleteDevice(null,device.deviceName);setErrorMessage(false); setCanCreateDevice(true);} }>
                                                <Icon height={24} width={24} src={"/files/eraser.svg"} />
                                            </button>
                                        </div>
                                    </td>}
                            </tr>
                        )}
                        </tbody>
                    </table>

                    <button className="btn btn-primary w-100 my-1" type={"submit"}>Отправить</button>
                    { successMessage ? <div className='p-2 bg-success text-white w-100 rounded-3 text-center'>Данные загружены!</div> : ""}
                </form>

            </Block>
        </div>
    );
};




export function parseDevices(list) {
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