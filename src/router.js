import Vue from 'vue'
import Router from 'vue-router'

import Home from "@/views/Home"

import TalentLogin from "@/views/LoginTalent"
import Talent from "@/views/Talent"
import TalentProfile from "@/components/talent/profile/TalentProfile"
import TalentDashboard from "@/components/talent/TalentDashboard"
import TalentTeam from "@/components/talent/team/TalentTeam"
import TalentTeamCreate from "@/components/talent/team/manage/TalentTeamCreate"
import TalentTeamDetail from "@/components/talent/team/manage/TalentTeamDetail"
import TalentTeamSearch from "@/components/talent/team/manage/browse/browse"
import TalentTeamParticipation from "@/components/talent/team/participation/TalentTeamParticipation"
import TalentTeamParticipationRegister from "@/components/talent/team/participation/TalentTeamParticipationRegister"

import TalentTeamIdea from "@/components/talent/team/idea/TeamIdeaList"
import TalentTeamIdeaDetail from "@/components/talent/team/idea/TeamIdeaDetail"
import TalentTeamCustomerSegment from "@/components/talent/team/idea/customersegment/TeamIdeaCustomersegment"
import TalentTeamPersona from "@/components/talent/team/idea/customersegment/persona/TeamIdeaPersona"
import TalentTeamValueProposition from "@/components/talent/team/idea/customersegment/persona/valueproposition/TeamIdeaValueProposition"
import TalentTeamValuePropositionExperimentDetail from "@/components/talent/team/idea/customersegment/persona/valueproposition/experiment/ExperimentDetail"

import AdminLogin from "@/views/LoginAdmin"

import PersonnelLogin from "@/views/LoginPersonnel"
import Personnel from "@/views/Personnel"
import PersonnelDashboard from "@/components/personnel/PersonnelDashboard"

import Mentorship from "@/components/personnel/mentor/Mentorship"
import MentorshipParticipant from "@/components/personnel/mentor/participant/Participant"
import MentoringSession from "@/components/personnel/mentor/mentoring/MentoringSession"
import MentorPhase from "@/components/personnel/mentor/phase/Phase"
import MentorPhaseScore from "@/components/personnel/mentor/phase/score/Score"
import MentorPhaseScoring from "@/components/personnel/mentor/phase/scoring/Scoring"
import MentorPhaseScoringParticipant from "@/components/personnel/mentor/phase/scoring/ScoringParticipant"

import Coordinatorship from "@/components/personnel/coordinator/Coordinatorship"
import CoordinatorProgramParticipant from "@/components/personnel/coordinator/participant/Participant"
import CoordinatorProgramParticipantTeamDetail from "@/components/personnel/coordinator/participant/detail/TeamMembership"
import CoordinatorProgramParticipantTalentDetail from "@/components/personnel/coordinator/participant/detail/TalentProfile"
import CoordinatorProgramRegistration from "@/components/personnel/coordinator/registration/Registration"
import CoordinatorProgramPhase from "@/components/personnel/coordinator/phase/Phase"
import CoordinatorProgramPhaseMentoring from "@/components/personnel/coordinator/phase/mentoring/Mentoring"
import CoordinatorProgramPhaseScoring from "@/components/personnel/coordinator/phase/scoring/Scoring"
import CoordinatorProgramPhaseScoringRecap from "@/components/personnel/coordinator/phase/recap/Recap"

Vue.use(Router)

