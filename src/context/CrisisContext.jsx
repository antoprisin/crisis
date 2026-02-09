import React, { createContext, useContext, useState, useEffect } from 'react';

const CrisisContext = createContext();

export const CrisisProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [permissions, setPermissions] = useState({
    location: true,
    calls: false,
    contacts: false,
    files: false,
    drive: false
  });
  const [emergencyLevel, setEmergencyLevel] = useState('Critical');
  const [notifications, setNotifications] = useState([]);

  // Global Data Registry
  const [resources, setResources] = useState({
    food: [],
    shelters: [],
    doctors: [
      { id: 1, name: 'Dr. Sarah Wilson', specialization: 'Trauma Surgery', location: 'Field Hospital 1', rating: 5.0, type: 'Volunteer', coords: [12.9730, 77.5960] },
      {
        "id": 16,
        "name": "Dr. Chennai 1",
        "specialization": "Pediatrics",
        "location": "Vadapalani",
        "rating": "4.1",
        "type": "Volunteer",
        "coords": [13.074069327853154, 80.258543],
        "status": "Online"
      },
      {
        "id": 17,
        "name": "Dr. Chennai 2",
        "specialization": "Obstetrics",
        "location": "Porur",
        "rating": "4.4",
        "type": "Volunteer",
        "coords": [13.12572027916572, 80.233098],
        "status": "Online"
      },
      {
        "id": 18,
        "name": "Dr. Chennai 3",
        "specialization": "Trauma Surgery",
        "location": "Poonamallee",
        "rating": "4.0",
        "type": "Volunteer",
        "coords": [
          13.001022056728102,
          80.21587842368446
        ],
        "status": "Online"
      },
      {
        "id": 19,
        "name": "Dr. Chennai 4",
        "specialization": "General Physician",
        "location": "Ambattur",
        "rating": "4.8",
        "type": "Volunteer",
        "coords": [
          13.121771710055706,
          80.25581800999967
        ],
        "status": "Online"
      },
      {
        "id": 20,
        "name": "Dr. Chennai 5",
        "specialization": "Emergency Med",
        "location": "Adyar",
        "rating": "4.1",
        "type": "Volunteer",
        "coords": [
          13.149574209381411,
          80.21344575653153
        ],
        "status": "Online"
      },
      {
        "id": 21,
        "name": "Dr. Chennai 6",
        "specialization": "Cardiology",
        "location": "T. Nagar",
        "rating": "4.8",
        "type": "Volunteer",
        "coords": [
          13.069329308098686,
          80.25738167149905
        ],
        "status": "Online"
      },
      {
        "id": 22,
        "name": "Dr. Chennai 7",
        "specialization": "Pediatrics",
        "location": "Velachery",
        "rating": "4.6",
        "type": "Volunteer",
        "coords": [13.048601867540466, 80.244250],
        "status": "Online"
      },
      {
        "id": 23,
        "name": "Dr. Chennai 8",
        "specialization": "Obstetrics",
        "location": "Mylapore",
        "rating": "4.7",
        "type": "Volunteer",
        "coords": [
          13.107245019107756,
          80.1905035761136
        ],
        "status": "Online"
      },
      {
        "id": 24,
        "name": "Dr. Chennai 9",
        "specialization": "Trauma Surgery",
        "location": "Anna Nagar",
        "rating": "4.3",
        "type": "Volunteer",
        "coords": [
          13.10369170128935,
          80.17975253501812
        ],
        "status": "Online"
      },
      {
        "id": 25,
        "name": "Dr. Chennai 10",
        "specialization": "General Physician",
        "location": "Nungambakkam",
        "rating": "4.9",
        "type": "Volunteer",
        "coords": [13.182692945380849, 80.226182],
        "status": "Online"
      },
      {
        "id": 26,
        "name": "Dr. Chennai 11",
        "specialization": "Emergency Med",
        "location": "Besant Nagar",
        "rating": "4.7",
        "type": "Volunteer",
        "coords": [
          13.08782575303646,
          80.252314407696
        ],
        "status": "Online"
      },
      {
        "id": 27,
        "name": "Dr. Chennai 12",
        "specialization": "Cardiology",
        "location": "Guindy",
        "rating": "4.5",
        "type": "Volunteer",
        "coords": [13.022356635565819, 80.186218],
        "status": "Online"
      },
      {
        "id": 28,
        "name": "Dr. Chennai 13",
        "specialization": "Pediatrics",
        "location": "Chromepet",
        "rating": "4.4",
        "type": "Volunteer",
        "coords": [13.080223800809078, 80.247203],
        "status": "Online"
      },
      {
        "id": 29,
        "name": "Dr. Chennai 14",
        "specialization": "Obstetrics",
        "location": "Tambaram",
        "rating": "4.8",
        "type": "Volunteer",
        "coords": [
          13.025810450088002,
          80.2657436712597
        ],
        "status": "Online"
      },
      {
        "id": 30,
        "name": "Dr. Chennai 15",
        "specialization": "Trauma Surgery",
        "location": "Perambur",
        "rating": "4.3",
        "type": "Volunteer",
        "coords": [
          13.029843221540279,
          80.22658620239466
        ],
        "status": "Online"
      },
      {
        "id": 31,
        "name": "Dr. Chennai 16",
        "specialization": "General Physician",
        "location": "Egmore",
        "rating": "4.6",
        "type": "Volunteer",
        "coords": [12.99195886307595, 80.232598],
        "status": "Online"
      },
      {
        "id": 32,
        "name": "Dr. Chennai 17",
        "specialization": "Emergency Med",
        "location": "Royapettah",
        "rating": "4.8",
        "type": "Volunteer",
        "coords": [
          13.130572270896987,
          80.25437574222644
        ],
        "status": "Online"
      },
      {
        "id": 33,
        "name": "Dr. Chennai 18",
        "specialization": "Cardiology",
        "location": "Saidapet",
        "rating": "4.3",
        "type": "Volunteer",
        "coords": [
          13.043723246993013,
          80.25534184944681
        ],
        "status": "Online"
      },
      {
        "id": 34,
        "name": "Dr. Chennai 19",
        "specialization": "Pediatrics",
        "location": "Thiruvanmiyur",
        "rating": "4.5",
        "type": "Volunteer",
        "coords": [13.016909890428249, 80.198671],
        "status": "Online"
      },
      {
        "id": 35,
        "name": "Dr. Chennai 20",
        "specialization": "Obstetrics",
        "location": "Kodambakkam",
        "rating": "4.3",
        "type": "Volunteer",
        "coords": [13.150760949433135, 80.240111],
        "status": "Online"
      },
      {
        "id": 36,
        "name": "Dr. Chennai 21",
        "specialization": "Trauma Surgery",
        "location": "Vadapalani",
        "rating": "4.8",
        "type": "Volunteer",
        "coords": [
          13.158243945320775,
          80.22045605174125
        ],
        "status": "Online"
      },
      {
        "id": 37,
        "name": "Dr. Chennai 22",
        "specialization": "General Physician",
        "location": "Porur",
        "rating": "4.7",
        "type": "Volunteer",
        "coords": [13.13466662600927, 80.211774],
        "status": "Online"
      },
      {
        "id": 38,
        "name": "Dr. Chennai 23",
        "specialization": "Emergency Med",
        "location": "Poonamallee",
        "rating": "4.7",
        "type": "Volunteer",
        "coords": [13.080961024759796, 80.264342],
        "status": "Online"
      },
      {
        "id": 39,
        "name": "Dr. Chennai 24",
        "specialization": "Cardiology",
        "location": "Ambattur",
        "rating": "4.7",
        "type": "Volunteer",
        "coords": [13.063221969163582, 80.204655],
        "status": "Online"
      },
      {
        "id": 40,
        "name": "Dr. Chennai 25",
        "specialization": "Pediatrics",
        "location": "Adyar",
        "rating": "4.6",
        "type": "Volunteer",
        "coords": [
          13.159432605081175,
          80.26588623557356
        ],
        "status": "Online"
      },
      {
        "id": 41,
        "name": "Dr. Chennai 26",
        "specialization": "Obstetrics",
        "location": "T. Nagar",
        "rating": "4.2",
        "type": "Volunteer",
        "coords": [
          13.12657462107957,
          80.17537363601005
        ],
        "status": "Online"
      },
      {
        "id": 42,
        "name": "Dr. Chennai 27",
        "specialization": "Trauma Surgery",
        "location": "Velachery",
        "rating": "4.0",
        "type": "Volunteer",
        "coords": [
          13.085324547664104,
          80.18856266740669
        ],
        "status": "Online"
      },
      {
        "id": 43,
        "name": "Dr. Chennai 28",
        "specialization": "General Physician",
        "location": "Mylapore",
        "rating": "5.0",
        "type": "Volunteer",
        "coords": [
          12.985247618824204,
          80.23348986095829
        ],
        "status": "Online"
      },
      {
        "id": 44,
        "name": "Dr. Chennai 29",
        "specialization": "Emergency Med",
        "location": "Anna Nagar",
        "rating": "4.8",
        "type": "Volunteer",
        "coords": [13.048178223704346, 80.247319],
        "status": "Online"
      },
      {
        "id": 45,
        "name": "Dr. Chennai 30",
        "specialization": "Cardiology",
        "location": "Nungambakkam",
        "rating": "4.0",
        "type": "Volunteer",
        "coords": [13.142722577355418, 80.232852],
        "status": "Online"
      },
      {
        "id": 46,
        "name": "Dr. Chennai 31",
        "specialization": "Pediatrics",
        "location": "Besant Nagar",
        "rating": "4.4",
        "type": "Volunteer",
        "coords": [13.030260063204201, 80.208709],
        "status": "Online"
      },
      {
        "id": 47,
        "name": "Dr. Chennai 32",
        "specialization": "Obstetrics",
        "location": "Guindy",
        "rating": "5.0",
        "type": "Volunteer",
        "coords": [
          13.128678923186047,
          80.23434712993749
        ],
        "status": "Online"
      },
      {
        "id": 48,
        "name": "Dr. Chennai 33",
        "specialization": "Trauma Surgery",
        "location": "Chromepet",
        "rating": "4.9",
        "type": "Volunteer",
        "coords": [
          13.065721326466702,
          80.25916242291055
        ],
        "status": "Online"
      },
      {
        "id": 49,
        "name": "Dr. Chennai 34",
        "specialization": "General Physician",
        "location": "Tambaram",
        "rating": "4.4",
        "type": "Volunteer",
        "coords": [13.071379514566175, 80.219272],
        "status": "Online"
      },
      {
        "id": 50,
        "name": "Dr. Chennai 35",
        "specialization": "Emergency Med",
        "location": "Perambur",
        "rating": "4.6",
        "type": "Volunteer",
        "coords": [13.11356254527726, 80.260036],
        "status": "Online"
      },
      {
        "id": 51,
        "name": "Dr. Chennai 36",
        "specialization": "Cardiology",
        "location": "Egmore",
        "rating": "4.2",
        "type": "Volunteer",
        "coords": [13.005274613941234, 80.254528],
        "status": "Online"
      },
      {
        "id": 52,
        "name": "Dr. Chennai 37",
        "specialization": "Pediatrics",
        "location": "Royapettah",
        "rating": "4.5",
        "type": "Volunteer",
        "coords": [13.061916263877883, 80.223117],
        "status": "Online"
      },
      {
        "id": 53,
        "name": "Dr. Chennai 38",
        "specialization": "Obstetrics",
        "location": "Saidapet",
        "rating": "4.2",
        "type": "Volunteer",
        "coords": [13.050804050916003, 80.252557],
        "status": "Online"
      },
      {
        "id": 54,
        "name": "Dr. Chennai 39",
        "specialization": "Trauma Surgery",
        "location": "Thiruvanmiyur",
        "rating": "4.3",
        "type": "Volunteer",
        "coords": [13.153737108633326, 80.220139],
        "status": "Online"
      },
      {
        "id": 55,
        "name": "Dr. Chennai 40",
        "specialization": "General Physician",
        "location": "Kodambakkam",
        "rating": "5.0",
        "type": "Volunteer",
        "coords": [13.172997031235814, 80.237994],
        "status": "Online"
      },
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
      { id: 15, name: 'Dr. Clara Oswald', specialization: 'General Physician', location: 'Remote Unit A', rating: 4.8, type: 'Volunteer', coords: [13.0020, 77.6080], status: 'Online' },
    ],
    healthCenters: [
      { id: 1, name: 'Sector 5 Health Post', location: 'Post 5', rating: 4.4, type: 'Primary', coords: [12.9680, 77.5920], status: 'Active' },
      {
        "id": 7,
        "name": "Chennai Health Post 1",
        "location": "Guindy",
        "rating": "4.5",
        "type": "Primary",
        "coords": [13.097115103014508, 80.266347],
        "status": "Active"
      },
      {
        "id": 8,
        "name": "Chennai Health Post 2",
        "location": "Chromepet",
        "rating": "4.3",
        "type": "Primary",
        "coords": [13.14242352881092, 80.261241],
        "status": "Active"
      },
      {
        "id": 9,
        "name": "Chennai Health Post 3",
        "location": "Tambaram",
        "rating": "4.7",
        "type": "Primary",
        "coords": [
          13.133101228421053,
          80.1761573641849
        ],
        "status": "Active"
      },
      {
        "id": 10,
        "name": "Chennai Health Post 4",
        "location": "Perambur",
        "rating": "4.7",
        "type": "Primary",
        "coords": [
          13.015224051752352,
          80.19044338341968
        ],
        "status": "Active"
      },
      {
        "id": 11,
        "name": "Chennai Health Post 5",
        "location": "Egmore",
        "rating": "4.5",
        "type": "Primary",
        "coords": [12.990124746379756, 80.253419],
        "status": "Active"
      },
      {
        "id": 12,
        "name": "Chennai Health Post 6",
        "location": "Royapettah",
        "rating": "4.7",
        "type": "Primary",
        "coords": [13.096648027150357, 80.257833],
        "status": "Active"
      },
      {
        "id": 13,
        "name": "Chennai Health Post 7",
        "location": "Saidapet",
        "rating": "4.6",
        "type": "Primary",
        "coords": [13.086767082862771, 80.219049],
        "status": "Active"
      },
      {
        "id": 14,
        "name": "Chennai Health Post 8",
        "location": "Thiruvanmiyur",
        "rating": "4.6",
        "type": "Primary",
        "coords": [13.116290097900558, 80.246556],
        "status": "Active"
      },
      {
        "id": 15,
        "name": "Chennai Health Post 9",
        "location": "Kodambakkam",
        "rating": "4.5",
        "type": "Primary",
        "coords": [13.133270414059686, 80.224851],
        "status": "Active"
      },
      {
        "id": 16,
        "name": "Chennai Health Post 10",
        "location": "Vadapalani",
        "rating": "4.4",
        "type": "Primary",
        "coords": [
          13.168251622609,
          80.25195288334865
        ],
        "status": "Active"
      },
      {
        "id": 17,
        "name": "Chennai Health Post 11",
        "location": "Porur",
        "rating": "4.1",
        "type": "Primary",
        "coords": [13.083503660752257, 80.264426],
        "status": "Active"
      },
      {
        "id": 18,
        "name": "Chennai Health Post 12",
        "location": "Poonamallee",
        "rating": "4.0",
        "type": "Primary",
        "coords": [
          13.021963215327293,
          80.22444320661566
        ],
        "status": "Active"
      },
      {
        "id": 19,
        "name": "Chennai Health Post 13",
        "location": "Ambattur",
        "rating": "4.4",
        "type": "Primary",
        "coords": [
          13.028629100708217,
          80.24846589961143
        ],
        "status": "Active"
      },
      {
        "id": 20,
        "name": "Chennai Health Post 14",
        "location": "Adyar",
        "rating": "4.4",
        "type": "Primary",
        "coords": [
          13.158482821845922,
          80.21449171636777
        ],
        "status": "Active"
      },
      {
        "id": 21,
        "name": "Chennai Health Post 15",
        "location": "T. Nagar",
        "rating": "4.7",
        "type": "Primary",
        "coords": [
          13.111110819176318,
          80.26163547876759
        ],
        "status": "Active"
      },
      {
        "id": 22,
        "name": "Chennai Health Post 16",
        "location": "Velachery",
        "rating": "4.6",
        "type": "Primary",
        "coords": [13.038505291405212, 80.249223],
        "status": "Active"
      },
      {
        "id": 23,
        "name": "Chennai Health Post 17",
        "location": "Mylapore",
        "rating": "4.4",
        "type": "Primary",
        "coords": [13.02613876732325, 80.206359],
        "status": "Active"
      },
      {
        "id": 24,
        "name": "Chennai Health Post 18",
        "location": "Anna Nagar",
        "rating": "4.7",
        "type": "Primary",
        "coords": [
          13.164936740258609,
          80.18320551441091
        ],
        "status": "Active"
      },
      {
        "id": 25,
        "name": "Chennai Health Post 19",
        "location": "Nungambakkam",
        "rating": "4.5",
        "type": "Primary",
        "coords": [13.042688065980952, 80.183165],
        "status": "Active"
      },
      {
        "id": 26,
        "name": "Chennai Health Post 20",
        "location": "Besant Nagar",
        "rating": "4.4",
        "type": "Primary",
        "coords": [13.05604615451585, 80.262199],
        "status": "Active"
      },
      {
        "id": 27,
        "name": "Chennai Health Post 21",
        "location": "Guindy",
        "rating": "4.6",
        "type": "Primary",
        "coords": [
          13.13899792087364,
          80.26276183233051
        ],
        "status": "Active"
      },
      {
        "id": 28,
        "name": "Chennai Health Post 22",
        "location": "Chromepet",
        "rating": "5.0",
        "type": "Primary",
        "coords": [
          13.130063333976475,
          80.25484602654781
        ],
        "status": "Active"
      },
      {
        "id": 29,
        "name": "Chennai Health Post 23",
        "location": "Tambaram",
        "rating": "4.4",
        "type": "Primary",
        "coords": [12.984837565736083, 80.195396],
        "status": "Active"
      },
      {
        "id": 30,
        "name": "Chennai Health Post 24",
        "location": "Perambur",
        "rating": "4.3",
        "type": "Primary",
        "coords": [
          13.140050161462609,
          80.21651286194773
        ],
        "status": "Active"
      },
      {
        "id": 31,
        "name": "Chennai Health Post 25",
        "location": "Egmore",
        "rating": "4.2",
        "type": "Primary",
        "coords": [13.042115537437518, 80.211695],
        "status": "Active"
      },
      {
        "id": 32,
        "name": "Chennai Health Post 26",
        "location": "Royapettah",
        "rating": "4.8",
        "type": "Primary",
        "coords": [13.100252485144708, 80.203167],
        "status": "Active"
      },
      {
        "id": 33,
        "name": "Chennai Health Post 27",
        "location": "Saidapet",
        "rating": "4.8",
        "type": "Primary",
        "coords": [13.150459389099941, 80.245331],
        "status": "Active"
      },
      {
        "id": 34,
        "name": "Chennai Health Post 28",
        "location": "Thiruvanmiyur",
        "rating": "4.6",
        "type": "Primary",
        "coords": [13.064231083163039, 80.256863],
        "status": "Active"
      },
      {
        "id": 35,
        "name": "Chennai Health Post 29",
        "location": "Kodambakkam",
        "rating": "4.7",
        "type": "Primary",
        "coords": [
          13.064485826209065,
          80.22372101668826
        ],
        "status": "Active"
      },
      {
        "id": 36,
        "name": "Chennai Health Post 30",
        "location": "Vadapalani",
        "rating": "4.9",
        "type": "Primary",
        "coords": [
          13.068204719383411,
          80.17962700154354
        ],
        "status": "Active"
      },
      {
        "id": 37,
        "name": "Chennai Health Post 31",
        "location": "Porur",
        "rating": "4.7",
        "type": "Primary",
        "coords": [13.01889977315301, 80.207356],
        "status": "Active"
      },
      {
        "id": 38,
        "name": "Chennai Health Post 32",
        "location": "Poonamallee",
        "rating": "4.3",
        "type": "Primary",
        "coords": [
          13.134597100210916,
          80.18012610581157
        ],
        "status": "Active"
      },
      {
        "id": 39,
        "name": "Chennai Health Post 33",
        "location": "Ambattur",
        "rating": "4.6",
        "type": "Primary",
        "coords": [13.134238236742748, 80.230226],
        "status": "Active"
      },
      {
        "id": 40,
        "name": "Chennai Health Post 34",
        "location": "Adyar",
        "rating": "4.7",
        "type": "Primary",
        "coords": [
          13.03815108775168,
          80.25200570857322
        ],
        "status": "Active"
      },
      {
        "id": 41,
        "name": "Chennai Health Post 35",
        "location": "T. Nagar",
        "rating": "4.3",
        "type": "Primary",
        "coords": [13.106896809492259, 80.260250],
        "status": "Active"
      },
      {
        "id": 42,
        "name": "Chennai Health Post 36",
        "location": "Velachery",
        "rating": "4.6",
        "type": "Primary",
        "coords": [
          13.061790480980115,
          80.24585169610405
        ],
        "status": "Active"
      },
      {
        "id": 43,
        "name": "Chennai Health Post 37",
        "location": "Mylapore",
        "rating": "4.7",
        "type": "Primary",
        "coords": [13.01025229383429, 80.222249],
        "status": "Active"
      },
      {
        "id": 44,
        "name": "Chennai Health Post 38",
        "location": "Anna Nagar",
        "rating": "4.1",
        "type": "Primary",
        "coords": [
          13.047123393363117,
          80.22996005850358
        ],
        "status": "Active"
      },
      {
        "id": 45,
        "name": "Chennai Health Post 39",
        "location": "Nungambakkam",
        "rating": "4.2",
        "type": "Primary",
        "coords": [
          13.13298897988776,
          80.19844114252055
        ],
        "status": "Active"
      },
      {
        "id": 46,
        "name": "Chennai Health Post 40",
        "location": "Besant Nagar",
        "rating": "4.9",
        "type": "Primary",
        "coords": [
          13.04810206823574,
          80.19183360547501
        ],
        "status": "Active"
      },
      { id: 1, name: 'Sector 5 Health Post', location: 'Post 5', rating: 4.4, type: 'Primary', coords: [12.9680, 77.5920], status: 'Active' },
      { id: 2, name: 'NGO Mobile Clinic', location: 'Mobile Unit 1', rating: 4.6, type: 'Emergency', coords: [12.9810, 77.6010], status: 'Moving' },
      { id: 3, name: 'City Wellness Center', location: 'Central West', rating: 4.7, type: 'Secondary', coords: [12.9730, 77.5720], status: 'Active' },
      { id: 4, name: 'Govt Relief Infirmary', location: 'North Point', rating: 4.2, type: 'Primary', coords: [12.9960, 77.5900], status: 'Active' },
      { id: 5, name: 'Red Shield Clinic', location: 'East Link', rating: 4.9, type: 'NGO', coords: [12.9860, 77.6200], status: 'Active' },
      { id: 6, name: 'Community Medical Node', location: 'South Village', rating: 4.5, type: 'Volunteer', coords: [12.9520, 77.6080], status: 'Active' },
    ],
    bloodBanks: [
      { id: 1, name: 'Red Cross Blood Bank', location: 'Central Square North', rating: 4.9, type: 'Blood Bank', coords: [12.9716, 77.5946], stocks: 'O+, A-, B+', status: 'High Stock' },
      {
        "id": 11,
        "name": "Chennai Blood Hub 1",
        "location": "Egmore",
        "rating": "4.5",
        "type": "Blood Bank",
        "coords": [13.092590200916561, 80.258152],
        "stocks": "A-, B+",
        "status": "Active"
      },
      {
        "id": 12,
        "name": "Chennai Blood Hub 2",
        "location": "Royapettah",
        "rating": "4.6",
        "type": "Blood Bank",
        "coords": [13.133836865783165, 80.258069],
        "stocks": "B+, B-",
        "status": "Active"
      },
      {
        "id": 13,
        "name": "Chennai Blood Hub 3",
        "location": "Saidapet",
        "rating": "4.9",
        "type": "Blood Bank",
        "coords": [13.099222731639482, 80.230524],
        "stocks": "B-, AB+",
        "status": "Active"
      },
      {
        "id": 14,
        "name": "Chennai Blood Hub 4",
        "location": "Thiruvanmiyur",
        "rating": "4.4",
        "type": "Blood Bank",
        "coords": [13.036705304806098, 80.233091],
        "stocks": "AB+, AB-",
        "status": "Active"
      },
      {
        "id": 15,
        "name": "Chennai Blood Hub 5",
        "location": "Kodambakkam",
        "rating": "4.9",
        "type": "Blood Bank",
        "coords": [
          13.042546769780945,
          80.22754082335877
        ],
        "stocks": "AB-, O+",
        "status": "Critical Stock"
      },
      {
        "id": 16,
        "name": "Chennai Blood Hub 6",
        "location": "Vadapalani",
        "rating": "5.0",
        "type": "Blood Bank",
        "coords": [13.155275126480632, 80.245752],
        "stocks": "O+, O-",
        "status": "Active"
      },
      {
        "id": 17,
        "name": "Chennai Blood Hub 7",
        "location": "Porur",
        "rating": "4.7",
        "type": "Blood Bank",
        "coords": [
          13.118823147028818,
          80.19804387402031
        ],
        "stocks": "O-, A+",
        "status": "Active"
      },
      {
        "id": 18,
        "name": "Chennai Blood Hub 8",
        "location": "Poonamallee",
        "rating": "4.8",
        "type": "Blood Bank",
        "coords": [13.150245729826851, 80.206598],
        "stocks": "A+, A-",
        "status": "Active"
      },
      {
        "id": 19,
        "name": "Chennai Blood Hub 9",
        "location": "Ambattur",
        "rating": "4.5",
        "type": "Blood Bank",
        "coords": [
          13.071752724712955,
          80.24759283894655
        ],
        "stocks": "A-, B+",
        "status": "Active"
      },
      {
        "id": 20,
        "name": "Chennai Blood Hub 10",
        "location": "Adyar",
        "rating": "5.0",
        "type": "Blood Bank",
        "coords": [13.097589694299103, 80.210597],
        "stocks": "B+, B-",
        "status": "Critical Stock"
      },
      {
        "id": 21,
        "name": "Chennai Blood Hub 11",
        "location": "T. Nagar",
        "rating": "4.1",
        "type": "Blood Bank",
        "coords": [
          13.173385044132779,
          80.2373560294339
        ],
        "stocks": "B-, AB+",
        "status": "Active"
      },
      {
        "id": 22,
        "name": "Chennai Blood Hub 12",
        "location": "Velachery",
        "rating": "4.1",
        "type": "Blood Bank",
        "coords": [
          13.123742255465697,
          80.257125442783
        ],
        "stocks": "AB+, AB-",
        "status": "Active"
      },
      {
        "id": 23,
        "name": "Chennai Blood Hub 13",
        "location": "Mylapore",
        "rating": "4.5",
        "type": "Blood Bank",
        "coords": [
          13.019295887830648,
          80.23276197519196
        ],
        "stocks": "AB-, O+",
        "status": "Active"
      },
      {
        "id": 24,
        "name": "Chennai Blood Hub 14",
        "location": "Anna Nagar",
        "rating": "4.0",
        "type": "Blood Bank",
        "coords": [
          13.023000500145933,
          80.20989427394959
        ],
        "stocks": "O+, O-",
        "status": "Active"
      },
      {
        "id": 25,
        "name": "Chennai Blood Hub 15",
        "location": "Nungambakkam",
        "rating": "4.1",
        "type": "Blood Bank",
        "coords": [
          13.077152006311152,
          80.19012232676445
        ],
        "stocks": "O-, A+",
        "status": "Critical Stock"
      },
      {
        "id": 26,
        "name": "Chennai Blood Hub 16",
        "location": "Besant Nagar",
        "rating": "4.7",
        "type": "Blood Bank",
        "coords": [
          13.066501408619985,
          80.21003053016648
        ],
        "stocks": "A+, A-",
        "status": "Active"
      },
      {
        "id": 27,
        "name": "Chennai Blood Hub 17",
        "location": "Guindy",
        "rating": "4.4",
        "type": "Blood Bank",
        "coords": [
          13.170872571243562,
          80.25936133518394
        ],
        "stocks": "A-, B+",
        "status": "Active"
      },
      {
        "id": 28,
        "name": "Chennai Blood Hub 18",
        "location": "Chromepet",
        "rating": "4.9",
        "type": "Blood Bank",
        "coords": [12.99934082013404, 80.264314],
        "stocks": "B+, B-",
        "status": "Active"
      },
      {
        "id": 29,
        "name": "Chennai Blood Hub 19",
        "location": "Tambaram",
        "rating": "4.7",
        "type": "Blood Bank",
        "coords": [
          13.03103803632909,
          80.17447949511767
        ],
        "stocks": "B-, AB+",
        "status": "Active"
      },
      {
        "id": 30,
        "name": "Chennai Blood Hub 20",
        "location": "Perambur",
        "rating": "4.5",
        "type": "Blood Bank",
        "coords": [13.140284339494032, 80.249322],
        "stocks": "AB+, AB-",
        "status": "Critical Stock"
      },
      {
        "id": 31,
        "name": "Chennai Blood Hub 21",
        "location": "Egmore",
        "rating": "4.8",
        "type": "Blood Bank",
        "coords": [13.093887527225812, 80.242410],
        "stocks": "AB-, O+",
        "status": "Active"
      },
      {
        "id": 32,
        "name": "Chennai Blood Hub 22",
        "location": "Royapettah",
        "rating": "4.5",
        "type": "Blood Bank",
        "coords": [13.115504402488277, 80.249393],
        "stocks": "O+, O-",
        "status": "Active"
      },
      {
        "id": 33,
        "name": "Chennai Blood Hub 23",
        "location": "Saidapet",
        "rating": "4.7",
        "type": "Blood Bank",
        "coords": [13.052681036006378, 80.225411],
        "stocks": "O-, A+",
        "status": "Active"
      },
      {
        "id": 34,
        "name": "Chennai Blood Hub 24",
        "location": "Thiruvanmiyur",
        "rating": "4.3",
        "type": "Blood Bank",
        "coords": [13.144073068455958, 80.220282],
        "stocks": "A+, A-",
        "status": "Active"
      },
      {
        "id": 35,
        "name": "Chennai Blood Hub 25",
        "location": "Kodambakkam",
        "rating": "4.3",
        "type": "Blood Bank",
        "coords": [
          13.15009574303445,
          80.23907234138932
        ],
        "stocks": "A-, B+",
        "status": "Critical Stock"
      },
      {
        "id": 36,
        "name": "Chennai Blood Hub 26",
        "location": "Vadapalani",
        "rating": "4.8",
        "type": "Blood Bank",
        "coords": [13.169542021385242, 80.204214],
        "stocks": "B+, B-",
        "status": "Active"
      },
      {
        "id": 37,
        "name": "Chennai Blood Hub 27",
        "location": "Porur",
        "rating": "4.0",
        "type": "Blood Bank",
        "coords": [13.04201166945171, 80.227219],
        "stocks": "B-, AB+",
        "status": "Active"
      },
      {
        "id": 38,
        "name": "Chennai Blood Hub 28",
        "location": "Poonamallee",
        "rating": "4.9",
        "type": "Blood Bank",
        "coords": [
          12.98776036951021,
          80.19520036890988
        ],
        "stocks": "AB+, AB-",
        "status": "Active"
      },
      {
        "id": 39,
        "name": "Chennai Blood Hub 29",
        "location": "Ambattur",
        "rating": "4.3",
        "type": "Blood Bank",
        "coords": [13.065893807520562, 80.260782],
        "stocks": "AB-, O+",
        "status": "Active"
      },
      {
        "id": 40,
        "name": "Chennai Blood Hub 30",
        "location": "Adyar",
        "rating": "4.6",
        "type": "Blood Bank",
        "coords": [
          13.041140860345102,
          80.17828878947232
        ],
        "stocks": "O+, O-",
        "status": "Critical Stock"
      },
      {
        "id": 41,
        "name": "Chennai Blood Hub 31",
        "location": "T. Nagar",
        "rating": "4.5",
        "type": "Blood Bank",
        "coords": [12.990266415840228, 80.252932],
        "stocks": "O-, A+",
        "status": "Active"
      },
      {
        "id": 42,
        "name": "Chennai Blood Hub 32",
        "location": "Velachery",
        "rating": "4.3",
        "type": "Blood Bank",
        "coords": [13.128485386103183, 80.220705],
        "stocks": "A+, A-",
        "status": "Active"
      },
      {
        "id": 43,
        "name": "Chennai Blood Hub 33",
        "location": "Mylapore",
        "rating": "4.6",
        "type": "Blood Bank",
        "coords": [13.130222843922239, 80.201207],
        "stocks": "A-, B+",
        "status": "Active"
      },
      {
        "id": 44,
        "name": "Chennai Blood Hub 34",
        "location": "Anna Nagar",
        "rating": "4.5",
        "type": "Blood Bank",
        "coords": [13.077987646737563, 80.186261],
        "stocks": "B+, B-",
        "status": "Active"
      },
      {
        "id": 45,
        "name": "Chennai Blood Hub 35",
        "location": "Nungambakkam",
        "rating": "4.3",
        "type": "Blood Bank",
        "coords": [
          13.067906762038817,
          80.20939807880876
        ],
        "stocks": "B-, AB+",
        "status": "Critical Stock"
      },
      {
        "id": 46,
        "name": "Chennai Blood Hub 36",
        "location": "Besant Nagar",
        "rating": "4.1",
        "type": "Blood Bank",
        "coords": [13.173752480168398, 80.261719],
        "stocks": "AB+, AB-",
        "status": "Active"
      },
      {
        "id": 47,
        "name": "Chennai Blood Hub 37",
        "location": "Guindy",
        "rating": "4.2",
        "type": "Blood Bank",
        "coords": [
          13.113458718690175,
          80.21010033143493
        ],
        "stocks": "AB-, O+",
        "status": "Active"
      },
      {
        "id": 48,
        "name": "Chennai Blood Hub 38",
        "location": "Chromepet",
        "rating": "4.3",
        "type": "Blood Bank",
        "coords": [13.116819364582042, 80.262024],
        "stocks": "O+, O-",
        "status": "Active"
      },
      {
        "id": 49,
        "name": "Chennai Blood Hub 39",
        "location": "Tambaram",
        "rating": "4.1",
        "type": "Blood Bank",
        "coords": [
          13.113204421691918,
          80.17396053403382
        ],
        "stocks": "O-, A+",
        "status": "Active"
      },
      {
        "id": 50,
        "name": "Chennai Blood Hub 40",
        "location": "Perambur",
        "rating": "4.2",
        "type": "Blood Bank",
        "coords": [
          13.06681322320923,
          80.21387778297283
        ],
        "stocks": "A+, A-",
        "status": "Critical Stock"
      },
      { id: 2, name: 'Lifeline Hematology Center', location: 'East Medical Park', rating: 4.7, type: 'Blood Bank', coords: [12.9840, 77.6120], stocks: 'All Groups', status: 'Active' },
      { id: 3, name: 'St. Marys Blood Hub', location: 'West Medical Wing', rating: 4.5, type: 'Blood Bank', coords: [12.9610, 77.5750], stocks: 'O-, AB+', status: 'Limited' },
      { id: 4, name: 'City Core Plasma Bank', location: 'Medical Towers', rating: 4.8, type: 'Blood Bank', coords: [12.9770, 77.5980], stocks: 'B+, A+, O+', status: 'Active' },
      { id: 5, name: 'Sunrise Donors Point', location: 'North Plaza', rating: 4.6, type: 'Blood Bank', coords: [12.9900, 77.5920], stocks: 'O-, B-', status: 'Active' },
      { id: 6, name: 'Metro Hematics', location: 'Underground Mall', rating: 4.3, type: 'Blood Bank', coords: [12.9680, 77.5850], stocks: 'All groups', status: 'Critical Stock' },
      { id: 7, name: 'Hope Blood Services', location: 'Industrial Sector', rating: 4.4, type: 'Blood Bank', coords: [12.9820, 77.6300], stocks: 'A-, B+, AB-', status: 'Active' },
      { id: 8, name: 'Elite Plasma Hub', location: 'River Road', rating: 4.9, type: 'Blood Bank', coords: [12.9550, 77.6100], stocks: 'Special Rare groups', status: 'Active' },
      { id: 9, name: 'Global Blood Network', location: 'High Rise 4', rating: 4.7, type: 'Blood Bank', coords: [12.9950, 77.6150], stocks: 'AB+, O+, A+', status: 'Active' },
      { id: 10, name: 'Unity Hematology', location: 'Lower Market', rating: 4.2, type: 'Blood Bank', coords: [12.9630, 77.5680], stocks: 'B+, O-', status: 'Active' },
    ],
    supplies: [
      { id: 1, name: 'Central Medical Store', location: 'Sector 2', rating: 4.8, type: 'Warehouse', coords: [12.9750, 77.5900], stocks: 'Masks, PPE, Sanitizers', status: 'Active' },
      { id: 2, name: 'Emergency Supply Hub', location: 'West End', rating: 4.6, type: 'NGO', coords: [12.9600, 77.5700], stocks: 'Gloves, Syringes, Bandages', status: 'Active' },
      { id: 3, name: 'City Logistics Center', location: 'South Gate', rating: 4.5, type: 'Govt', coords: [12.9500, 77.5850], stocks: 'First Aid Kits, Antiseptics', status: 'Active' },
    ],
    equipment: [
      { id: 1, name: 'TechMed Rentals', location: 'North Wing', rating: 4.9, type: 'Equipment', coords: [12.9850, 77.6000], stocks: 'Ventilators, Monitors', status: 'Active' },
      { id: 2, name: 'Bio-Sustain Labs', location: 'East Campus', rating: 4.7, type: 'Equipment', coords: [12.9800, 77.6200], stocks: 'Dialysis Machines, X-Ray', status: 'Limited' },
      { id: 3, name: 'Relief Hardware Depot', location: 'Industrial Area', rating: 4.4, type: 'Equipment', coords: [12.9900, 77.6100], stocks: 'Oxygen Concentrators, Defibrillators', status: 'Active' },
    ]
  });

  const [activeRequests, setActiveRequests] = useState([
    { id: 101, title: 'O+ Blood Required', type: 'Medical', priority: 'Critical', location: 'City North Hospital', time: Date.now() - 300000 },
    { id: 102, title: 'Oxygen Units (5)', type: 'Medical', priority: 'Immediate', location: 'West Medical Wing', time: Date.now() - 600000 },
  ]);

  // Theme Management
  useEffect(() => {
    const root = window.document.documentElement;
    const applyTheme = (t) => {
      if (t === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.setAttribute('data-theme', systemTheme);
      } else {
        root.setAttribute('data-theme', t);
      }
      localStorage.setItem('theme', t);
    };

    applyTheme(theme);

    // Listen for system changes if set to system
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') applyTheme('system');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/resources');
        if (response.ok) {
          const data = await response.json();
          if (Object.keys(data).length > 0) {
            setResources(data);
          }
        }
      } catch (err) {
        console.warn('Backend offline. Using Local Cache Memory.');
      }
    };
    fetchResources();
  }, []);

  const login = (role, details) => {
    setUser({ role, ...details, verified: true });
    addNotification({
      title: 'Profile Synchronized',
      message: `Welcome, ${details.username || 'Citizen'}. Your biometric link is now active.`,
      type: 'success'
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updatePermissions = (newPerms) => {
    setPermissions(prev => ({ ...prev, ...newPerms }));
  };

  const broadcastRequest = (request) => {
    const newRequest = { ...request, id: Date.now(), time: Date.now(), status: 'broadcasting' };
    setActiveRequests(prev => [newRequest, ...prev]);
    addNotification({ title: 'Request Broadcasted', message: `Flooding algorithm propagating to 100+ nearby donors.`, type: 'info' });
  };

  const addNotification = (notif) => {
    setNotifications(prev => [{ ...notif, id: Date.now() }, ...prev]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <CrisisContext.Provider value={{
      user,
      login,
      logout,
      permissions,
      updatePermissions,
      emergencyLevel,
      setEmergencyLevel,
      notifications,
      addNotification,
      removeNotification,
      activeRequests,
      broadcastRequest,
      resources,
      theme,
      setTheme
    }}>
      {children}
    </CrisisContext.Provider>
  );
};

export const useCrisis = () => useContext(CrisisContext);
