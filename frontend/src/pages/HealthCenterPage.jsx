import React from 'react';
import { useCrisis } from '../context/CrisisContext';
import FeatureListPage from '../components/FeatureListPage';

const HealthCenterPage = () => {
    const { resources } = useCrisis();
    return (
        <FeatureListPage
            title="Relief Health Centers"
            items={resources.healthCenters}
            description="Temporary clinics and primary trauma care units set up for the crisis."
        />
    );
};

export default HealthCenterPage;
