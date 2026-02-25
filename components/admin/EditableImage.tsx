import React, { useRef, useState } from 'react';
import { usePageContent } from '../../context/PageContentContext';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

interface EditableImageProps {
    sectionId: string;
    field: string;
    fallbackSrc: string;
    alt: string;
    className?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
    sectionId,
    field,
    fallbackSrc,
    alt,
    className = ''
}) => {
    const { blocks, isEditing, updateBlock, uploadImage } = usePageContent();
    const [isHovered, setIsHovered] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const blockData = blocks[sectionId] || {};
    const currentSrc = blockData[field] || fallbackSrc;

    const handleImageClick = () => {
        if (!isEditing || isUploading) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !uploadImage || !updateBlock) return;

        setIsUploading(true);
        try {
            const publicUrl = await uploadImage(file);
            if (publicUrl) {
                updateBlock(sectionId, field, publicUrl);
            } else {
                alert('Upload failed! Please ensure you have created a public bucket named "images" in your Supabase Storage dashboard.');
            }
        } catch (error) {
            console.error('Failed to upload image:', error);
            alert('Failed to upload image. Please ensure the "images" bucket exists and is public.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    if (!isEditing) {
        return <img src={currentSrc} alt={alt} className={className} />;
    }

    return (
        <div
            className={`relative group inline-block ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={currentSrc}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-200 ${isHovered || isUploading ? 'opacity-50' : 'opacity-100'} ${className}`}
            />

            {/* Hover overlay with button */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 cursor-pointer
                    ${isHovered || isUploading ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={handleImageClick}
            >
                <div className="bg-slate-900/80 text-white px-4 py-2 rounded-lg flex items-center space-x-2 backdrop-blur-sm shadow-xl transform transition-transform group-hover:scale-105">
                    {isUploading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            <span className="text-sm font-medium">Uploading...</span>
                        </>
                    ) : (
                        <>
                            <Upload size={18} />
                            <span className="text-sm font-medium">Change Image</span>
                        </>
                    )}
                </div>
            </div>

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
};