export default new Router({
  mode: process.env.CORDOVA_PLATFORM ? "hash" : "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: () => import('./views/SignUp.vue')
    },
    {
      path: '/login',
      name: 'Login Talent',
      component: TalentLogin
    },
    {
      path: '/personnel/login',
      name: 'Login Personnel',
      component: PersonnelLogin
    },
    {
      path: '/admin/login',
      name: 'Login Admin',
      component: AdminLogin
    },
    {
      path: '/talent',
      name: 'Talent',
      component: Talent,
      children: [
        {
          path: "/talent/dashboard",
          name: "Talent Dashboard",
          component: TalentDashboard,
          meta: {
            level: 0
          }
        },
        {
          path: "/talent/profile",
          name: "Talent Profile",
          component: TalentProfile,
          meta: {
            level: 0
          }
        },
        {
          path: "/talent/team",
          name: "Team Membership",
          component: TalentTeam,
          meta: {
            level: 0
          }
        },
        {
          path: "/talent/team/create",
          name: "Create Team",
          component: TalentTeamCreate,
          meta: {
            level: 1
          }
        },
        {
          path: "/talent/team/:teamId/membership/:membershipId",
          name: "Team Detail",
          component: TalentTeamDetail,
          meta: {
            level: 1
          }
        },
        {
          path: "/talent/team/:teamId/membership/:membershipId/search",
          name: "Talent Search",
          component: TalentTeamSearch,
          meta: {
            level: 1
          }
        },
        {
          path: "/talent/team/:teamId/participation",
          name: "Talent Program Participation",
          component: TalentTeamParticipation,
          meta: {
            level: 1
          }
        },
        {
          path: "/talent/team/:teamId/participation/register",
          name: "Talent Register Program Participation",
          component: TalentTeamParticipationRegister,
          meta: {
            level: 1
          }
        },
        {
          path: "/talent/team/:teamId/idea",
          name: "Team Idea",
          component: TalentTeamIdea,
          meta: {
            level: 1
          }
        },
        {
          path: "/talent/team/:teamId/idea/:ideaId",
          name: "Team Idea Detail",
          component: TalentTeamIdeaDetail,
          meta: {
            level: 1
          }
        },
        {
          path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId",
          name: "Team Customer Segment",
          component: TalentTeamCustomerSegment,
          meta: {
            level: 1
          }
        },
        {
          path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId",
          name: "Team Persona",
          component: TalentTeamPersona,
          meta: {
            level: 1
          }
        },
        {
          path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/valueproposition/:valuepropositionId",
          name: "Team Value Proposition",
          component: TalentTeamValueProposition,
          meta: {
            level: 1
          }
        },
        {
          path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/valueproposition/:valuepropositionId/experiment/:experimentId",
          name: "Team Experiment Detail",
          component: TalentTeamValuePropositionExperimentDetail,
          meta: {
            level: 1
          }
        },
        {
          path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/valueproposition/:valuepropositionId/businessanalysis",
          name: "Team Business Analysis",
          meta: {
            level: 1
          },
          component: () => import('./components/talent/team/idea/customersegment/persona/valueproposition/businessanalysis/BusinessAnalysis')
        },
        {
          path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/valueproposition/:valuepropositionId/javelin",
          name: "Team Javelin",
          meta: {
            level: 1
          },
          component: () => import('./components/talent/team/idea/customersegment/persona/valueproposition/experiment/Javelin')
        },
        {
          path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/valueproposition/:valuepropositionId/metric",
          name: "Team Metric",
          meta: {
            level: 1
          },
          component: () => import('./components/talent/team/idea/customersegment/persona/valueproposition/experiment/Metric')
        },
        {
          path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/valueproposition/:valuepropositionId/developmentplan",
          name: "Team Development Plan",
          meta: {
            level: 1
          },
          component: () => import('./components/talent/team/idea/customersegment/persona/valueproposition/experiment/DevelopmentPlan')
        },
        {
          path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/valueproposition/:valuepropositionId/businessdata",
          name: "Team Business Data",
          meta: {
            level: 1
          },
          component: () => import('./components/talent/team/idea/customersegment/persona/valueproposition/experiment/BusinessData')
        },
      ]
    },
    {
      path: '/personnel',
      name: 'Personnel',
      component: Personnel,
      children: [
        {
          path: "/personnel/dashboard",
          name: "Personnel Dashboard",
          component: PersonnelDashboard
        },
        {
          path: "/personnel/mentor",
          name: "Mentor Dashboard",
          component: Mentorship
        },
        {
          path: "/personnel/mentor/:mentorId/program/:programId/participant",
          name: "Mentorship Participant",
          component: MentorshipParticipant
        },
        {
          path: "/personnel/mentor/:mentorId/team/:teamId/idea",
          name: "Mentorship Participant Idea",
          component: TalentTeamIdea
        },
        {
          path: "/personnel/mentor/:mentorId/team/:teamId/idea/:ideaId",
          name: "Mentorship Participant Idea Detail",
          component: TalentTeamIdeaDetail
        },
        {
          path: "/personnel/mentor/:mentorId/team/:teamId/idea/:ideaId/customersegment/:customersegmentId",
          name: "Mentorship Participant Customer Segment",
          component: TalentTeamCustomerSegment
        },
        {
          path: "/personnel/mentor/:mentorId/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId",
          name: "Mentorship Participant Persona",
          component: TalentTeamPersona
        },
        {
          path: "/personnel/mentor/:mentorId/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/valueproposition/:valuepropositionId",
          name: "Mentorship Participant Value Proposition",
          component: TalentTeamValueProposition
        },
        {
          path: "/personnel/mentor/:mentorId/mentoring",
          name: "Mentoring Session",
          component: MentoringSession
        },
        {
          path: "/personnel/mentor/:mentorId/program/:programId/phase",
          name: "Mentor Phase",
          component: MentorPhase
        },
        {
          path: "/personnel/mentor/:mentorId/program/:programId/phase/:phaseId/score",
          name: "Mentor Phase Score",
          component: MentorPhaseScore
        },
        {
          path: "/personnel/mentor/:mentorId/program/:programId/phase/:phaseId/scoring",
          name: "Mentor Phase Scoring",
          component: MentorPhaseScoring
        },
        {
          path: "/personnel/mentor/:mentorId/program/:programId/phase/:phaseId/scoring/:scoringId/template/:templateId",
          name: "Mentor Phase Scoring Participant",
          component: MentorPhaseScoringParticipant
        },
        {
          path: "/personnel/coordinator",
          name: "Coordinator Dashboard",
          component: Coordinatorship
        },
        {
          path: "/personnel/coordinator/:coordinatorId/program/:programId/participant",
          name: "Program Participant",
          component: CoordinatorProgramParticipant
        },
        {
          path: "/personnel/participant/:teamId",
          name: "Program Participant Membership",
          component: CoordinatorProgramParticipantTeamDetail
        },
        {
          path: "/personnel/participant/:teamId/talent/:talentId",
          name: "Program Participant Membership",
          component: CoordinatorProgramParticipantTalentDetail
        },
        {
          path: "/personnel/coordinator/:coordinatorId/program/:programId/registration",
          name: "Program Registration",
          component: CoordinatorProgramRegistration
        },
        {
          path: "/personnel/coordinator/:coordinatorId/program/:programId/phase",
          name: "Program Phase",
          component: CoordinatorProgramPhase
        },
        {
          path: "/personnel/coordinator/:coordinatorId/program/:programId/phase/:phaseId/mentoring",
          name: "Program Phase Mentoring",
          component: CoordinatorProgramPhaseMentoring
        },
        {
          path: "/personnel/coordinator/:coordinatorId/program/:programId/phase/:phaseId/scoring",
          name: "Program Phase Scoring",
          component: CoordinatorProgramPhaseScoring
        },
        {
          path: "/personnel/coordinator/:coordinatorId/program/:programId/phase/:phaseId/scoring_recap",
          name: "Program Phase Scoring Recap",
          component: CoordinatorProgramPhaseScoringRecap
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
