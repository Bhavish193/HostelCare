# HostelCare

Hostel maintenance complaint management app built with Next.js App Router, MongoDB/Mongoose, JWT cookies and role-based dashboards.

## Setup

1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set your MongoDB connection string and a long random `JWT_SECRET`.
4. Run `npm run dev` and open `http://localhost:3000`.

## Demo flow

- Open `/login` (or `/register`, which redirects to the same combined authentication screen).
- Choose **Register** and select Student, Technician, or Admin / Warden.
- Create one account for each role. Registration is intentionally open for all three roles for this project demo.
- Each account is automatically logged in and redirected to its own dashboard.

## Role workflows

- **Student** (`/student`): submit a complaint, view its status/history, and leave feedback or reopen a resolved complaint.
- **Admin / Warden** (`/admin`): view all complaints, create technician accounts, and assign a technician to each complaint.
- **Technician** (`/technician`): see only jobs assigned to that account, schedule work, start work, add a resolution note/evidence image, and mark work resolved.

## Important demo security note

Role selection during registration is deliberately open because this is a classroom demonstration. Do not deploy this configuration publicly: anyone could register as an admin. A production deployment must restrict admin/technician creation to an authorised administrator and add rate limiting, email verification and stronger upload storage.


### Styling
The UI uses Tailwind CSS v4 with the `@tailwindcss/postcss` PostCSS plugin. Run `npm install` after extracting this project, then `npm run dev`.
