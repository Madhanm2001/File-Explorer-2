import {useEffect, useState } from 'react'
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FiFolderPlus } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";
import '../App.css'


const FolderAndFile = ({ data }: any) => {

    const [initialData, setInitialData] = useState(data)
    const [arrayObj, setArrayOfObj] = useState(initialData)
    const [activeBox,setActiveBox]=useState("cancel")
    const[id,setId]=useState(0)
    const[name,setName]=useState('')
    const [folderId,setFolderId]=useState(16)

    useEffect(() => {
        flattenobj()
    }, [initialData])
    console.log(initialData, "initialData")

    const AddFolderandFile = (id: any, name: any, isFolder: any) => {
        const arrObj = addFolder(initialData, id, name, isFolder)
        setInitialData(arrObj)
    }

    const flattenobj = () => {
        const updated = flattenObject(initialData)
        setArrayOfObj(updated)
    }

    // const flattenObject = (initialData: any) => {
    //     let newArr: any = []
    //     let obj: any
    //     for (obj of initialData) {
    //         let nextObj: any = [obj]
    //         let padding: any = 0
    //         const flattenRecur = (nextObj: any) => {
    //             let obj: any
    //             for (obj of nextObj) {
    //                 let folder: any = {}
    //                 let key: any
    //                 console.log(obj.id, "icheckd ")
    //                 for (key in obj) {

    //                     if (Array.isArray(obj[key])) {
    //                         padding += 12
    //                         flattenRecur(obj[key])
    //                     }
    //                     else {
    //                         folder[key] = obj[key]
    //                         if (folder.isFolder != undefined && folder.id && folder.name && folder.isToggle != undefined && folder.isClose != undefined) {
    //                             newArr.push({ ...folder, padding: padding })
    //                         }
    //                     }

    //                 }
    //             }
    //         }
    //         flattenRecur(nextObj)
    //     }
    //     return newArr
    // }


const flattenObject = (data:any) => {
  let result:any = [];

  const recur = (items:any, padding = 0) => {
    for (let item of items) {
      const { children, ...rest } = item;
      result.push({ ...rest, padding });
      if (children && Array.isArray(children)) {
        recur(children, padding + 12);
      }
    }
  };

  recur(data);
  return result;
};



    const toggleFold = (id: any, status: any) => {

        const updated = toggleFolder(initialData, id, status)
        setInitialData(updated)
    }

    const toggleFolder = (initialData: any, id: any, status: any) => {
        let copy: any = [...initialData]
        let obj: any
        for (obj of copy) {
            let nextObj: any = [obj]
            let padding: any = 0
            const flattenRecur = (nextObj: any) => {

                let obj: any
                let stat = status
                for (obj of nextObj) {
                    let key: any
                    console.log(obj.id, "icheckd ")
                    if (obj.id == id) {
                        console.log(obj, "maddy");

                        const nextToggle = (copy: any) => {

                            for (obj of copy) {
                                let nextObj: any = [obj]
                                const nextFlattenRecur = (nextObj: any) => {

                                    let obj: any

                                    for (obj of nextObj) {
                                        let key: any
                                        for (key in obj) {
                                              console.log("keyooo",obj.name);
                                           if(obj.id==id){
                                              obj.isToggle=!stat
                                           }
                                           else{
                                              obj.isClose=stat
                                              obj.isToggle=!stat

                                           }  
                                            if (Array.isArray(obj[key])) {
                                                padding += 20
                                                nextFlattenRecur(obj[key])
                                            }

                                        }
                                    }
                                    
                                }

                             nextFlattenRecur(nextObj)
                            }

                        }
                        nextToggle([obj])

                    }

                    for (key in obj) {

                        if (Array.isArray(obj[key])) {
                            padding += 20
                            flattenRecur(obj[key])
                        }

                    }
                }
            }
            flattenRecur(nextObj)
        }
        return copy
    }

    // const del = (id: any) => {
    //     setActiveBox('cancel')
    //     const updated = DeleteFolder(initialData, id)
    //     setInitialData(updated)
    // }

const DeleteFolder = (data: any[], id: number): any[] => {
  return data.filter(item => {
    if (item.id === id) {
      return false;
    }
    if (item.children && Array.isArray(item.children)) {
      item.children = DeleteFolder(item.children, id);
    }
    return true;
  });
};



    const addFolder = (initialData: any, id: any, name: any, isFolder: any) => {
        let copy: any = [...initialData]
        let obj: any
        for (obj of copy) {
            let nextObj: any = [obj]
            const toogleRecur = (nextObj: any) => {

                let obj: any
                for (obj of nextObj) {
                    let key: any
                    console.log(obj.id, "icheckd ")


                    for (key in obj) {

                        console.log(obj, "frog");
                        if (obj.id == id) {
                            setFolderId(ps=>ps+1)
                            if (isFolder) {
                                obj.children.push({ id: folderId, name, isFolder: true,isToggle:obj.isToggle,isClose:!obj.isToggle, children: [] })
                                break;
                            }
                            else {
                                obj.children.push({ id: folderId, name, isFolder: false ,isToggle:!obj.isToggle,isClose:!obj.isToggle})
                                break;
                            }
                        }

                        else {
                            if (Array.isArray(obj[key])) {
                                toogleRecur(obj[key])
                            }
                        }
                    }
                }
            }
            toogleRecur(nextObj)
        }
        return copy
    }

    const FileAndFolderDelete = (id: any) => {
        setActiveBox('cancel')
        const updated = DeleteFolder(initialData, id)
        setInitialData(updated)

    }

    // const fileDelete = (initialData: any, id: any) => {
    //     let copy: any = [...initialData]
    //     let obj: any
    //     for (obj of copy) {
    //         let nextObj: any = [obj]
    //         let padding: any = 0
    //         const flattenRecur = (nextObj: any) => {

    //             let obj: any
    //             for (obj of nextObj) {
    //                 let key: any
    //                 console.log(obj.id, "icheckd ")

    //                 for (key in obj) {

    //                     if (obj.id == id) {
    //                         delete obj['name']
    //                         break;

    //                     }

    //                     if (Array.isArray(obj[key])) {
    //                         padding += 20
    //                         flattenRecur(obj[key])
    //                     }
    //                     // else{
    //                     //   folder[key]=obj[key]
    //                     //   if(folder.isFolder!=undefined && folder.id && folder.name){
    //                     //       newArr.push({...folder,padding:padding})
    //                     //   }
    //                     // }

    //                 }
    //             }
    //         }
    //         flattenRecur(nextObj)
    //     }
    //     return copy
    // }

    const onchangeInput=(e:any)=>{

        setName(e.target.value)

    }
    const onclickAdd=(choice:any)=>{

if(name.trim()){
        if(choice==='file'){
           AddFolderandFile(id,name,false)
        }
        else{
           AddFolderandFile(id,name,true)
        }
setName('')
setActiveBox('cancel')
    }
}

    const getDataforAdd=(choice:any,id:any)=>{
        setName('')
        setActiveBox(choice)
        setId(id)


    }

    return (
        <div style={{marginTop:"25px"}}>
            {
                arrayObj.map((data: any) => {
                    console.log(data.marginLeft, data.name, "hhhhhh");
                    return (
                        <div style={{color:'grey',marginTop:'15px'}}>
                            {data.isFolder ?
                                (!data.isClose && 
                                <div style={{ display: 'flex', gap: '5px',marginTop:'10px', padding: `5px ${data.padding}px` }} id='folder'>
                                    <div style={{display:'flex',cursor:'pointer'}} onClick={() => { toggleFold(data.id, data.isToggle) }} >
                                    {data.isToggle ? 
                                    <MdExpandLess style={{ margin: '2px',color:'white',fontWeight:'800'}}/> : 
                                    <MdExpandMore style={{ margin:'2px',color:'white',fontWeight:'800'}}/>}
                                    <h4 style={{ color:'#ADADAD',margin:0}}>{data.name}</h4>
                                    </div> 
                                    <div style={{ display: 'flex', gap: '5px', marginTop: '2px' }}>
                                        {/* <FiFolderPlus onClick={() => AddFolder(data.id, 'mango', true)} /> */}
                                        <FiFolderPlus style={{margin:0,color:'#ADB500',cursor:'pointer'}} onClick={() => getDataforAdd('folder',data.id)} />
                                        {/* <AiOutlineFileAdd onClick={() => AddFolder(data.id, 'ben10', false)} /> */}
                                        <AiOutlineFileAdd style={{margin:0,color:'#B56400',cursor:'pointer'}} onClick={() => getDataforAdd('file',data.id)} />
                                        <MdDeleteOutline style={{margin:0,color:'#B50000',cursor:'pointer'}} onClick={() => { FileAndFolderDelete(data.id) }} />
                                    </div>
                                </div>)
                                : (!data.isClose && <div style={{ display: 'flex', gap: '3px',marginTop:'5px',padding: `5px ${data.padding}px`,cursor:'pointer' }} id='file'>
                                    <p style={{ color: '#ADADAD',margin:0,paddingLeft:'8px',fontSize:'14px'}}>{data.name}</p>
                                    <MdDeleteOutline style={{color:'#B50000',cursor:'pointer'}} onClick={() => { FileAndFolderDelete(data.id) }} />
                                </div>)}
                        </div>)
                })
            }

            
            {(activeBox==="file"||activeBox==="folder")&&(<div style={{marginTop:'50px',color:'grey'}}>    
            <form action="">
                 <div style={{fontWeight:700,fontSize:'15px',color:'white'}}>{activeBox==="file"?'Enter file name':activeBox==="folder"?'Enter folder name':''}</div>
                 <input type="text" value={name} onChange={onchangeInput} style={{border:'3px grey solid',background:'black',color:'white',outline:0,height:'20px',borderRadius:'5px',marginTop:'10px'}}/>
            </form>
            <div style={{display:'flex',marginTop:'10px',gap:'10px'}}>
                    <button style={{background:"green",border:'none',color:'white',padding:'8px 10px',borderRadius:'5px'}} onClick={()=>{onclickAdd(activeBox)}}>Add</button>
                    <button style={{background:"red",border:'none',color:'white',padding:'8px 10px',borderRadius:'5px'}} onClick={()=>{setActiveBox('cancel')}}>cancel</button>
            </div>
            </div>)}

        </div>
    )
}

export default FolderAndFile
