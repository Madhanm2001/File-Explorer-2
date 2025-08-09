import { useEffect, useRef, useState } from 'react'
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FiFolderPlus } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";
import '../App.css'


const FolderAndFile = ({ data }: any) => {

    const [initialData, setInitialData] = useState(data)
    const [arrayObj, setArrayOfObj] = useState(initialData)
    const [activeBox, setActiveBox] = useState("cancel")
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [folderId, setFolderId] = useState(7)
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        flattenobj()
    }, [initialData])

    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [activeBox]);

    const AddFolderandFile = (id: any, name: any, isFolder: any) => {
        const arrObj = addFolder(initialData, id, name, isFolder)
        setInitialData(arrObj)
    }

    const flattenobj = () => {
        const updated = flattenObject(initialData)
        setArrayOfObj(updated)
    }

    const FileAndFolderDelete = (id: any) => {
        setActiveBox('cancel')
        const updated = DeleteFolder(initialData, id)
        setInitialData(updated)
    }

    const toggleFold = (id: any) => {

        const updated = toggleFolder(initialData, id)
        setInitialData(updated)
    }
    const flattenObject = (data: any) => {
        let result: any = [];
        const recur = (items: any, padding = 0) => {
            for (let item of items) {
                const { children, ...rest } = item;
                result.push({ ...rest, padding });
                if (!item.isToggle) {
                    continue;
                }
                if (children && Array.isArray(children)) {
                    recur(children, padding + 12);
                }
            }
        };
        recur(data);
        return result;
    };

    const toggleFolder = (data: any[], id: any) => {
        return data.map((item: any): any[] => {
            if (item.id === id) {
                return {
                    ...item,
                    isToggle: !item.isToggle
                };
            }
            if (item.children && Array.isArray(item.children)) {
                return {
                    ...item,
                    children: toggleFolder(item.children, id)
                };
            }
            return item;
        });
    };

    const addFolder = (data: any[], id: any, name: any, isFolder: boolean) => {
        return data.map((item: any): any[] => {
            if (item.id === id) {
                setFolderId(ps => ps + 1)
                const newChild = isFolder
                    ? { id: folderId, name, isFolder: true, isToggle: item.isToggle, children: [] }
                    : { id: folderId, name, isFolder: false, isToggle: item.isToggle };
                return {
                    ...item,
                    children: [...(item.children || []), newChild]
                };
            }
            if (item.children && Array.isArray(item.children)) {
                return {
                    ...item,
                    children: addFolder(item.children, id, name, isFolder)
                };
            }
            return item;
        });
    };

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

    const onchangeInput = (e: any) => {
        setName(e.target.value)
    }
    const onclickAdd = (choice: any) => {

        if (name.trim()) {
            if (choice === 'file') {
                AddFolderandFile(id, name, false)
            }
            else {
                AddFolderandFile(id, name, true)
            }
            setName('')
            setActiveBox('cancel')
        }
    }
    const getDataforAdd = (choice: any, id: any) => {
        setName('')
        setActiveBox(choice)
        setId(id)
    }

    return (
        <div style={{ marginTop: "25px" }} >
            {
                arrayObj.map((data: any) => {
                    return (
                        <div style={{ color: 'grey', marginTop: '15px' }}>
                            {data.isFolder ?
                                (<div style={{ display: 'flex', gap: '5px', marginTop: '10px', padding: `5px ${data.padding}px` }} id='folder'>
                                    <div style={{ display: 'flex', cursor: 'pointer' }} onClick={() => { toggleFold(data.id) }} >
                                        {data.isToggle ?
                                            <MdExpandLess style={{ margin: '2px', color: 'white', fontWeight: '800' }} /> :
                                            <MdExpandMore style={{ margin: '2px', color: 'white', fontWeight: '800' }} />}
                                        <h4 style={{ color: '#ADADAD', margin: 0 }}>{data.name}</h4>
                                    </div>
                                    <div style={{ display: 'flex', gap: '5px', marginTop: '2px' }}>
                                        <FiFolderPlus style={{ margin: 0, color: '#ADB500', cursor: 'pointer' }} onClick={() => getDataforAdd('folder', data.id)} />
                                        <AiOutlineFileAdd style={{ margin: 0, color: '#B56400', cursor: 'pointer' }} onClick={() => getDataforAdd('file', data.id)} />
                                        <MdDeleteOutline style={{ margin: 0, color: '#B50000', cursor: 'pointer' }} onClick={() => { FileAndFolderDelete(data.id) }} />
                                    </div>
                                </div>)
                                : (<div style={{ display: 'flex', gap: '3px', marginTop: '5px', padding: `5px ${data.padding}px`, cursor: 'pointer' }} id='file'>
                                    <p style={{ color: '#ADADAD', margin: 0, paddingLeft: '8px', fontSize: '14px' }}>{data.name}</p>
                                    <MdDeleteOutline style={{ color: '#B50000', cursor: 'pointer' }} onClick={() => { FileAndFolderDelete(data.id) }} />
                                </div>)}
                        </div>)
                })
            }
            {(activeBox === "file" || activeBox === "folder") && (<div style={{ marginTop: '50px', color: 'grey' }} ref={containerRef}>
                <form action="">
                    <div style={{ fontWeight: 700, fontSize: '15px', color: 'white' }}>{activeBox === "file" ? 'Enter file name' : activeBox === "folder" ? 'Enter folder name' : ''}</div>
                    <input type="text" value={name} onChange={onchangeInput} style={{ border: '3px grey solid', background: 'black', color: 'white', outline: 0, height: '20px', borderRadius: '5px', marginTop: '10px' }} />
                </form>
                <div style={{ display: 'flex', marginTop: '10px', gap: '10px' }}>
                    <button style={{ background: "green", border: 'none', color: 'white', padding: '8px 10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => { onclickAdd(activeBox) }}>Add</button>
                    <button style={{ background: "red", border: 'none', color: 'white', padding: '8px 10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => { setActiveBox('cancel') }}>cancel</button>
                </div>
            </div>)}
        </div>
    )
}

export default FolderAndFile