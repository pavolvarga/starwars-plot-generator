import React, { FC } from 'react';
import { Spinner } from 'reactstrap';

type LoaderProps = {
    mandatoryDataLoaded: boolean
}
export const Loader: FC<LoaderProps> = ({mandatoryDataLoaded}: LoaderProps) => {

    if (!mandatoryDataLoaded) {
        return (
            <div className="text-center">
                <h3>Please wait while star wars data is being loaded</h3>
                <Spinner style={{ width: '5rem', height: '5rem' }} />{' '}
            </div>
        );
    }

    return null;
};
