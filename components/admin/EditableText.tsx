import React, { useState, useEffect, useRef } from 'react';
import { usePageContent } from '../../context/PageContentContext';
import { useLanguage } from '../../context/LanguageContext';

interface EditableTextProps {
    sectionId: string;
    field: string;
    fallback: string;
    as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'div';
    className?: string;
    allowHtml?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
    sectionId,
    field,
    fallback,
    as: Component = 'span',
    className = '',
    allowHtml = false
}) => {
    const { blocks, isEditing, updateBlock } = usePageContent();
    const { lang } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const editRef = useRef<HTMLElement>(null);

    const blockData = blocks[sectionId] || {};

    // Legacy support: if blockData[field] is a string, use it.
    // New i18n support: if blockData[field] is an object, read blockData[field][lang]
    let rawContent = fallback;
    const fieldValue = blockData[field];

    if (fieldValue !== undefined && fieldValue !== null) {
        if (typeof fieldValue === 'string') { // Legacy Data
            rawContent = fieldValue;
        } else if (typeof fieldValue === 'object' && fieldValue[lang] !== undefined) { // New i18n object Data
            rawContent = fieldValue[lang];
        } else if (typeof fieldValue === 'object' && fieldValue['en'] !== undefined) { // Fallback to english if current lang missing
            rawContent = fieldValue['en'];
        }
    }

    // Optional safe HTML wrapper function
    const renderContent = () => {
        if (allowHtml && !isFocused) {
            return <span dangerouslySetInnerHTML={{ __html: rawContent }} />;
        }
        return rawContent;
    };

    if (!isEditing) {
        return (
            <Component className={className}>
                {renderContent()}
            </Component>
        );
    }

    const commonProps = {
        ref: editRef as any,
        className: `
            ${className} 
            transition-all duration-200 cursor-text
            ${isHovered && !isFocused ? 'ring-2 ring-blue-400/50 outline-none rounded-sm bg-blue-50/10' : ''}
            ${isFocused ? 'ring-2 ring-blue-500 outline-none rounded-sm bg-white text-slate-900 z-10 relative' : ''}
        `,
        contentEditable: (isEditing ? "true" : "false") as any,
        suppressContentEditableWarning: true,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
            if (isEditing) {
                e.preventDefault();
                e.stopPropagation();
            }
        },
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onFocus: () => setIsFocused(true),
        onBlur: (e: React.FocusEvent<HTMLElement>) => {
            setIsFocused(false);
            const newContent = allowHtml ? e.currentTarget.innerHTML : e.currentTarget.textContent;
            if (updateBlock && newContent !== rawContent && newContent !== undefined && newContent !== null) {
                // Pass up the field and the new value. The context/builder will handle merging it into the language object
                updateBlock(sectionId, field, newContent, lang);
            }
        },
        style: {
            minWidth: '2ch',
            minHeight: '1.5em',
            display: 'inline-block'
        }
    };

    if (allowHtml && !isFocused) {
        return (
            <Component
                {...commonProps}
                dangerouslySetInnerHTML={{ __html: rawContent }}
            />
        );
    }

    return (
        <Component {...commonProps}>
            {rawContent}
        </Component>
    );
};
