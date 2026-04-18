# NGO Solution - NGO Consultancy Platform

A professional full-stack platform for NGO support services, registrations, compliance, and grant management.

## Tech Stack
- **Frontend**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### 1. Clone & Install
```bash
npm install
```

### 2. Firebase Configuration
Create a project on [Firebase Console](https://console.firebase.google.com/) and enable:
1. **Authentication**: Email/Password provider.
2. **Cloud Firestore**: Create a database.
3. **Storage**: Enable storage for image uploads.

### 3. Environment Variables
Create a `.env.local` file in the root directory with your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Admin Access
To access the admin panel at `/admin`:
1. Register a user in Firebase Auth.
2. Login at `/admin/login`.

## Project Structure
- `src/app/(public)`: Public facing website.
- `src/app/(admin)`: Protected admin dashboard.
- `src/lib/firebase`: Firebase configuration and service helpers.
- `src/components`: Reusable UI modules.

## Features
- ✅ Fully Responsive NGO Website
- ✅ Dynamic Services & Blog Listing
- ✅ Live Grant Opportunities Section
- ✅ Workable Contact & Enquiry Forms
- ✅ Secure Admin Dashboard
- ✅ Enquiry Management System
- ✅ Blog CMS with Draft/Publish status
- ✅ Media Library for image management
- ✅ Site Settings configuration
