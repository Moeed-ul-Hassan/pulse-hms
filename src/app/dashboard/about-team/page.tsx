'use client'

import { useState } from 'react'
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
  ExternalLink,
  Github,
  Linkedin
} from 'lucide-react'
import { PrimaryButton } from '@/components'

interface TeamMember {
  name: string
  role: string
  description: string
  skills: string[]
  portfolio?: string
  github?: string
  linkedin?: string
  email?: string
  phone?: string
  location: string
  experience: string
  icon: any
  color: string
  bgColor: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Moeed ul Hassan",
    role: "Team Lead & Prototyping",
    description: "Passionate Python developer leading the team and driving project prototyping, eager to deliver a modern, AI-driven solution.",
    skills: ["Python", "Project Management", "Prototyping", "Team Leadership"],
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
    description: "Experienced backend developer with hackathon success, specializing in Node.js, FastAPI, and Django.",
    skills: ["Node.js", "FastAPI", "Django", "Backend Architecture"],
    portfolio: "http://www.azharhayat.me",
    github: "https://github.com/azharhayat271",
    email: "azharhayat271@gmail.com",
    phone: "+92 3076696182",
    location: "Lahore, Pakistan (UTC +5:00)",
    experience: "Won 2nd prize in national hackathon by Devsinc",
    icon: Database,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    name: "Fras Irfan",
    role: "Frontend Development",
    description: "Creative frontend developer stepping into hackathons to build meaningful MVPs quickly with modern technologies.",
    skills: ["React", "Next.js", "Frontend Development", "UI/UX"],
    portfolio: "https://frasirfan.vercel.app/",
    email: "fras.irfan@outlook.com",
    phone: "+92 3038843714",
    location: "Pakistan (UTC +5:00)",
    experience: "No prior hackathon experience",
    icon: Palette,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    name: "Umair Khan",
    role: "AI/ML Development",
    description: "AI/ML specialist with hackathon experience, focused on building something good with brilliant people using cutting-edge AI technologies.",
    skills: ["OpenAI", "Langchain", "Gemini", "Machine Learning"],
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
    description: "Marketing specialist and finance assistant eager to learn something new and contribute to the team's success.",
    skills: ["Marketing", "Pitching", "Finance", "Business Strategy"],
    email: "maheshchelani2005@gmail.com",
    phone: "+92 3432893462",
    location: "Mithi Tharparkar, Sindh, Pakistan (UTC +5:00)",
    experience: "No prior hackathon experience",
    icon: Megaphone,
    color: "text-red-600",
    bgColor: "bg-red-50"
  }
]

export default function AboutTeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

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
            className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in ${member.bgColor}`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setSelectedMember(member)}
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
            
            <p className="text-gray-700 mb-4 line-clamp-3">{member.description}</p>
            
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
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                <span>{member.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                <span>{member.experience}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center mt-4">
              <PrimaryButton
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedMember(member)
                }}
              >
                View Details
              </PrimaryButton>
            </div>
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

      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className={`p-4 rounded-xl ${selectedMember.bgColor}`}>
                    <selectedMember.icon className={`h-8 w-8 ${selectedMember.color}`} />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
                    <p className="text-lg text-gray-600">{selectedMember.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-700">{selectedMember.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
                    <div className="space-y-2">
                      {selectedMember.email && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <a href={`mailto:${selectedMember.email}`} className="text-blue-600 hover:underline">
                            {selectedMember.email}
                          </a>
                        </div>
                      )}
                      {selectedMember.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <a href={`tel:${selectedMember.phone}`} className="text-blue-600 hover:underline">
                            {selectedMember.phone}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{selectedMember.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience</h3>
                    <p className="text-gray-700">{selectedMember.experience}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  {selectedMember.portfolio && (
                    <a
                      href={selectedMember.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Portfolio
                    </a>
                  )}
                  {selectedMember.github && (
                    <a
                      href={selectedMember.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  )}
                  {selectedMember.linkedin && (
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 