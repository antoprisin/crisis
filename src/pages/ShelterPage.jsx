import React from 'react';
import { useCrisis } from '../context/CrisisContext';
import FeatureListPage from '../components/FeatureListPage';

const ShelterPage = () => {
    const { resources } = useCrisis();
    return (
        <FeatureListPage
            title="Emergency Shelters"
            items={resources.shelters}
            description="Active refuge camps and government-supported housing facilities."
        />
    );
};

export default ShelterPage;
