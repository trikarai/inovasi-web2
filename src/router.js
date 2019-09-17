import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

import PersonnelLogin from "@/views/LoginPersonnel"
import Personnel from "@/views/Personnel"
import PersonnelDashboard from "@/components/personnel/PersonnelDashboard"

import Mentorship from "@/components/personnel/mentor/Mentorship"
import MentoringSession from "@/components/personnel/mentor/mentoring/MentoringSession"
import MentorPhase from "@/components/personnel/mentor/phase/Phase"
import MentorPhaseScore from "@/components/personnel/mentor/phase/score/Score"
import MentorPhaseScoring from "@/components/personnel/mentor/phase/scoring/Scoring"
import MentorPhaseScoringParticipant from "@/components/personnel/mentor/phase/scoring/ScoringParticipant"

import Coordinatorship from "@/components/personnel/coordinator/Coordinatorship"
import CoordinatorProgramPartisipant from "@/components/personnel/coordinator/participant/Participant"
import CoordinatorProgramRegistration from "@/components/personnel/coordinator/registration/Registration"
import CoordinatorProgramPhase from "@/components/personnel/coordinator/phase/Phase"
import CoordinatorProgramPhaseMentoring from "@/components/personnel/coordinator/phase/mentoring/Mentoring"
import CoordinatorProgramPhaseScoring from "@/components/personnel/coordinator/phase/scoring/Scoring"
import CoordinatorProgramPhaseScoringRecap from "@/components/personnel/coordinator/phase/recap/Recap"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: PersonnelLogin
    },
    {
      path: '/personnel/login',
      name: 'Login Personnel',
      component: PersonnelLogin
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
          component: CoordinatorProgramPartisipant
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
