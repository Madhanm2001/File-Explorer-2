import FolderAndFile from './FolderAndFile';
import '../App.css'

const initialData = [
  {
    id:1,
    name: "public",
    isFolder: true,
    isToggle:true,
    isClose:false,
    children: [
        { id:2, name: "index.html", isFolder: false ,isToggle:true,isClose:false,},
        { id:3, name: "app.html", isFolder: false,isToggle:true,isClose:false,},
        {
    id:4,
    name: "style",
    isFolder: true,
    isToggle:true,
    isClose:false,
    children: [
        { id:5, name: "main.css", isFolder: false,isToggle:true ,isClose:false,},
        { id:6, name: "index.css", isFolder: false ,isToggle:true,isClose:false,},
            {
    id:7,
    name: "env",
    isFolder: true,
    isToggle:true,
    isClose:false,
    children: [
        { id:8, name: "node_modules",isFolder: false ,isToggle:true,isClose:false,},
        { id:9, name: "gitignore", isFolder: false ,isToggle:true,isClose:false,},
]   
  },
],

    
  },
  { id:10, name: "public.html", isFolder: false ,isToggle:true,isClose:false,},
], 
  },
  {
    id:11,
    name: "src",
    isFolder: true,
    isToggle:true,
    isClose:false,
    children: [
      { id:12, name: "folder.js", isFolder: false ,isToggle:true,isClose:false,},
      { id:13, name: "file.js", isFolder: false ,isToggle:true,isClose:false,},
      { id:14, name: "notes.js", isFolder: false,isToggle:true,isClose:false, }
    ],
  },
  { id:15, name: "package.json", isFolder: false,isToggle:true,isClose:false}
];

const FileExplorer = () => {
  return (
    <div>
        <h4 style={{color:'white'}}>EXPLORER</h4>
        <FolderAndFile data={initialData}/>
    </div>
  )
}

export default FileExplorer
