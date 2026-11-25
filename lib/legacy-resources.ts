export const topics = ['All topics', 'Writing & essays', 'Academic success', 'Campus support', 'Events', 'Volunteering', 'Peer mentoring'] as const;
export const types = ['Guide', 'Campus service', 'Event', 'Announcement', 'Mentor idea', 'Flyer'] as const;
export const statuses = ['Ready to share', 'Draft', 'Needs confirmation'] as const;
export type Resource = {
 id: string; title: string; summary: string; topic: string; type: string; status: string;
 content: string; saved: boolean; date: string; location: string; link: string; updatedAt: string;
};
const make = (id:string, title:string, summary:string, topic:string, type:string, status:string, content:string, saved=false): Resource => ({id,title,summary,topic,type,status,content,saved,date:'',location:'',link:'',updatedAt:'2026-11-13T00:00:00.000Z'});
export const seed: Resource[] = [
 make('essay','A strong essay starts here','A simple structure to turn your ideas into a clear, confident essay.','Writing & essays','Guide','Ready to share',`START WITH THE ASSIGNMENT
Read the prompt and rubric. Underline the main task, required sources, word count, citation style, and due date.

1. INTRODUCTION
Introduce the topic, give a little background, and end with a focused thesis: the main point your essay will explain or support.

2. BODY PARAGRAPHS
Give each paragraph one main idea. Start with a topic sentence, add evidence or an example, explain how it supports your point, and connect it to your thesis. Use as many paragraphs as the assignment needs.

3. CONCLUSION
Bring your main ideas together and explain why they matter. Avoid adding a new argument.

4. SOURCES & FINAL CHECK
Cite borrowed ideas and quotes using the required style. Add a reference list or works cited page when needed. Read your essay aloud and check the rubric before submitting.

A QUICK PLAN
Write your thesis → list your main points → add evidence → draft → revise.

Need support? Ask Learning Support about writing appointments. Check your university's current booking details before sharing a location or link.`,true),
 make('grammarly','Grammarly: your writing check-in','Use writing feedback thoughtfully, and check your student access first.','Writing & essays','Guide','Needs confirmation',`HOW TO GET STARTED
1. Check your university's official software or student support page for Grammarly access.
2. If access is offered, follow the university's invitation or sign-in instructions using your student email.
3. A student email alone does not guarantee a paid plan. Confirm your school's current offer before promising access.
4. Review grammar, clarity, and tone suggestions. Keep your own voice and decide which edits make sense.
5. Follow your course's AI and writing tool rules. Ask your instructor if you are unsure.

Grammarly can help with editing, but you still need to check your argument, facts, citations, and assignment requirements.

TO CONFIRM
School access: Not confirmed
Included plan: Not confirmed
Official sign-up link: Not confirmed`,true),
 make('learning','You don’t have to write alone','A friendly guide to asking Learning Support for help.','Campus support','Campus service','Needs confirmation',`Learning Support may help you plan an essay, organize ideas, understand feedback, and build study skills. Confirm the services currently offered by your university.

BEFORE YOUR VISIT
Bring the assignment prompt, rubric, your draft or notes, and two or three questions. You do not need a perfect draft to ask for help.

ASK ABOUT
• Writing appointments and availability
• In-person or online options
• Help with planning, revision, and citations
• How to book and what to bring

CURRENT DETAILS
Location: Not confirmed
Hours: Not confirmed
Contact: Not confirmed
Booking link: Not confirmed

Confirm these details through an official university source before sharing.`,true),
 make('week','Make a little room for your week','A realistic weekly routine for assignments, work, and time to recharge.','Academic success','Guide','Ready to share',`YOUR 15-MINUTE WEEKLY RESET
1. Open your course pages and list this week's deadlines.
2. Put classes, work, and other fixed commitments on your calendar.
3. Break big assignments into small next steps: find sources, outline, draft, revise.
4. Choose one to three priorities each day.
5. Leave extra time for questions and unexpected changes.
6. Add meals, breaks, and sleep. A full calendar does not have to mean a packed calendar.

Try a short focus session, then take a break. If you get stuck, ask a classmate, your instructor, or a campus support service for help early.`),
 make('offices','Find the right campus support','A starting point for connecting students with the right office.','Campus support','Campus service','Needs confirmation',`WHERE TO START
• Learning Support: ask about writing, tutoring, and study skills.
• Library: ask about research, databases, citations, and study spaces.
• Student Finance: ask about billing, payment options, and school aid information.
• International Student Support: ask about international student services and where to get official guidance.
• Wellness / Counseling: ask about available well-being support and appointments.
• Accessibility Services: ask about accommodations and the request process.
• Academic Advising: ask about course planning and academic requirements.

All office names, locations, hours, contacts, and service availability need confirmation through the university's official directory.

Do not share private student information in a public announcement.`),
 make('volunteer','Make a difference at Louie’s Market','A reusable invitation to help out and connect with the campus community.','Volunteering','Announcement','Needs confirmation',`Hi everyone! I wanted to share a volunteer opportunity at Louie’s Market. It’s a welcoming place to connect with students, offer support, and become more involved in our campus community. It can also be a chance to build communication skills, gain experience helping others, and make a positive difference.

Interested in joining?
Available shifts: [Confirm current openings]
Location: [Confirm location]
Contact or sign-up: [Add confirmed details]
Eligibility: [Confirm who can volunteer]

Please confirm these details before sending.`,true),
 make('event','Study together, stress a little less','Plan a relaxed study session with space to ask questions and make progress.','Events','Event','Draft',`STUDY TOGETHER
Bring an assignment, a question, or just yourself. We will set a small goal, spend time working, and check in with each other.

Date and time: [To be confirmed]
Location / meeting link: [To be confirmed]
Who can join: [To be confirmed]
Registration: [To be confirmed]
Accessibility / accommodation contact: [To be confirmed]

Event idea only. Add confirmed arrangements before announcing.`),
 make('icebreaker','Small questions, better connections','A low-pressure “would you rather” activity for your next student meetup.','Peer mentoring','Mentor idea','Ready to share',`WOULD YOU RATHER…
• Be able to fly or breathe underwater?
• Study with music or in complete quiet?
• Travel to the past or the future?
• Explore the ocean or outer space?
• Learn any language instantly or play any instrument?
• Have a personal chef or a personal driver?
• Read a great book or watch a great movie?

HOW TO RUN IT
Read one question at a time. Invite students to choose a side or raise a hand, then ask a few volunteers why. Give everyone the option to pass. Keep it light; there are no wrong answers.`),
 make('checkin','The five-minute peer check-in','A few warm questions that make it easier to ask for support.','Peer mentoring','Mentor idea','Ready to share',`START WITH A CHECK-IN
• What has gone well this week?
• What feels challenging right now?
• Is there one assignment or decision you want to talk through?
• What is one small next step you can take?
• Would it help to connect with a campus office?

Listen first. Offer options and let the student choose. Keep personal details private, explain your role, and follow your university's guidance for referrals.

Afterward, note only the follow-up task you need to remember. Avoid keeping sensitive student details in this hub.`),
 make('essaymsg','A little help for your next essay','A short message you can copy into your student group chat.','Writing & essays','Announcement','Ready to share',`Hi everyone! Working on an essay this week? Start with a clear thesis, give each paragraph one main idea, and leave a little time to revise. If you feel stuck, ask Learning Support what writing help is available. You do not need a finished draft to ask a question. You’ve got this!`),
 make('flyer','Your next campus event, in one flyer','A reusable, editable flyer template with the important details in one place.','Events','Flyer','Draft',`YOU’RE INVITED!
[Add a short event title]

[One friendly sentence about the event and why students might enjoy it.]

WHEN: [Confirmed date and time, including time zone]
WHERE: [Confirmed room or online link]
WHO: [Eligibility / intended audience]
COST: [Confirm free or add cost]
SIGN UP: [Confirmed link or instructions]
QUESTIONS: [Confirmed organizer contact]
ACCESSIBILITY: [Accommodation contact and request details]

Before sharing: check the room, time, eligibility, sign-up link, and organizer approval if required.`),
 make('research','Better sources, stronger ideas','A practical checklist for research and responsible citation.','Academic success','Guide','Ready to share',`START YOUR RESEARCH
• Turn your topic into one clear research question.
• List a few keywords and alternate terms.
• Use your library's databases and ask a librarian for help.
• Check who wrote each source, when it was published, and what evidence it uses.
• Save citation details as you go.
• Put direct quotes in quotation marks and cite them.
• Cite paraphrased ideas too.
• Check every reference yourself, including any suggested by a writing or AI tool.

Use the citation style your instructor requests. When in doubt, ask before submitting.`),
 make('welcome','A friendly welcome to campus','A simple introduction to share with a new group of students.','Peer mentoring','Announcement','Ready to share',`Hi everyone, and welcome! I’m Orkhan, one of your peer mentors. I’m here to help you find useful resources, connect with campus support, and feel a little more comfortable asking questions. Whether you are working through an assignment or looking for ways to get involved, you do not have to figure everything out alone. I’m glad you’re here!`),
 make('swap','One tip, one new connection','An easy idea for sharing study habits without a formal workshop.','Peer mentoring','Mentor idea','Draft',`THE STUDY TIP SWAP
Invite each student to share one small thing that helps them study. Write the tips on a shared board, then ask everyone to choose one to try this week.

OPTIONS
Make a weekly plan, study with a classmate, practice explaining an idea aloud, or break one assignment into smaller steps.

Follow up next time: What worked? What would you change?

TO PLAN
Date / location: Not confirmed
Materials: A board, paper, or shared document
Group size: Decide with your team`),
];
