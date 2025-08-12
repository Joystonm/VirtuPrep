import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScenarioCard from '../components/ScenarioCard';

const ScenarioSelect = () => {
  const navigate = useNavigate();

  const scenarios = [
    {
      id: 'public-speaking',
      title: 'Public Speaking',
      description: 'Practice presenting to large audiences with confidence and clarity',
      difficulty: 'Beginner',
      duration: '15-20 min',
      environment: 'auditorium',
      skills: ['Voice projection', 'Body language', 'Audience engagement'],
      icon: '🎤'
    },
    {
      id: 'presentation-skills',
      title: 'Presentation Skills',
      description: 'Master the art of compelling business presentations',
      difficulty: 'Intermediate',
      duration: '20-25 min',
      environment: 'conference_room',
      skills: ['Storytelling', 'Visual aids', 'Q&A handling'],
      icon: '📊'
    },
    {
      id: 'team-leadership',
      title: 'Team Leadership',
      description: 'Lead meetings, resolve conflicts, and motivate team members',
      difficulty: 'Advanced',
      duration: '25-30 min',
      environment: 'meeting_room',
      skills: ['Conflict resolution', 'Decision making', 'Team motivation'],
      icon: '👥'
    },
    {
      id: 'collaboration',
      title: 'Team Collaboration',
      description: 'Work effectively in group settings and collaborative projects',
      difficulty: 'Intermediate',
      duration: '20-25 min',
      environment: 'workshop_space',
      skills: ['Active listening', 'Idea sharing', 'Consensus building'],
      icon: '🤝'
    },
    {
      id: 'networking',
      title: 'Professional Networking',
      description: 'Build meaningful professional relationships and connections',
      difficulty: 'Beginner',
      duration: '15-20 min',
      environment: 'networking_event',
      skills: ['Small talk', 'Relationship building', 'Follow-up'],
      icon: '🌐'
    },
    {
      id: 'interview-skills',
      title: 'Interview Skills',
      description: 'Excel in job interviews with confidence and preparation',
      difficulty: 'Intermediate',
      duration: '20-25 min',
      environment: 'office',
      skills: ['Behavioral questions', 'Technical discussions', 'Salary negotiation'],
      icon: '💼'
    }
  ];

  const handleScenarioSelect = (scenarioId) => {
    console.log('Selected scenario:', scenarioId);
    navigate(`/simulation?scenario=${scenarioId}`);
  };

  return (
    <div className="scenario-select">
      <div className="scenario-header">
        <h2>Choose Your Training Module</h2>
        <p>Select a soft skills scenario to practice in our immersive VR environment</p>
      </div>
      
      <div className="scenarios-grid">
        {scenarios.map(scenario => (
          <ScenarioCard
            key={scenario.id}
            title={scenario.title}
            description={scenario.description}
            difficulty={scenario.difficulty}
            duration={scenario.duration}
            skills={scenario.skills}
            icon={scenario.icon}
            onSelect={() => handleScenarioSelect(scenario.id)}
          />
        ))}
      </div>
      
      <div className="scenario-footer">
        <div className="difficulty-legend">
          <h3>Difficulty Levels</h3>
          <div className="legend-items">
            <span className="legend-item beginner">Beginner - New to the skill</span>
            <span className="legend-item intermediate">Intermediate - Some experience</span>
            <span className="legend-item advanced">Advanced - Ready for complex scenarios</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSelect;
