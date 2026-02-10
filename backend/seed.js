const mongoose = require('mongoose');
const Resource = require('./models/Resource');
require('dotenv').config();

const resourcesData = {
    food: [
        { id: 1, name: 'Unity Cloud Kitchen', location: 'Sector 4, North', rating: 4.8, type: 'NGO', coords: [12.9716, 77.5946], menu: 'Hot Meals, Water', status: 'Active' },
        { id: 2, name: 'Rescue Ration Point', location: 'East Junction', rating: 4.5, type: 'Govt', coords: [12.9800, 77.6000], menu: 'Dry Rations, Baby Food', status: 'Active' },
        { id: 3, name: 'Sewa Community Kitchen', location: 'West Block', rating: 4.9, type: 'Volunteer', coords: [12.9650, 77.5850], menu: 'Veg Meals', status: 'Limited' },
        { id: 4, name: 'Apex Food Hub', location: 'Central Market', rating: 4.6, type: 'NGO', coords: [12.9750, 77.5900], menu: 'Breakfast Kits', status: 'Active' },
        { id: 5, name: 'Global Relief Kitchen', location: 'South Plaza', rating: 4.7, type: 'NGO', coords: [12.9600, 77.5910], menu: 'Lentils & Rice', status: 'Active' },
        { id: 6, name: 'Metro Feed Center', location: 'Station Square', rating: 4.4, type: 'Govt', coords: [12.9820, 77.5850], menu: 'Bread, Milk', status: 'Limited' },
        { id: 7, name: 'Community Care Point', location: 'Old Town', rating: 4.9, type: 'Volunteer', coords: [12.9700, 77.5750], menu: 'Hot Soup, Tea', status: 'Active' },
        { id: 8, name: 'Victory Ration Stop', location: 'Industrial Wing', rating: 4.2, type: 'NGO', coords: [12.9900, 77.6050], menu: 'Dry Snacks', status: 'Active' },
        { id: 9, name: 'Parkside Meals', location: 'Garden Area', rating: 4.8, type: 'Volunteer', coords: [12.9680, 77.6100], menu: 'Fruit Packs', status: 'Active' },
        { id: 10, name: 'Harbor Kitchen', location: 'Dockview', rating: 4.5, type: 'NGO', coords: [12.9550, 77.5800], menu: 'Sandwiches', status: 'Limited' },
        { id: 11, name: 'Skyline Ration Terminal', location: 'North Towers', rating: 4.3, type: 'Govt', coords: [12.9950, 77.5950], menu: 'Standard Meals', status: 'Active' },
        { id: 12, name: 'Bridge Food Point', location: 'West Crossing', rating: 4.7, type: 'Volunteer', coords: [12.9720, 77.5650], menu: 'Energy Bars', status: 'Active' },
        { id: 13, name: 'Elite Relief Hub', location: 'Uptown', rating: 4.9, type: 'NGO', coords: [12.9880, 77.5880], menu: 'Organic Meals', status: 'Active' },
        { id: 14, name: 'Basement Soup Kitchen', location: 'Lower District', rating: 4.1, type: 'Volunteer', coords: [12.9620, 77.6200], menu: 'Hot Stew', status: 'Limited' },
        { id: 15, name: 'Express Food Node', location: 'East Link', rating: 4.4, type: 'Govt', coords: [12.9770, 77.6150], menu: 'Canned Goods', status: 'Active' }
    ],
    shelters: [
        { id: 1, name: 'PWD Community Hall', location: 'Central Square', rating: 4.2, type: 'Govt', coords: [12.9750, 77.5850], occupancy: 200, occupants: 184, status: 'Near Capacity' },
        { id: 2, name: 'Red Cross Shelter A', location: 'East Wing', rating: 4.7, type: 'NGO', coords: [12.9650, 77.6050], occupancy: 100, occupants: 42, status: 'Available' },
        { id: 3, name: 'Metro Station-3 Refuge', location: 'Station North', rating: 3.9, type: 'Public', coords: [12.9700, 77.5900], occupancy: 500, occupants: 490, status: 'Full' },
        { id: 4, name: 'Stadium Relief Zone', location: 'Main Stadium', rating: 4.5, type: 'Govt', coords: [12.9850, 77.5800], occupancy: 1000, occupants: 650, status: 'Available' },
        { id: 5, name: 'Blue Sky Sanctuary', location: 'West Hills', rating: 4.8, type: 'NGO', coords: [12.9550, 77.5700], occupancy: 150, occupants: 110, status: 'Available' },
        { id: 6, name: 'Safe Haven Hub', location: 'South Harbor', rating: 4.6, type: 'NGO', coords: [12.9500, 77.5950], occupancy: 80, occupants: 78, status: 'Near Capacity' },
        { id: 7, name: 'Unity School Refuge', location: 'Sector 5', rating: 4.1, type: 'Public', coords: [12.9780, 77.6020], occupancy: 300, occupants: 245, status: 'Available' },
        { id: 8, name: 'Mountain View Shelter', location: 'North Ridge', rating: 4.9, type: 'Volunteer', coords: [12.9980, 77.5880], occupancy: 50, occupants: 12, status: 'Available' },
        { id: 9, name: 'City Library Basement', location: 'Central', rating: 4.3, type: 'Govt', coords: [12.9720, 77.5980], occupancy: 120, occupants: 118, status: 'Near Capacity' },
        { id: 10, name: 'Hope Center East', location: 'East Junction', rating: 4.7, type: 'NGO', coords: [12.9800, 77.6180], occupancy: 250, occupants: 190, status: 'Available' }
    ],
    doctors: [
        { id: 1, name: 'Dr. Sarah Wilson', specialization: 'Trauma Surgery', location: 'Field Hospital 1', rating: 5.0, type: 'Volunteer', coords: [12.9730, 77.5960], status: 'Online' },
        { id: 2, name: 'Dr. Rahul Mehta', specialization: 'General Physician', location: 'Relief Camp B', rating: 4.8, type: 'Govt', coords: [12.9850, 77.6050], status: 'Online' },
        { id: 3, name: 'Dr. Elena Fisher', specialization: 'Pediatrics', location: 'Mobile Unit 4', rating: 4.9, type: 'NGO', coords: [12.9780, 77.5800], status: 'On Call' },
        { id: 4, name: 'Dr. James King', specialization: 'Emergency Med', location: 'North Clinic', rating: 4.7, type: 'NGO', coords: [12.9920, 77.5920], status: 'Online' },
        { id: 5, name: 'Dr. Anita Roy', specialization: 'Cardiology', location: 'City Core', rating: 4.9, type: 'Govt', coords: [12.9700, 77.6000], status: 'Online' },
        { id: 6, name: 'Dr. Mark Sloan', specialization: 'Orthopedics', location: 'West Wing', rating: 4.6, type: 'Volunteer', coords: [12.9650, 77.5750], status: 'Online' },
        { id: 7, name: 'Dr. Lisa Cuddy', specialization: 'Infectious Disease', location: 'Sector 8', rating: 5.0, type: 'NGO', coords: [12.9810, 77.6120], status: 'Busy' },
        { id: 8, name: 'Dr. Ben Chang', specialization: 'General Physician', location: 'Mobile Unit 7', rating: 4.3, type: 'Govt', coords: [12.9580, 77.5880], status: 'Online' },
        { id: 9, name: 'Dr. Sofia Rossi', specialization: 'Psychiatry', location: 'Relief Hub 3', rating: 4.8, type: 'Volunteer', coords: [12.9880, 77.5820], status: 'On Call' },
        { id: 10, name: 'Dr. David Lee', specialization: 'Trauma Surgery', location: 'Field Hospital 2', rating: 4.9, type: 'NGO', coords: [12.9620, 77.6150], status: 'Online' },
        { id: 11, name: 'Dr. Maria Garcia', specialization: 'Neurology', location: 'Central Hub', rating: 4.7, type: 'Govt', coords: [12.9760, 77.5940], status: 'Online' },
        { id: 12, name: 'Dr. Kevin Zhang', specialization: 'Dermatology', location: 'East Park', rating: 4.4, type: 'Volunteer', coords: [12.9840, 77.6250], status: 'Online' },
        { id: 13, name: 'Dr. Rachel Green', specialization: 'Obstetrics', location: 'South Wing', rating: 4.9, type: 'NGO', coords: [12.9480, 77.6020], status: 'Busy' },
        { id: 14, name: 'Dr. Tom Baker', specialization: 'Emergency Med', location: 'Station Point', rating: 4.5, type: 'Govt', coords: [12.9740, 77.5820], status: 'Online' },
        { id: 15, name: 'Dr. Clara Oswald', specialization: 'General Physician', location: 'Remote Unit A', rating: 4.8, type: 'Volunteer', coords: [13.0020, 77.6080], status: 'Online' }
    ],
    healthCenters: [
        { id: 1, name: 'Sector 5 Health Post', location: 'Post 5', rating: 4.4, type: 'Primary', coords: [12.9680, 77.5920], status: 'Active' },
        { id: 2, name: 'NGO Mobile Clinic', location: 'Mobile Unit 1', rating: 4.6, type: 'Emergency', coords: [12.9810, 77.6010], status: 'Moving' },
        { id: 3, name: 'City Wellness Center', location: 'Central West', rating: 4.7, type: 'Secondary', coords: [12.9730, 77.5720], status: 'Active' },
        { id: 4, name: 'Govt Relief Infirmary', location: 'North Point', rating: 4.2, type: 'Primary', coords: [12.9960, 77.5900], status: 'Active' },
        { id: 5, name: 'Red Shield Clinic', location: 'East Link', rating: 4.9, type: 'NGO', coords: [12.9860, 77.6200], status: 'Active' },
        { id: 6, name: 'Community Medical Node', location: 'South Village', rating: 4.5, type: 'Volunteer', coords: [12.9520, 77.6080], status: 'Active' }
    ],
    bloodBanks: [
        { id: 1, name: 'Red Cross Blood Bank', location: 'Central Square North', rating: 4.9, type: 'Blood Bank', coords: [12.9716, 77.5946], stocks: 'O+, A-, B+', status: 'High Stock' },
        { id: 2, name: 'Lifeline Hematology Center', location: 'East Medical Park', rating: 4.7, type: 'Blood Bank', coords: [12.9840, 77.6120], stocks: 'All Groups', status: 'Active' },
        { id: 3, name: 'St. Marys Blood Hub', location: 'West Medical Wing', rating: 4.5, type: 'Blood Bank', coords: [12.9610, 77.5750], stocks: 'O-, AB+', status: 'Limited' },
        { id: 4, name: 'City Core Plasma Bank', location: 'Medical Towers', rating: 4.8, type: 'Blood Bank', coords: [12.9770, 77.5980], stocks: 'B+, A+, O+', status: 'Active' },
        { id: 5, name: 'Sunrise Donors Point', location: 'North Plaza', rating: 4.6, type: 'Blood Bank', coords: [12.9900, 77.5920], stocks: 'O-, B-', status: 'Active' },
        { id: 6, name: 'Metro Hematics', location: 'Underground Mall', rating: 4.3, type: 'Blood Bank', coords: [12.9680, 77.5850], stocks: 'All groups', status: 'Critical Stock' },
        { id: 7, name: 'Hope Blood Services', location: 'Industrial Sector', rating: 4.4, type: 'Blood Bank', coords: [12.9820, 77.6300], stocks: 'A-, B+, AB-', status: 'Active' },
        { id: 8, name: 'Elite Plasma Hub', location: 'River Road', rating: 4.9, type: 'Blood Bank', coords: [12.9550, 77.6100], stocks: 'Special Rare groups', status: 'Active' },
        { id: 9, name: 'Global Blood Network', location: 'High Rise 4', rating: 4.7, type: 'Blood Bank', coords: [12.9950, 77.6150], stocks: 'AB+, O+, A+', status: 'Active' },
        { id: 10, name: 'Unity Hematology', location: 'Lower Market', rating: 4.2, type: 'Blood Bank', coords: [12.9630, 77.5680], stocks: 'B+, O-', status: 'Active' }
    ]
};

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bloodlink');
        console.log('Connected for seeding...');

        await Resource.deleteMany({});

        const flatData = [];
        Object.keys(resourcesData).forEach(category => {
            resourcesData[category].forEach(item => {
                flatData.push({ ...item, category });
            });
        });

        await Resource.insertMany(flatData);
        console.log(`✅ Successfully uploaded ${flatData.length} nodes to the Neural Core.`);
        process.exit();
    } catch (err) {
        console.error('❌ Seeding Failed:', err);
        process.exit(1);
    }
};

seed();
