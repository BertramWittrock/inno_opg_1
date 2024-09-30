const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*", // Be cautious with this in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug logs
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY ? "Set" : "Not set");

// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing. Please check your .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// After creating the supabase client
console.log("Supabase client created");

// Test query
(async () => {
  try {
    const { data, error } = await supabase
      .from("numbers")
      .select("*");

    if (error) throw error;

    console.log("Test query result:", data);
  } catch (error) {
    console.error("Error in test query:", error);
  }
})();

// Direct query to test Supabase connection
supabase
  .from("numbers")
  .select("*")
  .then(({ data, error }) => {
    if (error) {
      console.error("Error querying Supabase directly:", error);
    } else {
      console.log("Direct query result:", data);
    }
  });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Updated endpoint to fetch all phone numbers
app.get("/user-phone-numbers", async (req, res) => {
  try {
    console.log('Fetching owned phone numbers...');
    const { data, error } = await supabase
      .from("numbers")
      .select("*")
      .eq("owned", true);

    if (error) throw error;

    console.log('Owned phone numbers:', data);

    if (data.length === 0) {
      console.log('No owned phone numbers found in the database');
    } else {
      console.log(`Found ${data.length} owned phone numbers`);
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching owned phone numbers:', error);
    res.status(500).json({ error: 'An error occurred while fetching owned phone numbers', details: error.message });
  }
});

// Updated endpoint to fetch user's phone numbers
app.get("/user-phone-numbers/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from("numbers")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    if (data.length === 0) {
      console.log(`No phone numbers found for user ${userId}`);
    } else {
      console.log(`Found ${data.length} phone numbers for user ${userId}`);
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching phone numbers:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching phone numbers" });
  }
});

// Updated endpoint to test connection
app.get('/test-connection', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('numbers')
      .select('*')
      .limit(1);

    if (error) throw error;

    res.json({ message: 'Connection to Supabase successful', data });
  } catch (error) {
    console.error('Error testing connection:', error);
    res.status(500).json({ error: 'An error occurred while testing the connection' });
  }
});

// Endpoint to fetch available (not owned) phone numbers
app.get('/available-phone-numbers', async (req, res) => {
  try {
    console.log('Fetching available phone numbers...');
    const { data, error } = await supabase
      .from('numbers')
      .select('*')
      .eq('owned', false);

    if (error) throw error;

    console.log('Available phone numbers:', data);

    if (data.length === 0) {
      console.log('No available phone numbers found in the database');
    } else {
      console.log(`Found ${data.length} available phone numbers`);
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching available phone numbers:', error);
    res.status(500).json({ error: 'An error occurred while fetching available phone numbers', details: error.message });
  }
});

// Endpoint to purchase a phone number
app.post('/purchase-phone-number/:numberId', async (req, res) => {
  const { numberId } = req.params;
  try {
    console.log(`Purchasing phone number with id: ${numberId}`);
    const { data, error } = await supabase
      .from('numbers')
      .update({ owned: true })
      .eq('id', numberId)
      .select();

    if (error) throw error;

    if (data && data.length > 0) {
      console.log('Phone number purchased successfully:', data[0]);
      res.json({ message: 'Phone number purchased successfully', data: data[0] });
    } else {
      throw new Error('Phone number not found or already owned');
    }
  } catch (error) {
    console.error('Error purchasing phone number:', error);
    res.status(500).json({ error: 'An error occurred while purchasing the phone number', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
