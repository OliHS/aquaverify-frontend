import React, { useState } from 'react';
import { usePageContent } from '../../context/PageContentContext';
import { Link2 } from 'lucide-react';

interface EditableLinkWrapperProps {
    sectionId: string;
    field: string;
    fallback: string;
    legacyFallbacks?: string[];
    children: React.ReactNode;
}

const FALLBACK_STORAGE_VALUE = '';
const PLATFORM_HOST = 'app.aquaverify.com';

function normalizeComparableHref(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('#')) return trimmed;

    try {
        const url = new URL(trimmed, 'https://aquaverify.com');
        const pathname = url.pathname.replace(/\/+$/, '') || '/';
        return `${url.origin}${pathname}`.toLowerCase();
    } catch {
        return trimmed.replace(/\/+$/, '').toLowerCase();
    }
}

function getManagedPlatformPath(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return null;

    try {
        const url = new URL(trimmed, 'https://aquaverify.com');
        if (url.hostname !== PLATFORM_HOST) return null;
        return url.pathname.replace(/\/+$/, '') || '/';
    } catch {
        return null;
    }
}

function shouldUseFallbackHref(value: string, fallback: string, legacyFallbacks: string[]) {
    const normalizedValue = normalizeComparableHref(value);
    if (!normalizedValue) return true;

    const fallbackValues = [fallback, ...legacyFallbacks].map(normalizeComparableHref);
    if (fallbackValues.includes(normalizedValue)) return true;

    const valuePlatformPath = getManagedPlatformPath(value);
    const fallbackPlatformPath = getManagedPlatformPath(fallback);
    return Boolean(valuePlatformPath && fallbackPlatformPath && valuePlatformPath === fallbackPlatformPath);
}

export const EditableLinkWrapper: React.FC<EditableLinkWrapperProps> = ({
    sectionId,
    field,
    fallback,
    legacyFallbacks = [],
    children
}) => {
    const { blocks, isEditing, updateBlock } = usePageContent();
    const [isHovered, setIsHovered] = useState(false);

    // Safely extract href, ensuring object traversal doesn't throw if blocks map is stale.
    // Some CMS records may still contain old placeholder links; render the current fallback for those.
    const savedHref = blocks?.[sectionId]?.[field];
    const normalizedSavedHref = typeof savedHref === 'string' ? savedHref.trim() : savedHref;
    const currentHref = normalizedSavedHref && !shouldUseFallbackHref(String(normalizedSavedHref), fallback, legacyFallbacks)
        ? normalizedSavedHref
        : fallback;

    // Safely grab the first valid React Element we can clone. If there is no valid element, we can't wrap it.
    let baseElement: React.ReactElement<any> | null = null;
    try {
        const childArray = React.Children.toArray(children);
        baseElement = childArray.find(child => React.isValidElement(child)) as React.ReactElement<any>;
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
            const trimmedHref = newHref.trim();
            if (trimmedHref === currentHref.trim()) return;

            updateBlock(
                sectionId,
                field,
                shouldUseFallbackHref(trimmedHref, fallback, legacyFallbacks)
                    ? FALLBACK_STORAGE_VALUE
                    : trimmedHref
            );
        }
    };

    if (!baseElement) {
        // Fallback: If for some reason we wrap undefined or a bare string, just render it without breaking.
        return <>{children}</>;
    }

    const clonedChild = React.cloneElement(baseElement, {
        onMouseEnter: (e: any) => {
            setIsHovered(true);
            if (baseElement?.props?.onMouseEnter) baseElement.props.onMouseEnter(e);
        },
        onMouseLeave: (e: any) => {
            setIsHovered(false);
            if (baseElement?.props?.onMouseLeave) baseElement.props.onMouseLeave(e);
        },
        onClick: (e: React.MouseEvent) => {
            e.preventDefault(); // prevent actual navigation in visual builder
            if (baseElement?.props?.onClick) baseElement.props.onClick(e);
        },
        href: currentHref
    } as any);

    return (
        <div className="relative inline-block w-fit group">
            {clonedChild}

            <div
                className="absolute -top-3 -right-3 z-[100] bg-blue-600 text-white p-1.5 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 hover:scale-110 transition-transform flex items-center justify-center animate-in fade-in zoom-in duration-200"
                onClick={handleEditLink}
                title="Edit URL Link"
            >
                <Link2 size={16} />
            </div>
        </div>
    );
};
