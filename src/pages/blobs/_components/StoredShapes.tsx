import { useState, useEffect } from 'react';
import ShapePreview from './ShapePreview.tsx';
import { generateBlobShape } from '../../../utils';
import type { BlobProps } from '../../../types.ts';

interface StoredShapesProps {
    lastMutationTime: number;
}

export default function StoredShapes(props: StoredShapesProps) {
    const { lastMutationTime } = props;
    const [storedBlobKeys, setStoredBlobKeys] = useState<string[]>([]);
    const [currentlySelectedKey, setCurrentlySelectedKey] = useState<string>(null);
    const [selectedBlobPreviewData, setSelectedBlobPreviewData] = useState<BlobProps>(null);

    const fetchAllBlobKeys = async () => {
        console.log('Fetching keys...');
        const response = await fetch('/api/blobs', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const responseData = await response.json();
        if (responseData.keys) {
            setStoredBlobKeys(responseData.keys);
        }
    };

    const fetchBlobDataByKey = async (blobKey: string) => {
        setCurrentlySelectedKey(blobKey);
        const queryParams = new URLSearchParams({ key: blobKey });
        const response = await fetch(`/api/blob/?${queryParams}`, {
            method: 'GET'
        });
        const responseData = await response.json();
        if (responseData.blob) {
            setSelectedBlobPreviewData(generateBlobShape(responseData.blob));
        }
    };

    useEffect(() => {
        fetchAllBlobKeys();
    }, [lastMutationTime]);

    return (
        <>
            <h2 className="mb-4 text-xl text-center sm:text-xl">Objects in Blob Store</h2>
            <div className="w-full bg-white rounded-lg">
                <div className="p-4 text-center min-h-14">
                    {storedBlobKeys?.length ? (
                        <div className="space-y-1">
                            {storedBlobKeys.map((blobKeyName) => (
                                <button
                                    key={blobKeyName}
                                    className={
                                        'inline-flex items-center justify-center w-full px-4 py-1.5 rounded-sm text-sm text-gray-900 cursor-pointer text-center transition hover:bg-complementary/20' +
                                        (currentlySelectedKey === blobKeyName ? ' bg-complementary/20 pointer-events-none' : '')
                                    }
                                    onClick={() => {
                                        fetchBlobDataByKey(blobKeyName);
                                    }}
                                >
                                    {blobKeyName}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <span className="text-gray-900">Please upload some shapes!</span>
                    )}
                </div>
                {selectedBlobPreviewData && (
                    <div className="p-4 border-t border-gray-200 aspect-square text-primary">
                        <ShapePreview {...selectedBlobPreviewData} />
                    </div>
                )}
            </div>
        </>
    );
}
