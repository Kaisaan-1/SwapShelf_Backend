import mongoose from 'mongoose'

// Connect to your database
mongoose.connect(process.env["SWAPSHELF_DATABASE_URL"]);

// Define a schema model
const Example = mongoose.model("Example", new mongoose.Schema({ name: String }));

// Create a new document
const example = new Example({ name: "John Doe" });
await example.save();

// Find all documents
const examples = await Example.find();
console.log(examples);