# ThreadMatch – AI-Powered Adaptive Styling Engine

## Project Overview
**ThreadMatch** (formerly StyleAI) is a full-stack web application designed to help users make smarter clothing decisions based on their body type, occasion, weather conditions, and personal style preferences. The goal is to simulate the decision-making process of a personal stylist while providing outfit recommendations in seconds through an intuitive and interactive user experience.

This project was intentionally built as an MVP (Minimum Viable Product) utilizing a deterministic, rules-based engine. This approach successfully validates the core recommendation workflow before introducing advanced LLM/AI-generated styling and wardrobe intelligence features in future phases.

## Problem Statement
Many users struggle with outfit selection despite owning multiple clothing items. Common challenges include:
* Choosing outfits that fit a specific occasion
* Matching colors effectively
* Understanding which clothing silhouettes complement their body type
* Deciding what to wear based on weather conditions
* Lack of personalized styling guidance

Existing fashion applications focus primarily on shopping rather than helping users style the clothing they already own. ThreadMatch focuses entirely on recommendation and outfit composition rather than e-commerce.

## Product Vision
Create an intelligent styling assistant capable of:
* Understanding user preferences
* Understanding wardrobe constraints
* Generating personalized outfit recommendations
* Explaining styling decisions
* Adapting recommendations dynamically

The long-term vision is to provide users with a virtual stylist available on demand.

## MVP Scope
The MVP focuses on validating the recommendation workflow utilizing a modern MERN stack architecture (MongoDB, Express, React with Vite, and Node.js) paired with Tailwind CSS for rapid UI development.
> **Live Demo:** [View Live App on Vercel](https://thread-match.vercel.app/)

### Included Features

**Authentication**
* User Registration
* User Login
* JWT Authentication
* Secure Password Hashing

**User Profiling**
Users provide baseline context via a multi-step survey:
* Gender
* Body Shape
* Occasion
* Weather Context

**Wardrobe Builder**
Users define their current inventory and aesthetic constraints by selecting:
* Shirt Type
* Pant Type
* Preferred Shirt Colors
* Preferred Pant Colors

**Recommendation Engine**
The hardcoded rules engine generates:
* Personalized outfit combinations
* Color-based variations
* Multiple recommendation options






