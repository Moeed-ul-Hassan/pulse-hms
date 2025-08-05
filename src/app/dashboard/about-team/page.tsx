'use client'

import {
  Users,
  Trophy,
  Code,
  Brain,
  Palette,
  Database,
  Megaphone,
  Heart,
  Star,
  Zap,
  Globe,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react'

const teamMembers = [
  {
    name: "Moeed ul Hassan",
    role: "Team Lead & Prototyping",
    description: "Passionate Python developer leading the team and driving project prototyping.",
    skills: ["Python", "Project Management", "Prototyping"],
    portfolio: "https://moeed-dev-one.vercel.app/",
    location: "Pakistan (UTC +5:00)",
    experience: "No prior hackathon experience",
    icon: Trophy,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    name: "Azhar Hayat",
    role: "Backend Development",
    description: "Experienced backend developer with hackathon success.",
    skills: ["Node.js", "FastAPI", "Django"],
    portfolio: "http://www.azharhayat.me",
    github: "https://github.com/azharhayat271",
    email: "azharhayat271@gmail.com",
    phone: "+92 3076696182",
    location: "Lahore, Pakistan",
    experience: "Won 2nd prize in national hackathon",
    icon: Database,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    name: "Fras Irfan",
    role: "Frontend Development",
    description: "Creative frontend developer building meaningful MVPs quickly.",
    skills: ["React", "Next.js", "UI/UX"],
    portfolio: "https://frasirfan.vercel.app/",
    email: "fras.irfan@outlook.com",
    phone: "+92 3038843714",
    location: "Pakistan",
    experience: "No prior hackathon experience",
    icon: Palette,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    name: "Umair Khan",
    role: "AI/ML Development",
    description: "AI/ML specialist focused on cutting-edge AI technologies.",
    skills: ["OpenAI", "Langchain", "Gemini"],
    github: "https://github.com/Umairkhan2324",
    email: "asadsher2324@gmail.com",
    phone: "+92 3086707770",
    location: "UTC +5:00",
    experience: "Yes, experienced in hackathons",
    icon: Brain,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    name: "Mahesh",
    role: "Pitch & Marketing",
    description: "Marketing specialist eager to learn and contribute to success.",
    skills: ["Marketing", "Pitching", "Finance"],
    email: "maheshchelani2005@gmail.com",
    phone: "+92 3432893462",
    location: "Mithi Tharparkar, Sindh",
    experience: "No prior hackathon experience",
    icon: Megaphone,
    color: "text-red-600",
    bgColor: "bg-red-50"
  }
]

export default function AboutTeamPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Team @The Legends
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A dynamic team blending expertise in team leadership, prototyping, backend, frontend, AI/ML, and pitching/marketing.
        </p>
        <div className="flex items-center justify-center mt-4 space-x-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <span className="text-sm text-gray-500">Building the future of healthcare technology</span>
          <Zap className="h-5 w-5 text-yellow-500" />
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-xl">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Hackathon Wins</p>
              <p className="text-2xl font-bold text-gray-900">2nd Prize</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Code className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Technologies</p>
              <p className="text-2xl font-bold text-gray-900">15+</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-xl">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Passion</p>
              <p className="text-2xl font-bold text-gray-900">100%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={member.name}
            className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 ${member.bgColor}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-xl ${member.bgColor}`}>
                <member.icon className={`h-6 w-6 ${member.color}`} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{member.description}</p>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Skills:</h4>
              <div className="flex flex-wrap gap-1">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                <span>{member.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-2" />
                <span>{member.experience}</span>
              </div>
              {member.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                    {member.email}
                  </a>
                </div>
              )}
            </div>
            
            {member.portfolio && (
              <div className="mt-4">
                <a
                  href={member.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Portfolio
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Team Values */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="p-4 bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Passion</h3>
            <p className="text-gray-600">We're passionate about creating innovative solutions that make a difference.</p>
          </div>
          <div className="text-center">
            <div className="p-4 bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaboration</h3>
            <p className="text-gray-600">We believe in the power of teamwork and diverse perspectives.</p>
          </div>
          <div className="text-center">
            <div className="p-4 bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">We push boundaries and embrace new technologies to solve complex problems.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 