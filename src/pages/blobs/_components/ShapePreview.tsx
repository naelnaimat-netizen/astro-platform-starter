import { generateRandomIntegerInRange } from '../../../utils.ts';
import type { BlobProps } from '../../../types.ts';

export default function ShapePreview(blobProps: BlobProps) {
    const { svgPath, parameters } = blobProps;
    const uniqueGradientId = `gradient-${generateRandomIntegerInRange(10_000_000, 100_000_000)}`;

    return (
        <svg viewBox={`0 0 ${parameters.size} ${parameters.size}`} xmlns="http://www.w3.org/2000/svg" width="100%">
            <defs>
                <linearGradient id={uniqueGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: parameters.colors[0] }} />
                    <stop offset="100%" style={{ stopColor: parameters.colors[1] }} />
                </linearGradient>
            </defs>
            <path d={svgPath} fill={`url(#${uniqueGradientId})`}></path>
        </svg>
    );
}
