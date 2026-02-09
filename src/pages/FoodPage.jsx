import React from 'react';
import { useCrisis } from '../context/CrisisContext';
import FeatureListPage from '../components/FeatureListPage';

const FoodPage = () => {
    const { resources } = useCrisis();
    return (
        <FeatureListPage
            title="Food Assistance"
            items={resources.food}
            description="Verified cloud kitchens and community ration distribution points."
        />
    );
};

export default FoodPage;
