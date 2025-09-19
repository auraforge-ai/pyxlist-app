
import React from 'react';

type IconProps = {
    className?: string;
};

export const PxSquareIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M2 2h12v12H2V2zm2 2v8h8V4H4z"/>
    </svg>
);

export const PxPlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M7 2h2v5h5v2h-5v5H7v-5H2V7h5V2z"/>
    </svg>
);

export const PxChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M10 2L4 8l6 6V2z"/>
    </svg>
);

export const PxChevronRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M6 2l6 6-6 6V2z"/>
    </svg>
);

export const PxCheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M14 2L6 10 2 6l-2 2 6 6 10-10L14 2z"/>
    </svg>
);

export const PxPencilIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M12 0l-2 2 4 4 2-2-4-4zM0 12l8-8 4 4-8 8H0v-4z"/>
    </svg>
);

export const PxTrashIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M2 4h12v2H2zM3 7h1v7H3zM5 7h1v7H5zM7 7h2v7H7zM9 7h1v7H9zM11 7h1v7h-1zM5 2h6v2H5z"/>
    </svg>
);

export const PxCopyIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M2 2h9v2H4v9H2V2zm3 3h9v9H5V5zm2 2v5h5V7H7z" />
    </svg>
);

export const PxNoteIcon: React.FC<IconProps> = ({ className, ...props }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges" {...props}>
        <path d="M2 2h12v12H2V2zm2 2v8h8V4H4z" />
    </svg>
);

export const PxNoteFilledIcon: React.FC<IconProps> = ({ className, ...props }) => (
     <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges" {...props}>
        <path d="M2 2h12v12H2V2zm2 2h8v2H4V4zm0 3h8v2H4V7zm0 3h5v2H4v-2z" />
    </svg>
);

export const PxSaveIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M2 2h12v12H2V2zm2 0h2v4H4V2zm8 10H4v- organizationsH4zM6 2h4v4H6V2z" />
    </svg>
);

export const PxUploadIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M7 6V2h2v4h3l-4 4-4-4h3zM2 12h12v2H2v-2z" />
    </svg>
);

export const PxXIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M2 2l12 12m0-12L2 14" stroke="currentColor" strokeWidth="2" />
    </svg>
);

export const PxStarIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M8 0l2 5h5l-4 3 2 5-5-4-5 4 2-5-4-3h5l2-5z" />
    </svg>
);

export const PxQuestionIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M5 2h6v1H6v1h3a3 3 0 013 3v2a3 3 0 01-3 3H7v-1h2a2 2 0 002-2V7a2 2 0 00-2-2H6V2z M7 12h2v2H7v-2z"/>
    </svg>
);

export const PxPlayIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M4 2l10 6-10 6V2z" />
    </svg>
);

export const PxPauseIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M4 2h4v12H4V2zm6 0h4v12h-4V2z" />
    </svg>
);

export const PxResetIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
       <path d="M8 2a6 6 0 0 0-6 6h2a4 4 0 1 1 4 4v2a6 6 0 1 0 0-12z M7 4h-2V2L2 5l3 3V6h2V4z" />
    </svg>
);

export const PxCoinIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 2a4 4 0 110 8 4 4 0 010-8zm0 2h2v2H8V6z"/>
    </svg>
);

export const PxShirtIcon: React.FC<IconProps> = ({ className }) => (
     <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M4 2h8v2H4V2zm-2 3h12v9H2V5zm2 2h2v2H4V7zm6 0h2v2h-2V7z"/>
    </svg>
);

export const PxTrophyIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M13 4h1V2H2v2h1v3h1V6h8v1h1V4h-1z M4 9h8v5H4V9z M6 14h4v2H6v-2z"/>
    </svg>
);

export const PxCrosshairIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M7 2h2v3H7V2zm0 9h2v3H7v-3zM2 7h3v2H2V7zm9 0h3v2h-3V7zM8 6a2 2 0 100 4 2 2 0 000-4z"/>
    </svg>
);

export const PxSettingsIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM8 2h-2v1H4v2H3v2H4v2H3v2H4v2H6v1h2v-1h2v-2h1v-2h2V9h-1V7h-2V5H8V2z"/>
    </svg>
);

export const PxAuraIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <path d="M8 2a4 4 0 00-4 4h2a2 2 0 112 2v2a4 4 0 104-4h-2a2 2 0 01-2-2V6a2 2 0 012-2h2a4 4 0 00-4-4z"/>
    </svg>
);
