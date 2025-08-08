import FolderAndFile from './FolderAndFile';

const initialData = [
  {
    id:1,
    name: "public",
    isFolder: true,
    isToggle:true,
    isClose:false,
    children: [
        { id:2, name: "index.html", isFolder: false ,isToggle:true,isClose:false,},
        { id:3, name: "app.css", isFolder: false,isToggle:true,isClose:false,},
        {
    id:4,
    name: "new",
    isFolder: true,
    isToggle:true,
    isClose:false,
    children: [
        { id:5, name: "index.html", isFolder: false,isToggle:true ,isClose:false,},
        { id:6, name: "app.css", isFolder: false ,isToggle:true,isClose:false,},
            {
    id:7,
    name: "mass",
    isFolder: true,
    isToggle:true,
    isClose:false,
    children: [
        { id:8, name: "index.html", isFolder: false ,isToggle:true,isClose:false,},
        { id:9, name: "app.css", isFolder: false ,isToggle:true,isClose:false,},
]   
  },
],

    
  },
  { id:10, name: "public.css", isFolder: false ,isToggle:true,isClose:false,},
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
    // const[data,setData]=useState(initialData)
  return (
    <div>
        <h3 style={{color:'white'}}>Explorer</h3>
        <FolderAndFile data={initialData}/>
    </div>
  )
}

export default FileExplorer
