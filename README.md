# BugHost

**BugHost** is a modern, collaborative bug tracking and project management system designed to streamline software development workflows for teams of all sizes. Built with React, Supabase, and Vite, BugHost empowers teams to efficiently manage issues, track progress, and coordinate project activities.

---

## 🚀 Features

- **Kanban Issue Boards:** Visualize and manage issues using drag-and-drop Kanban boards.
- **Team & Member Management:** Create teams, invite members, and assign roles (Project Manager, Developer, QA Engineer, etc.).
- **Project Dashboard:** Get an overview of project status, recent activity, and key metrics.
- **Role-Based Access Control:** Assign granular roles to team members.
- **Real-Time Collaboration:** Updates are reflected instantly for all team members.
- **Notifications & Toasts:** Receive instant feedback for important actions.
- **Authentication & Security:** Secure login and user management.
- **Customizable Workflows:** Adapt boards, statuses, and roles to fit your team’s process.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, Radix UI, Lucide Icons, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Realtime)
- **State Management:** React Query, Context API

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bughost.git
cd bughost
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_URL=your-api-url
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or the port specified by Vite).

---

## 📚 Usage

- **Create a Team:** Start by creating a new team and inviting members.
- **Add Projects:** Organize your work into projects.
- **Track Issues:** Use the Kanban board to create, assign, and track issues.
- **Assign Roles:** Assign roles to team members for better access control.
- **Collaborate:** Work together in real-time and get instant feedback via notifications.

---

## 📝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Supabase](https://supabase.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Vite](https://vitejs.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)

---

**BugHost** – Making bug tracking and project management simple,