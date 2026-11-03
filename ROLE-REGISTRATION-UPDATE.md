# HostelCare role registration update

## What changed
- The shared `/login` page now supports Login and Register for Student, Technician, and Admin / Warden.
- Registration sends the selected role to the server.
- `/api/auth/register` validates the request with Zod and stores the selected role in MongoDB.
- Student registrations require hostel and room. Technician and Admin / Warden registrations do not ask for those fields.
- Login still verifies the selected role against the account stored in MongoDB and redirects using the actual saved role.
- Existing Tailwind styling, dashboard pages, complaint APIs, and technician management remain in place.

## Important
This project is currently configured to allow anyone to select any of the three roles during registration, as requested for the demonstration. That is suitable for a controlled demo, but not for a public production deployment: public users could register as Admin / Warden. For production, admin and technician creation should be restricted to authorized administrators.

## Run
Keep your existing `.env` / `.env.local` file. Run `npm install` if dependencies have changed, then `npm run dev`.
