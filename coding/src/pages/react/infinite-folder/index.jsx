import React, { useState, useEffect } from 'react';

const folderStructure = [
    {
        id: 1,
        name: 'Folder 1',
        children: [
            {
                id: 2,
                name: 'Folder 1.1',
                children: [],
                files: [
                    { id: 6, name: 'File 1.1.1' },
                    { id: 7, name: 'File 1.1.2' }
                ]
            },
            {
                id: 3,
                name: 'Folder 1.2',
                children: [
                    {
                        id: 4,
                        name: 'Folder 1.2.1',
                        children: [],
                        files: []
                    }
                ],
                files: [
                    { id: 8, name: 'File 1.2.1' }
                ]
            }
        ],
        files: [
            { id: 9, name: 'File 1.1' }
        ]
    },
    {
        id: 5,
        name: 'Folder 2',
        children: [],
        files: [
            { id: 10, name: 'File 2.1' }
        ]
    }
];

const InfiniteFolder = () => {
    const [expandedPaths, setExpandedPaths] = useState([]);

    const handleToggle = (id, isOpen) => {
        setExpandedPaths(prevPaths =>
            isOpen ? [...prevPaths, id] : prevPaths.filter(pathId => pathId !== id)
        );
    };

    const expandPathToFile = (filePath) => {
        const pathArray = filePath.split('/'); // Assuming the path is like "Folder 1/Folder 1.2/File 1.2.1"
        const newExpandedPaths = findPathToFile(folderStructure, pathArray);
        setExpandedPaths(newExpandedPaths);
    };

    return (
        <div>
            <h1>Folder Structure</h1>
            <button onClick={() => expandPathToFile('Folder 1/Folder 1.2/File 1.2.1')}>Expand to File 1.2.1</button>
            {folderStructure.map((folder) => (
                <Folder key={folder.id} folder={folder} expandedPaths={expandedPaths} onToggle={handleToggle} />
            ))}
        </div>
    );
};

export default InfiniteFolder;

const Folder = ({ folder, expandedPaths, onToggle }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        if (expandedPaths.includes(folder.id)) {
            setIsOpen(true);
        }
    }, [expandedPaths, folder.id]);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        onToggle(folder.id, !isOpen);
    };

    return (
        <div style={{ marginLeft: '20px' }}>
            <div onClick={toggleOpen} style={{ cursor: 'pointer' }}>
                {isOpen ? '📂' : '📁'} {folder.name}
            </div>
            {isOpen && (
                <div>
                    {folder.children && folder.children.length > 0 && folder.children.map((child) => (
                        <Folder key={child.id} folder={child} expandedPaths={expandedPaths} onToggle={onToggle} />
                    ))}
                    {folder.files && folder.files.length > 0 && folder.files.map((file) => (
                        <File key={file.id} file={file} />
                    ))}
                </div>
            )}
        </div>
    );
};

const findPathToFile = (folders, path, currentPath = []) => {
    for (const folder of folders) {
        const newPath = [...currentPath, folder.id];
        if (folder.files && folder.files.some(file => file.name === path[path.length - 1])) {
            return newPath;
        }
        if (folder.children) {
            const childPath = findPathToFile(folder.children, path, newPath);
            if (childPath.length) {
                return childPath;
            }
        }
    }
    return [];
};

const File = ({ file }) => {
    return (
        <div style={{ marginLeft: '20px' }}>
            📄 {file.name}
        </div>
    );
};
