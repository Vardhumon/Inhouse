import React, { useState } from 'react';

const StudentRow = ({ student, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({ ...student });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onSave(editedData.id);
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setEditedData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    return (
        <tr className='text-center'>
            {/* Render each cell based on whether it's in edit mode or not */}
        </tr>
    );
};

export default StudentRow;
