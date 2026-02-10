import React from 'react';
import { useCrisis } from '../context/CrisisContext';
import FeatureListPage from '../components/FeatureListPage';

const DoctorPage = () => {
    const { resources } = useCrisis();
    return (
        <FeatureListPage
            title="Volunteer Doctors"
            items={resources.doctors}
            description="Specialized medical personnel available for emergency consultation."
        />
    );
};

export default DoctorPage;
