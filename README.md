# Abdelrahman Alaa - Portfolio Website

A modern, high-end developer portfolio website built with Next.js 16, React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Dark Modern Theme** - Premium Silicon Valley-style design
- **Glassmorphism Effects** - Beautiful glass-like UI components
- **Smooth Animations** - Framer Motion powered animations
- **Interactive Particle Background** - Mouse-based particle system
- **Typewriter Effect** - Animated role text in hero section
- **Responsive Design** - Fully responsive for all devices
- **SEO Optimized** - Meta tags, OpenGraph, and proper metadata
- **Modular Architecture** - Easy to maintain and extend

## 📁 Project Structure

```
├── content/                    # Editable content files
│   ├── profile.json           # Personal information
│   ├── skills.json            # Skills and categories
│   ├── experience.json        # Work experience
│   ├── projects.json          # Project showcase
│   └── education.json         # Education & certifications
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main portfolio page
│   │   ├── layout.tsx         # Root layout with metadata
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── sections/          # Page sections
│   │   │   ├── hero-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── skills-section.tsx
│   │   │   ├── experience-section.tsx
│   │   │   ├── projects-section.tsx
│   │   │   ├── github-section.tsx
│   │   │   ├── contact-section.tsx
│   │   │   └── footer.tsx
│   │   └── ui-custom/         # Custom UI components
│   │       ├── animations.tsx
│   │       ├── glass-card.tsx
│   │       ├── navigation.tsx
│   │       └── particle-background.tsx
│   └── lib/                   # Utility functions
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **UI Components**: Custom components with glassmorphism
- **Icons**: Lucide React

## 📝 Editing Content

All personal data is stored in JSON files under the `/content` directory. Edit these files to update the portfolio without touching the code:

### Profile (`content/profile.json`)
```json
{
  "name": "Your Name",
  "title": "Your Title",
  "email": "your@email.com",
  ...
}
```

### Skills (`content/skills.json`)
```json
{
  "categories": [
    {
      "name": "Category Name",
      "icon": "Code",
      "skills": [
        { "name": "Skill Name", "level": 90 }
      ]
    }
  ]
}
```

### Experience (`content/experience.json`)
```json
{
  "experiences": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "period": "2024 - Present",
      ...
    }
  ]
}
```

### Projects (`content/projects.json`)
```json
{
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description",
      "technologies": ["Tech1", "Tech2"],
      ...
    }
  ]
}
```

## 🚀 Running Locally

1. Install dependencies:
```bash
bun install
```

2. Start development server:
```bash
bun run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Deployment on Vercel

1. Push your code to a GitHub repository

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "New Project" and import your GitHub repository

4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `bun run build`
   - Output Directory: `.next`

5. Click "Deploy" and wait for the build to complete

6. Your portfolio will be live at `your-project.vercel.app`

### Environment Variables (Optional)
If you want to fetch real GitHub stats, add:
```
GITHUB_TOKEN=your_github_token
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ✨ Animation Features

- **Scroll Reveal**: Elements animate in when scrolling into view
- **Typewriter Effect**: Rotating role text in hero section
- **Particle Background**: Interactive particles that respond to mouse movement
- **Hover Effects**: Cards lift and glow on hover
- **Staggered Animations**: Lists animate items one by one
- **Progress Bars**: Skills animate on scroll

## 🎨 Customization

### Colors
Edit the gradient colors in `globals.css` and component files:
- Primary: Purple (#8B5CF6)
- Accent: Cyan (#06B6D4)

### Animations
Edit animation timing in `src/components/ui-custom/animations.tsx`

### Particles
Customize particle behavior in `src/components/ui-custom/particle-background.tsx`

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

---

Made with ❤️ by Abdelrahman Alaa
