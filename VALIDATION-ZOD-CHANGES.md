# HostelCare validation and Zod update

This package keeps the existing Tailwind redesign and adds shared Zod validation.

## What changed
- Added `zod` and shared schemas in `lib/validation.js`.
- Login and student registration validate fields before submitting and show field-level errors.
- Public registration is student-only. Technicians are created by the admin/warden; admin accounts remain managed separately.
- Passwords for newly registered students and newly created technicians require at least 8 characters, a letter, a number, and a special character.
- Complaint creation validates title, category, hostel, room, priority, description, and optional PNG/JPG/WebP image.
- Technician creation and complaint assignment validate on both client/server or server-side as appropriate.
- APIs reject malformed JSON, invalid IDs, oversized/unsupported images, overlong fields, and invalid complaint status transitions.
- Complaint list API supports status/category/priority/search filters and pagination.

## Run
```bash
npm install
npm run dev
```

If you already have a `.env.local`, keep it. Existing users and passwords are not changed; the stronger password rule applies only to newly created accounts.
