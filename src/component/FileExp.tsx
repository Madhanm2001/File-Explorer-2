import FolderAndFile from './FolderAndFile';
import '../App.css'

const initialData = [
    {
        id: 1,
        name: "public",
        isFolder: true,
        isToggle: true,
        children: [
            { id: 2, name: "index.html", isFolder: false, isToggle: true },
        ],
    },
    {
        id: 3,
        name: "src",
        isFolder: true,
        isToggle: true,

        children: [
            { id: 4, name: "App.js", isFolder: false, isToggle: true },
            { id: 5, name: "index.js", isFolder: false, isToggle: true },
        ],
    },
    { id: 6, name: "package.json", isFolder: false, isToggle: true }
];

const FileExplorer = () => {
    return (
        <div>
            <h4 style={{ color: 'white' }}>EXPLORER</h4>
            <FolderAndFile data={initialData} />
        </div>
    )
}

export default FileExplorer
