import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import ShapePreview from './ShapePreview.tsx';
import { generateBlobShape, isUploadDisabled } from '../../../utils';
import type { BlobProps } from '../../../types.ts';

interface NewShapeProps {
    setLastMutationTime?: Dispatch<SetStateAction<number>>;
}

export default function NewShape(props: NewShapeProps) {
    const { setLastMutationTime } = props;
    const [currentBlobData, setCurrentBlobData] = useState<BlobProps>();
    const [hasBeenUploaded, setHasBeenUploaded] = useState<boolean>(false);

    const generateNewRandomBlob = () => {
        setCurrentBlobData(generateBlobShape());
        setHasBeenUploaded(false);
    };

    const uploadBlobToStore = async () => {
        const response = await fetch('/api/blobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentBlobData.parameters)
        });
        const responseData = await response.json();
        if (responseData.message) {
            console.log(responseData.message);
        }
        setHasBeenUploaded(true);
        setLastMutationTime(Date.now());
    };

    useEffect(() => {
        if (!currentBlobData) {
            generateNewRandomBlob();
        }
    }, [currentBlobData]);

    return (
        <>
            <h2 className="mb-4 text-xl text-center sm:text-xl">New Random Shape</h2>
            <div className="w-full mb-6 bg-white rounded-lg">
                <div className="p-4 text-center text-gray-900 border-b border-gray-200 min-h-14">{currentBlobData && <span>{currentBlobData.parameters?.name}</span>}</div>
                <div className="p-4 aspect-square text-primary">{currentBlobData && <ShapePreview {...currentBlobData} />}</div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                <button className="btn" onClick={generateNewRandomBlob}>
                    Randomize
                </button>
                <button className="btn" onClick={uploadBlobToStore} disabled={isUploadDisabled || hasBeenUploaded || !currentBlobData}>
                    Upload
                </button>
            </div>
        </>
    );
}
