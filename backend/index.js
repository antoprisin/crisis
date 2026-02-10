const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const Resource = require('./models/Resource');
const Groq = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 5000;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bloodlink')
    .then(() => console.log('✅ Connected to Blood Link Neural Matrix (MongoDB)'))
    .catch(err => console.error('❌ Logic Gate Error:', err));

// Routes
// 1. Get all resources
app.get('/api/resources', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Neural Matrix (Database) is disconnected. Please ensure MongoDB is running.');
        }
        const resources = await Resource.find();
        const grouped = resources.reduce((acc, resource) => {
            if (!acc[resource.category]) acc[resource.category] = [];
            acc[resource.category].push(resource);
            return acc;
        }, {});
        res.json(grouped);
    } catch (err) {
        console.error('❌ API Error:', err.message);
        res.status(503).json({
            message: err.message,
            status: 'Offline',
            fallback: 'Using Frontend Local Cache'
        });
    }
});

// 2. Add resource (Seed/Admin)
app.post('/api/resources', async (req, res) => {
    const resource = new Resource(req.body);
    try {
        const newResource = await resource.save();
        res.status(201).json(newResource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        console.log('📝 Received chat request');
        if (!process.env.GROQ_API_KEY) {
            console.error('❌ GROQ_API_KEY missing in server process environment');
            throw new Error('GROQ_API_KEY is not set');
        }
        const { message, context } = req.body;

        const systemPrompt = `You are "Crisis AI v4.2", the intelligent core of the Blood Link platform. 
        Your mission is to provide accurate first-aid protocols, guide users to resources, and assist in medical emergencies.
        
        CONTEXT:
        - Crisis Level: ${context?.emergencyLevel || 'Stable'}
        - Near Resources: ${JSON.stringify(context?.resources || 'None')}
        - Current User: ${context?.user?.username || 'Guest'}
        
        GUIDELINES:
        1. Be concise, professional, and empathetic.
        2. Prioritize life-saving information (CPR, bleeding control).
        3. Always suggest using the SOS button for life-threatening emergencies.
        4. If the query is about specific resources (food, blood, shelter), refer to the available context.
        5. Provide responses in a helpful, structured format.`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 1024,
        });

        res.json({
            response: chatCompletion.choices[0].message.content,
            id: chatCompletion.id
        });
    } catch (err) {
        console.error('❌ Groq API Error:', err.message);
        res.status(500).json({
            message: 'AI Neural Matrix connection failed',
            error: err.message
        });
    }
});

// 4. Health check
app.get('/health', (req, res) => {
    res.json({ status: 'active', node: 'Primary Core', timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`🚀 Server navigating at port ${PORT}`);
});
