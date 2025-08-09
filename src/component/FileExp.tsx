import FolderAndFile from './FolderAndFile';
import '../App.css'

const initialData = [
  {
    id:1,
    name: "public",
    isFolder: true,
    isToggle:true,
    children: [
        { id:2, name: "index.html", isFolder: false ,isToggle:true},
        { id:3, name: "app.html", isFolder: false,isToggle:true},
        {
    id:4,
    name: "style",
    isFolder: true,
    isToggle:true,
    children: [
        { id:5, name: "main.css", isFolder: false,isToggle:true},
        { id:6, name: "index.css", isFolder: false ,isToggle:true},
            {
    id:7,
    name: "env",
    isFolder: true,
    isToggle:true,
    children: [
        { id:8, name: "node_modules",isFolder: false ,isToggle:true},
        { id:9, name: "gitignore", isFolder: false ,isToggle:true},
]   
  },
],

    
  },
  { id:10, name: "public.html", isFolder: false ,isToggle:true},
], 
  },
  {
    id:11,
    name: "src",
    isFolder: true,
    isToggle:true,
    
    children: [
      { id:12, name: "folder.js", isFolder: false ,isToggle:true},
      { id:13, name: "file.js", isFolder: false ,isToggle:true},
      { id:14, name: "notes.js", isFolder: false,isToggle:true}
    ],
  },
  { id:15, name: "package.json", isFolder: false,isToggle:true}
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
