const mongoose = require('mongoose');
var express = require('express');
const Books = require('../models/booksModel'); 
const fs = require('fs');

// Fetching all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Books.find();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Fetching book by object id
exports.findBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const searchBooks = await Books.findById(id);
    res.json(searchBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Adding new book in the database
exports.addBooks = async (req, res) => {
  try {
    let booksToAdd = [];
    // Checking if data is a single JSON object or a JSON file
    if (req.body instanceof Object && !Array.isArray(req.body)) {
      // Single JSON object
      const { BookName, ISBN, Rating, Author, Genre } = req.body;
      booksToAdd.push({ BookName, ISBN, Rating, Author, Genre });
    } else if (req.body instanceof Array) {
      // Array of JSON objects
      booksToAdd = req.body;
    } else if (req.file && req.file.path.endsWith('.json')) {
      // JSON file uploaded via multipart form data
      const data = fs.readFileSync(req.file.path);
      booksToAdd = JSON.parse(data);
    } else {
      throw new Error('Invalid input format');
    }

    // Adding each book from collection of JSON objects
    const addedBooks = [];
    for (const bookData of booksToAdd) {
      const newBook = await Books.create(bookData);
      addedBooks.push(newBook);
    }

    // If single object added, return the added book; otherwise, return array of added books
    res.json(booksToAdd.length === 1 ? addedBooks[0] : addedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Updating book with id and given new data
exports.updateBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const { BookName, ISBN, Rating, Author, Genre } = req.body;
    const updatedBooks = await Books.findByIdAndUpdate(id, { BookName, ISBN, Rating, Author, Genre }, { new: true });
    res.json(updatedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Deleting book with object id
exports.deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooks = await Books.findByIdAndDelete(id);
    res.json(deletedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};