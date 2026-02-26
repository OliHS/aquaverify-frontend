import React, { useState } from 'react';
import { usePageContent } from '../../context/PageContentContext';
import { Link2 } from 'lucide-react';

interface EditableLinkWrapperProps {
    sectionId: string;
    field: string;
    fallback: string;
    children: React.ReactNode;
}

export const EditableLinkWrapper: React.FC<EditableLinkWrapperProps> = ({
    sectionId,
    field,
    fallback,
    children
}) => {
    const { blocks, isEditing, updateBlock } = usePageContent();
    const [isHovered, setIsHovered] = useState(false);

    // Safely extract href, ensuring object traversal doesn't throw if blocks map is stale
    const currentHref = blocks?.[sectionId]?.[field] || fallback;

    // Safely grab the first valid React Element we can clone. If there is no valid element, we can't wrap it.
    let baseElement: React.ReactElement | null = null;
    try {
        const childArray = React.Children.toArray(children);
        baseElement = childArray.find(child => React.isValidElement(child)) as React.ReactElement;
    } catch (e) {
        console.warn('EditableLinkWrapper failed to parse children', e);
    }

    // Public Site Behavior
    if (!isEditing) {
        if (!baseElement) return <>{children}</>;
        return React.cloneElement(baseElement, { href: currentHref } as any);
    }

    // Admin Builder Behavior
    const handleEditLink = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const newHref = window.prompt("Edit Link URL destination:", currentHref);
        if (newHref !== null && updateBlock) {
            updateBlock(sectionId, field, newHref);
        }
    };

    if (!baseElement) {
        // Fallback: If for some reason we wrap undefined or a bare string, just render it without breaking.
        return <>{children}</>;
    }

    const clonedChild = React.cloneElement(baseElement, {
        onMouseEnter: (e: any) => {
            setIsHovered(true);
            if (baseElement?.props.onMouseEnter) baseElement.props.onMouseEnter(e);
        },
        onMouseLeave: (e: any) => {
            setIsHovered(false);
            if (baseElement?.props.onMouseLeave) baseElement.props.onMouseLeave(e);
        },
        onClick: (e: React.MouseEvent) => {
            e.preventDefault(); // prevent actual navigation in visual builder
            if (baseElement?.props.onClick) baseElement.props.onClick(e);
        },
        href: currentHref
    } as any);

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
