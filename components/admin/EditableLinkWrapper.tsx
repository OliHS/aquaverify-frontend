import React, { useState } from 'react';
import { usePageContent } from '../../context/PageContentContext';
import { Link2 } from 'lucide-react';

interface EditableLinkWrapperProps {
    sectionId: string;
    field: string;
    fallback: string;
    children: React.ReactElement;
}

export const EditableLinkWrapper: React.FC<EditableLinkWrapperProps> = ({
    sectionId,
    field,
    fallback,
    children
}) => {
    const { blocks, isEditing, updateBlock } = usePageContent();
    const [isHovered, setIsHovered] = useState(false);

    if (!isEditing) {
        // In public mode, inject the latest href from CMS seamlessly
        const currentHref = blocks[sectionId]?.[field] || fallback;
        return React.cloneElement(React.Children.only(children), { href: currentHref });
    }

    const currentHref = blocks[sectionId]?.[field] || fallback;

    const handleEditLink = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const newHref = window.prompt("Edit Link URL destination:", currentHref);
        if (newHref !== null && updateBlock) {
            updateBlock(sectionId, field, newHref);
        }
    };

    const child = React.Children.only(children);
    const clonedChild = React.cloneElement(child, {
        onMouseEnter: (e: any) => {
            setIsHovered(true);
            if (child.props.onMouseEnter) child.props.onMouseEnter(e);
        },
        onMouseLeave: (e: any) => {
            setIsHovered(false);
            if (child.props.onMouseLeave) child.props.onMouseLeave(e);
        },
        onClick: (e: React.MouseEvent) => {
            e.preventDefault(); // prevent actual navigation in visual builder
            if (child.props.onClick) child.props.onClick(e);
        },
        href: currentHref
    });

    return (
        <div
            className="relative inline-block w-fit group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {clonedChild}

            {isHovered && (
                <div
                    className="absolute -top-3 -right-3 z-[100] bg-blue-600 text-white p-1.5 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 hover:scale-110 transition-transform flex items-center justify-center animate-in fade-in zoom-in duration-200"
                    onClick={handleEditLink}
                    title="Edit URL Link"
                >
                    <Link2 size={16} />
                </div>
            )}
        </div>
    );
};
