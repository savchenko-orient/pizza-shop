import React from 'react';
import ContentLoader from "react-content-loader";

export default function Sceleton() {
    return (
        <ContentLoader
            speed={2}
            width={280}
            height={459}
            viewBox="0 0 280 459"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="136" cy="123" r="119" />
            <rect x="3" y="422" rx="11" ry="11" width="90" height="30" />
            <rect x="5" y="322" rx="20" ry="20" width="265" height="75" />
            <rect x="142" y="417" rx="20" ry="20" width="139" height="42" />
            <rect x="46" y="271" rx="11" ry="11" width="181" height="35" />
        </ContentLoader>
    )
}
